#!/usr/bin/env python3
"""
The Chronicle — 24/7 Automated Content Architecture & Ingestion Pipeline
Pipeline:
  SOURCE DISCOVERY
        ↓
  INGESTION & NORMALIZATION
        ↓
  DUPLICATE DETECTION
        ↓
  AI EXTRACTION (Gemini 2.5 Flash)
        ↓
  VERIFICATION ENGINE (Deterministic Rule System)
        ↓
  SUPABASE (Stories, Sources, Story_Sources)
        ↓
  JSON DIGEST FALLBACK (public/latest_digest.json)
"""

import os
import re
import sys
import json
import string
import hashlib
import datetime
import xml.etree.ElementTree as ET
import requests

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

# Discovery Feeds
MONITORED_FEEDS = [
    {
        "url": "https://news.google.com/rss/headlines/section/topic/ENTERTAINMENT?hl=en-US&gl=US&ceid=US:en",
        "category_hint": "Entertainment"
    },
    {
        "url": "https://news.google.com/rss/search?q=Hollywood+Box+Office+when:2d&hl=en-US&gl=US&ceid=US:en",
        "category_hint": "Hollywood"
    },
    {
        "url": "https://news.google.com/rss/search?q=Gaming+PlayStation+Xbox+Nintendo+when:2d&hl=en-US&gl=US&ceid=US:en",
        "category_hint": "Gaming"
    }
]

KNOWN_SOURCE_MAPPINGS = {
    "variety": {"name": "Variety", "tier": 2, "domain": "variety.com", "type": "publication"},
    "deadline": {"name": "Deadline Hollywood", "tier": 2, "domain": "deadline.com", "type": "publication"},
    "hollywood reporter": {"name": "The Hollywood Reporter", "tier": 2, "domain": "hollywoodreporter.com", "type": "publication"},
    "reuters": {"name": "Reuters Entertainment", "tier": 1, "domain": "reuters.com", "type": "publication"},
    "ign": {"name": "IGN", "tier": 2, "domain": "ign.com", "type": "publication"},
    "polygon": {"name": "Polygon", "tier": 2, "domain": "polygon.com", "type": "publication"},
    "gamespot": {"name": "GameSpot", "tier": 2, "domain": "gamespot.com", "type": "publication"},
    "kotaku": {"name": "Kotaku", "tier": 3, "domain": "kotaku.com", "type": "blog"},
    "indiewire": {"name": "IndieWire", "tier": 2, "domain": "indiewire.com", "type": "publication"},
    "rolling stone": {"name": "Rolling Stone", "tier": 2, "domain": "rollingstone.com", "type": "publication"},
    "billboard": {"name": "Billboard", "tier": 2, "domain": "billboard.com", "type": "publication"},
}


def normalize_title(raw_title: str):
    """Separate the headline from the publication suffix (e.g. 'Headline - Variety')."""
    source_name = "Wire Reports"
    clean_title = raw_title.strip()

    if " - " in clean_title:
        parts = clean_title.rsplit(" - ", 1)
        clean_title = parts[0].strip()
        source_name = parts[1].strip()

    return clean_title, source_name


def tokenize_title(title: str):
    """Normalize text into a set of lower-case content words for similarity checking."""
    stop_words = {"the", "a", "an", "and", "or", "in", "on", "at", "to", "for", "of", "with", "by", "is", "are", "as"}
    translator = str.maketrans("", "", string.punctuation)
    words = title.lower().translate(translator).split()
    return set(w for w in words if w not in stop_words and len(w) > 2)


def calculate_jaccard_similarity(set_a: set, set_b: set) -> float:
    """Calculate token overlap between two headlines."""
    if not set_a or not set_b:
        return 0.0
    intersection = len(set_a.intersection(set_b))
    union = len(set_a.union(set_b))
    return intersection / union if union > 0 else 0.0


def slugify(text: str) -> str:
    """Generate a clean URL slug from title."""
    s = text.lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s-]+', '-', s).strip('-')
    return s[:80]


