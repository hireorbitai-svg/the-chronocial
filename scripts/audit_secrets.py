#!/usr/bin/env python3
"""
Auditing script to check for secrets in Git history and current files.
Strictly does NOT print secret values.
"""
import os
import re
import subprocess

PATTERNS = {
    'Supabase Personal Access Token': r'sbp_[a-zA-Z0-9]{30,}',
    'Supabase JWT / Service Role / Anon': r'eyJ[a-zA-Z0-9_\-]{20,}\.eyJ[a-zA-Z0-9_\-]{20,}',
    'Google / Gemini API Key': r'AIza[0-9A-Za-z\-_]{35}',
    'Generic Private Key / Token Assignment': r'(?:api[_-]?key|secret|token|password)\s*[:=]\s*[\'\"][a-zA-Z0-9_\-]{16,}[\'\"]'
}

import base64
import json

def inspect_jwt(token_str: str) -> str:
    try:
        parts = token_str.split('.')
        if len(parts) >= 2:
            padded = parts[1] + '=' * (-len(parts[1]) % 4)
            payload = json.loads(base64.b64decode(padded).decode('utf-8', errors='ignore'))
            role = payload.get('role', 'unknown')
            return f"JWT with role: '{role}'"
    except Exception:
        pass
    return "JWT"
def scan_text(text: str, source_label: str):
    found = []
    for label, pat in PATTERNS.items():
        matches = list(re.finditer(pat, text, re.IGNORECASE))
        count = 0
        details = []
        for m in matches:
            val = m.group(0)
            if any(p in val.lower() for p in ['placeholder', 'your-', 'my_', 'example', 'test', 'dummy']):
                continue
            count += 1
            if 'jwt' in label.lower():
                jwt_detail = inspect_jwt(val)
                details.append(jwt_detail)
        if count > 0:
            desc = label
            if details:
                desc += f" ({', '.join(set(details))})"
            found.append((desc, count))
    return found

def audit_git_history():
    print("--- 1. AUDITING GIT HISTORY ---")
    commits = subprocess.check_output(['git', 'rev-list', '--all'], text=True).strip().splitlines()
    for commit in commits:
        commit_info = subprocess.check_output(['git', 'show', '-s', '--format=%h %s', commit], text=True).strip()
        diff = subprocess.check_output(['git', 'show', commit], text=True, errors='ignore')
        matches = scan_text(diff, f"Commit {commit_info}")
        if matches:
            for label, count in matches:
                print(f"  [ALERT] Commit {commit_info}: Found {count} potential {label}")
        else:
            print(f"  [PASS] Commit {commit_info}: Clean")

def audit_tracked_files():
    print("\n--- 2. AUDITING CURRENT TRACKED FILES ---")
    tracked = subprocess.check_output(['git', 'ls-files'], text=True).strip().splitlines()
    found_any = False
    for fpath in tracked:
        if not os.path.exists(fpath):
            continue
        try:
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                matches = scan_text(content, fpath)
                if matches:
                    found_any = True
                    for label, count in matches:
                        print(f"  [ALERT] Tracked file '{fpath}': Found {count} potential {label}")
        except Exception as e:
            pass
    if not found_any:
        print("  [PASS] All tracked files are clean of private secrets.")

def audit_dist_and_public():
    print("\n--- 3. AUDITING DIST AND PUBLIC ASSETS ---")
    dirs = ['dist', 'public']
    found_any = False
    for d in dirs:
        if not os.path.exists(d):
            continue
        for root, _, files in os.walk(d):
            for file in files:
                fpath = os.path.join(root, file)
                try:
                    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        matches = scan_text(content, fpath)
                        if matches:
                            for label, count in matches:
                                # In dist index js, anon key may legitimately appear as frontend publishable key
                                print(f"  [NOTICE] {fpath}: {count} instance(s) of {label}")
                                found_any = True
                except Exception:
                    pass
    if not found_any:
        print("  [PASS] Dist and public are clean.")

def audit_backend_secrets_leakage():
    print("\n--- 4. AUDITING SENSITIVE BACKEND SECRETS LEAKAGE ---")
    if not os.path.exists('.env'):
        print("  [SKIP] .env not found")
        return
    
    backend_secrets = {}
    with open('.env', 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if '=' in line and not line.startswith('#'):
                k, v = line.split('=', 1)
                k = k.strip()
                v = v.strip().strip('"').strip("'")
                if k in ['SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_ACCESS_TOKEN', 'GEMINI_API_KEY'] and len(v) > 8:
                    backend_secrets[k] = v

    leaked = False
    for target_dir in ['dist', 'public', 'src']:
        if not os.path.exists(target_dir):
            continue
        for root, _, files in os.walk(target_dir):
            for file in files:
                fpath = os.path.join(root, file)
                try:
                    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        for k, secret_val in backend_secrets.items():
                            if secret_val in content:
                                print(f"  [CRITICAL LEAK] Backend key '{k}' found in client-facing file '{fpath}'!")
                                leaked = True
                except Exception:
                    pass

    if not leaked:
        print("  [PASS] Zero backend keys (Service Role, Personal Access Token, Gemini API Key) leaked into src/, dist/, or public/!")

if __name__ == '__main__':
    audit_git_history()
    audit_tracked_files()
    audit_dist_and_public()
    audit_backend_secrets_leakage()
