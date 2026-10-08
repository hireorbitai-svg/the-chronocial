#!/usr/bin/env python3
"""
Applies all SQL migrations in supabase/migrations in chronological order
to the remote Supabase project using the Management API.
"""

import os
import glob
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

SUPABASE_ACCESS_TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN")
SUPABASE_PROJECT_REF = os.getenv("SUPABASE_PROJECT_REF", "xzrywdwwzerrurzyhusy")

if not SUPABASE_ACCESS_TOKEN:
    raise ValueError("SUPABASE_ACCESS_TOKEN environment variable is required.")

def run_migration(sql_path: str):
    print(f"\n[*] Applying migration: {os.path.basename(sql_path)}", flush=True)
    with open(sql_path, "r", encoding="utf-8") as f:
        sql = f.read()

    url = f"https://api.supabase.com/v1/projects/{SUPABASE_PROJECT_REF}/database/query"
    headers = {
        "Authorization": f"Bearer {SUPABASE_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    print("  -> Sending request to Supabase Management API...", flush=True)
    resp = requests.post(url, headers=headers, json={"query": sql}, timeout=60)
    print(f"  -> Got status code: {resp.status_code}", flush=True)
    if resp.status_code in [200, 201]:
        print(f"[OK] Successfully applied {os.path.basename(sql_path)}", flush=True)
    else:
        print(f"[!] Migration returned status {resp.status_code}: {resp.text}", flush=True)
        raise RuntimeError(f"Migration failed: {resp.text}")

def main():
    import sys
    if len(sys.argv) > 1:
        migration_files = sys.argv[1:]
    else:
        migration_files = sorted(glob.glob("supabase/migrations/*.sql"))
    if not migration_files:
        print("[-] No migration files found in supabase/migrations/")
        return

    print(f"[*] Found {len(migration_files)} migration files.")
    for sql_file in migration_files:
        run_migration(sql_file)

    print("\n[OK] All migrations applied successfully!")

if __name__ == "__main__":
    main()