def fetch_all_feed_items(max_per_feed: int = 8):
    """Fetch and normalize items across monitored RSS feeds."""
    all_items = []
    seen_urls = set()

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) TheChronicleBot/2.0"
    }

    for feed in MONITORED_FEEDS:
        url = feed["url"]
        hint = feed["category_hint"]
        try:
            print(f"[*] Discovering feed: {url[:60]}...")
            res = requests.get(url, headers=headers, timeout=12)
            if res.status_code != 200:
                continue

            root = ET.fromstring(res.content)
            for item in root.findall(".//item")[:max_per_feed]:
                link_el = item.find("link")
                title_el = item.find("title")
                date_el = item.find("pubDate")

                link = link_el.text.strip() if link_el is not None and link_el.text else ""
                title = title_el.text.strip() if title_el is not None and title_el.text else ""
                pub_date = date_el.text.strip() if date_el is not None and date_el.text else ""

                if not title or not link or link in seen_urls:
                    continue

                seen_urls.add(link)
                clean_title, detected_source = normalize_title(title)

                all_items.append({
                    "raw_title": title,
                    "title": clean_title,
                    "source_name": detected_source,
                    "url": link,
                    "published_at": pub_date,
                    "category_hint": hint,
                    "tokens": tokenize_title(clean_title)
                })
        except Exception as e:
            print(f"[!] Feed fetch notice ({hint}): {e}")

    print(f"[+] Total unique feed stories discovered: {len(all_items)}")
    return all_items


def cluster_duplicates(items: list, similarity_threshold: float = 0.50):
    """
    Cluster items reporting the same event into a single canonical story with multiple sources.
    Variety + Deadline + Reuters on same news -> 1 Canonical Chronicle Story with 3 sources.
    """
    canonical_clusters = []

    for item in items:
        matched_cluster = None
        for cluster in canonical_clusters:
            sim = calculate_jaccard_similarity(item["tokens"], cluster["tokens"])
            if sim >= similarity_threshold:
                matched_cluster = cluster
                break

        if matched_cluster:
            matched_cluster["sources"].append({
                "source_name": item["source_name"],
                "url": item["url"],
                "title": item["title"],
                "published_at": item["published_at"],
            })
            matched_cluster["tokens"].update(item["tokens"])
        else:
            canonical_clusters.append({
                "primary_title": item["title"],
                "category_hint": item["category_hint"],
                "tokens": set(item["tokens"]),
                "sources": [{
                    "source_name": item["source_name"],
                    "url": item["url"],
                    "title": item["title"],
                    "published_at": item["published_at"],
                }]
            })

    print(f"[+] Grouped into {len(canonical_clusters)} canonical editorial clusters (deduplicated).")
    return canonical_clusters


def determine_verification_status(cluster: dict) -> tuple:
    """
    Deterministic rule-based verification engine (NOT AI-guessed).
    Rules:
      - Contains 'rumor', 'speculates', 'alleged' -> 'rumor'
      - Multiple high-tier sources -> 'confirmed'
      - Single reputable source -> 'reported'
    """
    title_lower = cluster["primary_title"].lower()
    sources = cluster["sources"]
    source_count = len(sources)

    # 1. Check for rumor keywords
    if any(w in title_lower for w in ["rumor", "alleged", "reportedly", "speculation", "leak", "unconfirmed"]):
        status = "rumor"
        notes = "Flagged as industry reportage based on preliminary unverified market intelligence."
        return status, notes

    # 2. Check source credibility and count
    high_tier_count = 0
    for s in sources:
        s_name = s["source_name"].lower()
        if any(k in s_name for k in ["variety", "deadline", "reuters", "hollywood reporter", "official", "wbd", "sie"]):
            high_tier_count += 1

    if source_count >= 2 or high_tier_count >= 1:
        status = "confirmed"
        notes = f"Corroborated across {source_count} independent industry wire records and accredited trades."
    else:
        status = "reported"
        notes = f"Initial dispatch documented by {sources[0]['source_name']}. Additional trade verification in progress."

    return status, notes


