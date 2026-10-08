#!/usr/bin/env python3
"""
Test RLS policies on the live Supabase instance using the public anon key.
Strictly does NOT print secret values.
"""
import os
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

SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
ANON_KEY = os.getenv('VITE_SUPABASE_ANON_KEY')

if not SUPABASE_URL or not ANON_KEY:
    print("[-] Supabase URL or Anon key missing in environment")
    exit(1)

headers = {
    "apikey": ANON_KEY,
    "Authorization": f"Bearer {ANON_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

def test_public_read_stories():
    url = f"{SUPABASE_URL}/rest/v1/stories?select=id,title,is_published&limit=3"
    r = requests.get(url, headers=headers)
    assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
    data = r.json()
    assert len(data) > 0, "No stories returned"
    for s in data:
        assert s['is_published'] is True, f"Unpublished story exposed: {s}"
    print(f"[PASS] Public can read published stories ({len(data)} returned, all is_published=true).")

def test_public_cannot_insert_stories():
    url = f"{SUPABASE_URL}/rest/v1/stories"
    fake_story = {
        "title": "Hacked Story by Anon",
        "slug": "hacked-story-by-anon",
        "category": "Hollywood",
        "is_published": True
    }
    r = requests.post(url, headers=headers, json=fake_story)
    # PostgREST with RLS blocks inserts where no policy allows it (either 401, 403, or 42501 permission denied)
    assert r.status_code in [401, 403, 400], f"Security vulnerability! Anon was able to insert: {r.status_code} {r.text}"
    print(f"[PASS] Public CANNOT insert stories (Blocked with HTTP {r.status_code}).")

def test_public_cannot_update_stories():
    # First get an existing story id
    get_url = f"{SUPABASE_URL}/rest/v1/stories?select=id&limit=1"
    story_id = requests.get(get_url, headers=headers).json()[0]['id']

    patch_url = f"{SUPABASE_URL}/rest/v1/stories?id=eq.{story_id}"
    r = requests.patch(patch_url, headers=headers, json={"title": "Altered Title"})
    # RLS with no update policy for anon updates 0 rows or returns 401/403
    assert r.status_code in [200, 204, 401, 403], f"Unexpected status: {r.status_code}"
    # Check that title was NOT altered
    check = requests.get(f"{SUPABASE_URL}/rest/v1/stories?id=eq.{story_id}&select=title", headers=headers).json()[0]
    assert check['title'] != "Altered Title", "Security vulnerability! Story was modified by public anon client!"
    print(f"[PASS] Public CANNOT modify existing stories (RLS successfully prevented mutation).")

def test_public_cannot_delete_stories():
    get_url = f"{SUPABASE_URL}/rest/v1/stories?select=id&limit=1"
    story_id = requests.get(get_url, headers=headers).json()[0]['id']

    del_url = f"{SUPABASE_URL}/rest/v1/stories?id=eq.{story_id}"
    r = requests.delete(del_url, headers=headers)
    # Check that story still exists
    check = requests.get(f"{SUPABASE_URL}/rest/v1/stories?id=eq.{story_id}&select=id", headers=headers).json()
    assert len(check) == 1, "Security vulnerability! Story was deleted by public anon client!"
    print(f"[PASS] Public CANNOT delete stories (Story remains intact).")

def test_public_cannot_insert_bookmarks_without_auth():
    url = f"{SUPABASE_URL}/rest/v1/bookmarks"
    fake_bm = {
        "story_id": "00000000-0000-0000-0000-000000000000",
        "user_id": "00000000-0000-0000-0000-000000000000"
    }
    r = requests.post(url, headers=headers, json=fake_bm)
    assert r.status_code in [401, 403, 400], f"Expected 401/403/400, got {r.status_code}"
    print(f"[PASS] Unauthenticated public CANNOT create bookmarks (Blocked with HTTP {r.status_code}).")

if __name__ == '__main__':
    print("=== TESTING SUPABASE ROW-LEVEL SECURITY POLICIES ===")
    test_public_read_stories()
    test_public_cannot_insert_stories()
    test_public_cannot_update_stories()
    test_public_cannot_delete_stories()
    test_public_cannot_insert_bookmarks_without_auth()
    print("=== ALL RLS SECURITY CHECKS PASSED ===")
