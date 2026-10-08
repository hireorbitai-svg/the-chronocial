"""
The Chronicle — Supabase Publisher & Story Timeline Engine
Handles idempotent story upserts, story_sources associations,
story_updates chronological audit records, concurrency locking, and JSON fallback caches.
"""

import os
import json
import uuid
import datetime
from typing import Dict, Any, List, Optional, Tuple
from news_engine.normalize import slugify
from news_engine.scoring import compute_story_scores

try:
    from dotenv import load_dotenv
    load_dotenv()
    load_dotenv(".env.local")
except ImportError:
    for env_file in [".env", ".env.local"]:
        if os.path.exists(env_file):
            with open(env_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        k, v = k.strip(), v.strip().strip('"').strip("'")
                        if k not in os.environ:
                            os.environ[k] = v

import requests

class SupabaseRestTable:
    def __init__(self, base_url: str, headers: dict, table_name: str):
        self.url = f"{base_url.rstrip('/')}/rest/v1/{table_name}"
        self.headers = dict(headers)
        self.params: Dict[str, str] = {}
        self.action = "select"
        self.payload: Any = None
        self.extra_headers: Dict[str, str] = {}

    def select(self, cols: str = "*"):
        self.action = "select"
        self.params["select"] = cols
        return self

    def eq(self, col: str, val: Any):
        self.params[col] = f"eq.{val}"
        return self

    def gte(self, col: str, val: Any):
        self.params[col] = f"gte.{val}"
        return self

    def order(self, col: str, desc: bool = False):
        direction = "desc" if desc else "asc"
        self.params["order"] = f"{col}.{direction}"
        return self

    def limit(self, count: int):
        self.params["limit"] = str(count)
        return self

    def insert(self, payload: Any):
        self.action = "insert"
        self.payload = payload
        self.extra_headers["Prefer"] = "return=representation"
        return self

    def update(self, payload: Any):
        self.action = "update"
        self.payload = payload
        self.extra_headers["Prefer"] = "return=representation"
        return self

    def upsert(self, payload: Any, on_conflict: Optional[str] = None):
        self.action = "upsert"
        self.payload = payload
        self.extra_headers["Prefer"] = "resolution=merge-duplicates,return=representation"
        if on_conflict:
            self.params["on_conflict"] = on_conflict
        return self

    def execute(self):
        class ExecResult:
            def __init__(self, data):
                self.data = data

        req_headers = dict(self.headers)
        req_headers.update(self.extra_headers)

        try:
            if self.action == "select":
                r = requests.get(self.url, headers=req_headers, params=self.params, timeout=15)
                if r.status_code in (200, 206):
                    return ExecResult(r.json())
                return ExecResult([])
            elif self.action in ("insert", "upsert"):
                r = requests.post(self.url, headers=req_headers, params=self.params, json=self.payload, timeout=15)
                if r.status_code in (200, 201):
                    data = r.json()
                    return ExecResult(data if isinstance(data, list) else [data])
                return ExecResult([])
            elif self.action == "update":
                r = requests.patch(self.url, headers=req_headers, params=self.params, json=self.payload, timeout=15)
                if r.status_code in (200, 204):
                    try:
                        data = r.json()
                        return ExecResult(data if isinstance(data, list) else [data])
                    except Exception:
                        return ExecResult([self.payload])
                return ExecResult([])
            return ExecResult([])
        except Exception:
            return ExecResult([])

class SupabaseRestClient:
    def __init__(self, base_url: str, key: str):
        self.base_url = base_url
        self.headers = {
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json"
        }

    def table(self, table_name: str) -> SupabaseRestTable:
        return SupabaseRestTable(self.base_url, self.headers, table_name)

class ChroniclePublisher:
    def __init__(self, supabase_client: Any = "AUTO"):
        if supabase_client == "AUTO":
            self.client = None
            self._init_supabase()
        else:
            self.client = supabase_client

    def _init_supabase(self):
        url = os.getenv("SUPABASE_URL") or os.getenv("VITE_SUPABASE_URL")
        service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        if service_key and not service_key.startswith("sbp_") and not "your-" in service_key:
            key = service_key
        else:
            key = os.getenv("VITE_SUPABASE_ANON_KEY")

        if url and key:
            try:
                # Use lightweight requests-based client (zero external binary dependency)
                self.client = SupabaseRestClient(url, key)
            except Exception as e:
                self.client = None

    def acquire_ingestion_lock(self, run_id: str) -> bool:
        """
        Check for any active 'running' ingestion job in ingestion_runs.
        If a previous run has been running for less than 15 minutes, prevent concurrent runs.
        Otherwise, create an entry with status 'running'.
        """
        if not self.client:
            return True  # Offline mode allows local execution

        try:
            # Check for existing active runs within last 15 minutes
            fifteen_mins_ago = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(minutes=15)).isoformat()
            active_runs = self.client.table("ingestion_runs") \
                .select("run_id, started_at") \
                .eq("status", "running") \
                .gte("started_at", fifteen_mins_ago) \
                .execute()

            if active_runs.data and len(active_runs.data) > 0:
                print(f"[!] Concurrency lock active: Another run ({active_runs.data[0]['run_id']}) is currently in progress.")
                return False

            # Create our running record
            self.client.table("ingestion_runs").insert({
                "run_id": run_id,
                "status": "running",
                "started_at": datetime.datetime.now(datetime.timezone.utc).isoformat()
            }).execute()
            return True
        except Exception as e:
            print(f"[!] Ingestion lock notice: {e}")
            return True

    def release_ingestion_lock(self, run_id: str, report_data: Dict[str, Any], status: str = "completed"):
        """Mark ingestion_run record as completed or failed with full audit metrics."""
        if not self.client:
            return

        try:
            now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
            payload = {
                "status": status,
                "completed_at": now_iso,
                "sources_attempted": report_data.get("sources_attempted", 0),
                "sources_succeeded": report_data.get("sources_succeeded", 0),
                "sources_failed": report_data.get("sources_failed", 0),
                "stories_discovered": report_data.get("stories_discovered", 0),
                "stories_new": report_data.get("stories_new", 0),
                "stories_updated": report_data.get("stories_updated", 0),
                "duplicates_detected": report_data.get("duplicates_detected", 0),
                "rejected_items": report_data.get("rejected_items", 0),
                "ai_failures": report_data.get("ai_failures", 0),
                "database_failures": report_data.get("database_failures", 0),
                "metadata": report_data
            }
            self.client.table("ingestion_runs").update(payload).eq("run_id", run_id).execute()
        except Exception as e:
            print(f"[!] Error recording run completion: {e}")

    def publish_cluster(
        self,
        cluster: Dict[str, Any],
        editorial: Dict[str, Any],
        status: str,
        verification_notes: str
    ) -> Tuple[Optional[str], bool]:
        """
        Idempotently publishes or updates a canonical Chronicle story.
        Returns: (story_id, is_new_story)
        """
        if not self.client:
            return None, False

        slug = slugify(editorial["title"])
        now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
        source_count = len(cluster["sources"])
        scores = compute_story_scores(cluster, status, source_count)

        # 1. Check if canonical story exists by slug or cluster_hash
        existing = self.client.table("stories") \
            .select("id, status, source_count, title") \
            .eq("slug", slug) \
            .execute()

        story_id = None
        is_new = False

        if existing.data and len(existing.data) > 0:
            # Story exists -> UPDATE canonical story and log timeline update
            story_id = existing.data[0]["id"]
            prev_status = existing.data[0].get("status", "reported")
            current_count = existing.data[0].get("source_count", 1)
            new_count = current_count + source_count

            update_payload = {
                "source_count": new_count,
                "status": status,
                "verification_notes": verification_notes,
                "trending_score": scores["trending_score"],
                "ranking_score": scores["ranking_score"],
                "updated_at": now_iso
            }
            self.client.table("stories").update(update_payload).eq("id", story_id).execute()

            # Create story_updates record if status evolved (e.g. reported -> confirmed)
            if prev_status != status:
                try:
                    self.client.table("story_updates").insert({
                        "story_id": story_id,
                        "update_type": "status_change",
                        "update_summary": f"Story verification updated from '{prev_status}' to '{status}'. {verification_notes}",
                        "previous_status": prev_status,
                        "new_status": status
                    }).execute()
                except Exception:
                    pass
        else:
            # New canonical story -> INSERT
            story_payload = {
                "slug": slug,
                "title": editorial["title"],
                "dek": editorial["dek"],
                "summary": editorial["summary"],
                "body": editorial["body"],
                "excerpt": editorial["summary"],
                "category": editorial["category"],
                "subcategory": editorial.get("subcategory", cluster.get("subcategory", "Trade Dispatch")),
                "status": status,
                "hero_image_url": editorial.get("hero_image_url") or cluster.get("hero_image_url"),
                "thumbnail_url": editorial.get("hero_image_url") or cluster.get("hero_image_url"),
                "author_name": "The Chronicle Intelligence Desk",
                "published_at": now_iso,
                "is_published": True,
                "is_featured": False,
                "is_trending": True,
                "read_time_minutes": editorial.get("read_time_minutes", 3),
                "source_count": source_count,
                "verification_notes": verification_notes,
                "trending_score": scores["trending_score"],
                "ranking_score": scores["ranking_score"],
                "canonical_url": cluster["sources"][0]["canonical_url"] if cluster["sources"] else None,
                "cluster_hash": cluster.get("cluster_hash")
            }

            ins = self.client.table("stories").insert(story_payload).execute()
            if ins.data and len(ins.data) > 0:
                story_id = ins.data[0]["id"]
                is_new = True

        # 2. Link all source wires in story_sources (Idempotent upsert on unique story_id, source_url)
        if story_id:
            for s in cluster["sources"]:
                try:
                    self.client.table("story_sources").upsert({
                        "story_id": story_id,
                        "source_url": s["canonical_url"],
                        "source_title": s["source_title"],
                        "source_type": "publication",
                        "is_primary": (s == cluster["sources"][0])
                    }, on_conflict="story_id,source_url").execute()
                except Exception:
                    pass

        return story_id, is_new

    def save_fallback_cache(self, clusters: List[Dict[str, Any]], output_dir: str = "public"):
        """Save public/latest_digest.json and public/latest_digest.md for offline frontend resilience."""
        os.makedirs(output_dir, exist_ok=True)
        now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()

        headlines = []
        for c in clusters:
            headlines.append({
                "title": c["primary_title"],
                "url": c["sources"][0]["canonical_url"],
                "source_count": len(c["sources"]),
                "sources": [s["source_name"] for s in c["sources"]]
            })

        digest_data = {
            "timestamp": now_iso,
            "headline_count": len(headlines),
            "headlines": headlines,
            "summary": f"Verified intelligence gathered across {len(clusters)} deduplicated editorial clusters."
        }

        # Save JSON
        json_path = os.path.join(output_dir, "latest_digest.json")
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(digest_data, f, indent=2, ensure_ascii=False)

        # Save Markdown
        md_path = os.path.join(output_dir, "latest_digest.md")
        with open(md_path, "w", encoding="utf-8") as f:
            f.write("# The Chronicle — 24/7 Industry Dispatch\n")
            f.write(f"*Dispatched at: {now_iso}*\n\n")
            for c in clusters:
                sources_str = ", ".join(list(set(s["source_name"] for s in c["sources"])))
                f.write(f"- **{c['primary_title']}** (Corroborated by: {sources_str})\n")
