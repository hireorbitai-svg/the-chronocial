#!/usr/bin/env python3
"""
24/7 Automated News Digest & Intelligence Engine for The Chronicle.
Fetches top entertainment headlines from RSS feeds, summarizes key insights with Gemini 2.5 Flash,
and saves the output to JSON/Markdown for the web app and database.
"""

import os
import sys
import json
import datetime
import xml.etree.ElementTree as ET
import requests
try:
    from dotenv import load_dotenv
    load_dotenv()
    load_dotenv(".env.local")
except ImportError:
    # Minimal fallback parser for local .env files if dotenv is not installed
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


# RSS Feeds to monitor
DEFAULT_RSS_URL = os.getenv(
    "NEWS_RSS_URL",
    "https://news.google.com/rss/headlines/section/topic/ENTERTAINMENT?hl=en-US&gl=US&ceid=US:en"
)


def fetch_headlines(rss_url: str, max_items: int = 15):
    """Fetch and parse top news items from an RSS feed."""
    print(f"[*] Fetching news from RSS feed: {rss_url}")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) TheChronicleBot/1.0"
    }
    response = requests.get(rss_url, headers=headers, timeout=15)
    response.raise_for_status()

    root = ET.fromstring(response.content)
    items = []

    for item in root.findall(".//item")[:max_items]:
        title = item.find("title")
        link = item.find("link")
        pub_date = item.find("pubDate")
        description = item.find("description")

        title_text = title.text.strip() if title is not None and title.text else ""
        link_text = link.text.strip() if link is not None and link.text else ""
        date_text = pub_date.text.strip() if pub_date is not None and pub_date.text else ""

        if title_text:
            items.append({
                "title": title_text,
                "url": link_text,
                "published_at": date_text
            })

    print(f"[+] Fetched {len(items)} headlines successfully.")
    return items


def summarize_with_gemini(headlines: list, api_key: str):
    """Call Google Gemini 2.5 Flash to summarize headlines into editorial intelligence."""
    print("[*] Generating intelligence digest using Gemini 2.5 Flash...")
    from google import genai

    client = genai.Client(api_key=api_key)

    news_text = "\n".join(
        f"{idx + 1}. {item['title']} (Source: {item['url']})"
        for idx, item in enumerate(headlines)
    )

    prompt = f"""
You are the Executive Editor of "The Chronicle", a high-end digital entertainment publication.
Review the following entertainment, culture, and industry headlines gathered in the last 2 hours:

{news_text}

Provide an editorial briefing with the following structure in Markdown:
1. **Lead Intelligence Bulletin**: A punchy 2-3 sentence overview of the dominant narrative right now.
2. **Top Stories & Analysis**: 3 to 5 key bullet points analyzing the biggest moves (Hollywood, Box Office, Streaming, Gaming, or Celebrity). Include context, why it matters, and editorial perspective.
3. **Market & Audience Takeaway**: 1 concise concluding insight on audience sentiment or industry trajectory.

Tone: Authoritative, polished, journalistic, insightful. Avoid fluff and clickbait.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text


def save_digest(headlines: list, summary_md: str):
    """Save the digest to public/latest_digest.json and public/latest_digest.md."""
    output_dir = "public"
    os.makedirs(output_dir, exist_ok=True)

    timestamp_utc = datetime.datetime.now(datetime.timezone.utc).isoformat()

    digest_data = {
        "timestamp": timestamp_utc,
        "headline_count": len(headlines),
        "headlines": headlines,
        "summary": summary_md,
    }

    # Save JSON file for frontend fetching
    json_path = os.path.join(output_dir, "latest_digest.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(digest_data, f, indent=2, ensure_ascii=False)
    print(f"[+] Saved JSON digest to: {json_path}")

    # Save Markdown file
    md_path = os.path.join(output_dir, "latest_digest.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(f"# The Chronicle — 24/7 Industry Dispatch\n")
        f.write(f"*Dispatched at: {timestamp_utc}*\n\n")
        f.write(summary_md)
        f.write("\n\n---\n### Monitored Wire Headlines\n")
        for item in headlines:
            f.write(f"- [{item['title']}]({item['url']})\n")
    print(f"[+] Saved Markdown digest to: {md_path}")


def sync_to_supabase(headlines: list, summary_md: str):
    """Optionally sync the latest digest to Supabase if credentials are provided."""
    supabase_url = os.getenv("SUPABASE_URL") or os.getenv("VITE_SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY")

    if not supabase_url or not supabase_key:
        print("[!] Supabase credentials not found in environment. Skipping Supabase database sync.")
        return

    try:
        from supabase import create_client
        supabase = create_client(supabase_url, supabase_key)
        
        timestamp_utc = datetime.datetime.now(datetime.timezone.utc).isoformat()
        
        # Upsert or insert into news_digests table
        data = {
            "summary": summary_md,
            "headline_count": len(headlines),
            "headlines": headlines,
            "created_at": timestamp_utc
        }
        
        response = supabase.table("news_digests").insert(data).execute()
        print(f"[+] Successfully synced digest to Supabase 'news_digests' table: {response}")
    except Exception as e:
        # Don't fail the whole run if the table doesn't exist yet
        print(f"[i] Supabase sync note: {e}")


def main():
    print("==================================================")
    print("  The Chronicle — 24/7 Automated News Intelligence")
    print(f"  Time (UTC): {datetime.datetime.now(datetime.timezone.utc).isoformat()}")
    print("==================================================")

    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        print("[-] ERROR: GEMINI_API_KEY environment variable is not set.")
        print("    Please set GEMINI_API_KEY in your GitHub Secrets or local .env file.")
        sys.exit(1)

    try:
        headlines = fetch_headlines(DEFAULT_RSS_URL)
        if not headlines:
            print("[-] No headlines found. Exiting.")
            return

        summary = summarize_with_gemini(headlines, gemini_api_key)

        print("\n------------------ LATEST DIGEST ------------------")
        print(summary)
        print("---------------------------------------------------\n")

        save_digest(headlines, summary)
        sync_to_supabase(headlines, summary)

        print("[✓] Automation run completed successfully.")
    except Exception as e:
        print(f"[-] Pipeline execution error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