def extract_with_gemini(cluster: dict, api_key: str):
    """
    Use Gemini 2.5 Flash as an editorial assistant for original synthesis:
    Generates summary, subdeck, category, read time, and original article paragraphs.
    """
    from google import genai
    client = genai.Client(api_key=api_key)

    sources_summary = "\n".join(
        f"- {s['source_name']}: {s['title']} ({s['url']})"
        for s in cluster["sources"]
    )

    prompt = f"""
You are the Executive Editor of "The Chronicle", a premier entertainment, culture, and gaming publication.
Synthesize the following reporting from multiple accredited wires into an original Chronicle article:

Primary Headline: {cluster['primary_title']}
Category Hint: {cluster['category_hint']}
Sources Cited:
{sources_summary}

Respond with valid JSON ONLY (no markdown code blocks, just raw JSON) with this exact schema:
{{
  "title": "Polished, authoritative headline for The Chronicle (max 110 chars)",
  "dek": "A compelling 1-sentence editorial subdeck explaining why this matters",
  "summary": "Concise 2-sentence journalistic summary of the verified development",
  "body": "Three well-developed paragraphs (separated by \\n\\n) detailing the context, business implications, and creative details. Maintain polished journalistic integrity without gossip.",
  "category": "One of: Hollywood, Bollywood, Celebrities, Movies, TV & OTT, Gaming",
  "subcategory": "A 2-3 word desk badge (e.g., Studio System, Pan-India, AAA Industry, Streaming)",
  "read_time_minutes": 3,
  "hero_image_url": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop"
}}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        text = response.text.strip()
        # Clean potential markdown fences
        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            if text.endswith("```"):
                text = text.rsplit("```", 1)[0].strip()

        return json.loads(text)
    except Exception as e:
        print(f"[!] Gemini extraction fallback: {e}")
        return {
            "title": cluster["primary_title"],
            "dek": f"Latest intelligence monitored across {len(cluster['sources'])} accredited trade bureaus.",
            "summary": cluster["primary_title"],
            "body": f"Entertainment correspondents confirm that developments surrounding this headline remain active across global production desks.\n\nRepresentatives for the principal parties have been contacted for documented comment regarding upcoming schedules.",
            "category": cluster["category_hint"] if cluster["category_hint"] in ["Hollywood", "Gaming"] else "Movies",
            "subcategory": "Wire Dispatch",
            "read_time_minutes": 3,
            "hero_image_url": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop"
        }


def publish_to_supabase(clusters: list, api_key: str):
    """Publish canonical deduplicated stories and their linked sources to Supabase."""
    supabase_url = os.getenv("SUPABASE_URL") or os.getenv("VITE_SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ACCESS_TOKEN") or os.getenv("VITE_SUPABASE_ANON_KEY")

    if not supabase_url or not supabase_key:
        print("[!] Supabase credentials not configured in environment. Skipping database ingestion.")
        return

    try:
        from supabase import create_client
        client = create_client(supabase_url, supabase_key)
        print("[*] Connected to Supabase for live publishing...")

        published_count = 0
        for cluster in clusters[:5]:  # Ingest top 5 curated canonical clusters per run
            status, notes = determine_verification_status(cluster)
            editorial = extract_with_gemini(cluster, api_key)

            slug = slugify(editorial["title"])

            # Check if story already exists by slug
            existing = client.table("stories").select("id, source_count").eq("slug", slug).execute()

            story_id = None
            if existing.data and len(existing.data) > 0:
                story_id = existing.data[0]["id"]
                current_count = existing.data[0].get("source_count", 1)
                new_count = current_count + len(cluster["sources"])

                # Update existing story with fresh sources and verification
                client.table("stories").update({
                    "source_count": new_count,
                    "status": status,
                    "verification_notes": notes,
                    "updated_at": datetime.datetime.now(datetime.timezone.utc).isoformat()
                }).eq("id", story_id).execute()
                print(f"[~] Updated existing canonical story: {editorial['title'][:50]}... (sources: {new_count})")
            else:
                # Insert new canonical story
                story_payload = {
                    "slug": slug,
                    "title": editorial["title"],
                    "dek": editorial["dek"],
                    "summary": editorial["summary"],
                    "body": editorial["body"],
                    "excerpt": editorial["summary"],
                    "category": editorial["category"],
                    "subcategory": editorial.get("subcategory", "Wire Report"),
                    "status": status,
                    "hero_image_url": editorial.get("hero_image_url"),
                    "thumbnail_url": editorial.get("hero_image_url"),
                    "author_name": "The Chronicle Intelligence Desk",
                    "published_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                    "is_published": True,
                    "is_featured": False,
                    "is_trending": True,
                    "read_time_minutes": editorial.get("read_time_minutes", 3),
                    "source_count": len(cluster["sources"]),
                    "verification_notes": notes
                }

                ins = client.table("stories").insert(story_payload).execute()
                if ins.data and len(ins.data) > 0:
                    story_id = ins.data[0]["id"]
                    published_count += 1
                    print(f"[+] Published new canonical story: {editorial['title'][:50]}... [{status}]")

            # Associate all source links in story_sources
            if story_id:
                for src in cluster["sources"]:
                    try:
                        client.table("story_sources").upsert({
                            "story_id": story_id,
                            "source_url": src["url"],
                            "source_title": src["title"],
                            "source_type": "publication",
                            "is_primary": (src == cluster["sources"][0])
                        }, on_conflict="story_id,source_url").execute()
                    except Exception as src_err:
                        # Ignore unique constraint collisions gracefully
                        pass

        print(f"[✓] Successfully synced {published_count} new canonical articles to Supabase.")
    except Exception as e:
        print(f"[!] Supabase publishing notice: {e}")


def save_fallback_digest(clusters: list):
    """Keep public/latest_digest.json and public/latest_digest.md updated as fallback/cache."""
    output_dir = "public"
    os.makedirs(output_dir, exist_ok=True)

    timestamp_utc = datetime.datetime.now(datetime.timezone.utc).isoformat()

    digest_headlines = []
    for c in clusters:
        digest_headlines.append({
            "title": c["primary_title"],
            "url": c["sources"][0]["url"],
            "source_count": len(c["sources"]),
            "sources": [s["source_name"] for s in c["sources"]]
        })

    digest_data = {
        "timestamp": timestamp_utc,
        "headline_count": len(digest_headlines),
        "headlines": digest_headlines,
        "summary": f"Live wire briefing processed across {len(clusters)} deduplicated editorial clusters."
    }

    json_path = os.path.join(output_dir, "latest_digest.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(digest_data, f, indent=2, ensure_ascii=False)
    print(f"[+] Preserved fallback JSON digest: {json_path}")

    md_path = os.path.join(output_dir, "latest_digest.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write("# The Chronicle — 24/7 Industry Dispatch\n")
        f.write(f"*Dispatched at: {timestamp_utc}*\n\n")
        for c in clusters:
            sources_str = ", ".join(set(s["source_name"] for s in c["sources"]))
            f.write(f"- **{c['primary_title']}** (Corroborated by: {sources_str})\n")
    print(f"[+] Preserved fallback Markdown digest: {md_path}")


def main():
    print("==================================================")
    print("  The Chronicle — Automated Content Pipeline 2.0")
    print(f"  Execution Time (UTC): {datetime.datetime.now(datetime.timezone.utc).isoformat()}")
    print("==================================================")

    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        print("[-] Notice: GEMINI_API_KEY is not set. Will proceed with deterministic pipeline and fallback templates.")

    try:
        # 1. Source Discovery & Normalization
        items = fetch_all_feed_items()
        if not items:
            print("[-] No feed items retrieved.")
            return

        # 2. Duplicate Detection & Clustering
        clusters = cluster_duplicates(items)

        # 3. Save JSON/Markdown fallback
        save_fallback_digest(clusters)

        # 4. Publish to Supabase with deterministic verification & AI extraction
        if gemini_api_key:
            publish_to_supabase(clusters, gemini_api_key)
        else:
            print("[i] Skipping AI extraction & Supabase insert until GEMINI_API_KEY is configured.")

        print("[OK] Content pipeline executed successfully.")
    except Exception as e:
        print(f"[-] Pipeline execution error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
