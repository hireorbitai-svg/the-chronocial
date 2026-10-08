#!/usr/bin/env python3
"""
The Chronicle — 24/7 Automated News Intelligence Engine
Entry Point for GitHub Actions & Scheduled Automation.

Executes the pipeline:
  Sources -> Fetch -> Normalize -> Deduplicate -> Gemini Summary -> Verification -> Supabase -> Local Cache
"""

import os
import sys

# Ensure repository root is on Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Load local environment files if present
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

from news_engine.runner import run_ingestion_pipeline

def main():
    try:
        report = run_ingestion_pipeline()
        return report
    except Exception as e:
        print(f"[-] Pipeline execution error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
