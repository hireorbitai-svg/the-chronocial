#!/usr/bin/env python3
"""
Auditing script to verify database relational integrity in a single fast query.
"""
import os
import requests

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

SUPABASE_ACCESS_TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN")
SUPABASE_PROJECT_REF = os.getenv("SUPABASE_PROJECT_REF", "xzrywdwwzerrurzyhusy")

COMBINED_AUDIT_SQL = """
SELECT json_build_object(
    'sources_count', (SELECT count(*) FROM public.sources),
    'stories_count', (SELECT count(*) FROM public.stories),
    'story_sources_count', (SELECT count(*) FROM public.story_sources),
    'story_updates_count', (SELECT count(*) FROM public.story_updates),
    'people_count', (SELECT count(*) FROM public.people),
    'movies_count', (SELECT count(*) FROM public.movies),
    'tv_shows_count', (SELECT count(*) FROM public.tv_shows),
    'games_count', (SELECT count(*) FROM public.games),
    'companies_count', (SELECT count(*) FROM public.companies),
    'categories_count', (SELECT count(*) FROM public.categories),
    'story_entities_count', (SELECT count(*) FROM public.story_entities),
    'trailers_count', (SELECT count(*) FROM public.trailers),
    'reviews_count', (SELECT count(*) FROM public.reviews),
    'release_dates_count', (SELECT count(*) FROM public.release_dates),
    'profiles_count', (SELECT count(*) FROM public.profiles),
    'ingestion_runs_count', (SELECT count(*) FROM public.ingestion_runs),
    'latest_run', (SELECT json_build_object('run_id', run_id, 'status', status, 'discovered', stories_discovered, 'succeeded', sources_succeeded) FROM public.ingestion_runs ORDER BY started_at DESC LIMIT 1),
    'duplicate_story_slugs', (SELECT count(*) FROM (SELECT slug FROM public.stories GROUP BY slug HAVING count(*) > 1) d),
    'story_sources_orphans', (SELECT count(*) FROM public.story_sources ss LEFT JOIN public.stories s ON ss.story_id = s.id WHERE s.id IS NULL),
    'story_sources_src_orphans', (SELECT count(*) FROM public.story_sources ss LEFT JOIN public.sources s ON ss.source_id = s.id WHERE s.id IS NULL),
    'story_entities_orphans', (SELECT count(*) FROM public.story_entities se LEFT JOIN public.stories s ON se.story_id = s.id WHERE s.id IS NULL),
    'null_required_stories', (SELECT count(*) FROM public.stories WHERE title IS NULL OR slug IS NULL OR category IS NULL),
    'status_counts', (SELECT json_object_agg(status, cnt) FROM (SELECT status, count(*) as cnt FROM public.stories GROUP BY status) s)
) as audit;
"""

def main():
    print("[*] Contacting Supabase Management API...", flush=True)
    url = f"https://api.supabase.com/v1/projects/{SUPABASE_PROJECT_REF}/database/query"
    headers = {
        "Authorization": f"Bearer {SUPABASE_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    r = requests.post(url, headers=headers, json={"query": COMBINED_AUDIT_SQL}, timeout=20)
    if r.status_code != 201:
        print(f"[-] Error: {r.status_code} {r.text}", flush=True)
        return

    data = r.json()
    audit = data[0]['audit']
    print("\n=== SUPABASE RELATIONAL INTEGRITY REPORT ===", flush=True)
    for k, v in audit.items():
        print(f"  {k:30}: {v}", flush=True)

if __name__ == '__main__':
    main()
