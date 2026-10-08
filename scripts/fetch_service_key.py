#!/usr/bin/env python3
"""
Safely fetches the service_role key from Supabase Management API
and writes it into .env and .env.local without printing the secret value.
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
                    if k not in os.environ:
                        os.environ[k] = v.strip().strip('"').strip("'")

token = os.getenv("SUPABASE_ACCESS_TOKEN")
ref = os.getenv("SUPABASE_PROJECT_REF", "xzrywdwwzerrurzyhusy")

if not token:
    print("[-] No SUPABASE_ACCESS_TOKEN found.")
    exit(1)

url = f"https://api.supabase.com/v1/projects/{ref}/api-keys"
headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
resp = requests.get(url, headers=headers, timeout=15)

if resp.status_code != 200:
    print(f"[-] Management API returned {resp.status_code}")
    exit(1)

keys = resp.json()
service_key = None
for k in keys:
    if k.get("name") == "service_role" or k.get("tags") == "service_role":
        service_key = k.get("api_key")
        break

if not service_key:
    print("[-] service_role key not found in API response.")
    exit(1)

# Safely update .env and .env.local
for target in [".env", ".env.local"]:
    if not os.path.exists(target):
        continue
    with open(target, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    updated = False
    new_lines = []
    for line in lines:
        if line.startswith("SUPABASE_SERVICE_ROLE_KEY="):
            new_lines.append(f'SUPABASE_SERVICE_ROLE_KEY="{service_key}"\n')
            updated = True
        else:
            new_lines.append(line)
    
    if not updated:
        new_lines.append(f'SUPABASE_SERVICE_ROLE_KEY="{service_key}"\n')

    with open(target, "w", encoding="utf-8") as f:
        f.writelines(new_lines)
    print(f"[OK] Successfully updated {target} with service_role key.")
