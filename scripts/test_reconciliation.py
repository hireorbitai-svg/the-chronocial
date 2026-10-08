#!/usr/bin/env python3
"""
The Chronicle — Controlled 10-Item Dataset Reconciliation & Idempotency Audit
Executes Step 7, 8, 9, 10 of Phase 2 Reconciliation.
"""

import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import json
import requests
from typing import List, Dict, Any

from news_engine.runner import run_ingestion_pipeline
from news_engine.publisher import ChroniclePublisher

CONTROLLED_10_ITEMS = [
    # Event 1 (3 items): Nolan + Cillian Murphy
    {
        "source_name": "Variety",
        "source_title": "Christopher Nolan Casts Cillian Murphy in Next Universal Feature Film",
        "source_url": "https://variety.com/2026/film/nolan-murphy-next-project?utm_source=rss",
        "published_at": "2026-10-08T08:00:00Z",
        "category": "Hollywood",
        "subcategory": "Production",
        "credibility_tier": 1
    },
    {
        "source_name": "Deadline Hollywood",
        "source_title": "Cillian Murphy Reunites with Christopher Nolan for New Universal Film",
        "source_url": "https://deadline.com/2026/film/cillian-murphy-nolan-reunion-universal",
        "published_at": "2026-10-08T08:05:00Z",
        "category": "Hollywood",
        "subcategory": "Production",
        "credibility_tier": 1
    },
    {
        "source_name": "The Hollywood Reporter",
        "source_title": "Christopher Nolan Universal Project Adds Cillian Murphy to Lead Cast",
        "source_url": "https://hollywoodreporter.com/movies/nolan-universal-murphy-lead-role",
        "published_at": "2026-10-08T08:10:00Z",
        "category": "Hollywood",
        "subcategory": "Production",
        "credibility_tier": 1
    },
    # Event 2 (2 items): GTA 6 Fall 2026
    {
        "source_name": "IGN Games",
        "source_title": "Grand Theft Auto VI Fall 2026 Release Window Reaffirmed by Take-Two",
        "source_url": "https://ign.com/articles/gta-6-fall-2026-window-take-two",
        "published_at": "2026-10-08T08:15:00Z",
        "category": "Gaming",
        "subcategory": "Releases",
        "credibility_tier": 2
    },
    {
        "source_name": "GameSpot",
        "source_title": "Take-Two Reaffirms Grand Theft Auto VI Fall 2026 Release Window",
        "source_url": "https://gamespot.com/articles/take-two-reaffirms-gta-6-window-2026",
        "published_at": "2026-10-08T08:20:00Z",
        "category": "Gaming",
        "subcategory": "Releases",
        "credibility_tier": 2
    },
    # 3. Rumor (1 item)
    {
        "source_name": "IndieWire",
        "source_title": "Rumor Eyes Ryan Gosling for Marvel Cinematic Universe Ghost Rider Reboot",
        "source_url": "https://indiewire.com/features/gosling-ghost-rider-reboot-rumors",
        "published_at": "2026-10-08T08:25:00Z",
        "category": "Hollywood",
        "subcategory": "Casting",
        "credibility_tier": 1
    },
    # 4. Official Studio Announcement (1 item)
    {
        "source_name": "PlayStation Blog",
        "source_title": "PlayStation Officially Announces DualSense Wireless Pro Controller for Mobile",
        "source_url": "https://blog.playstation.com/2026/10/08/dualsense-mobile-pro-controller",
        "published_at": "2026-10-08T08:30:00Z",
        "category": "Gaming",
        "subcategory": "Hardware",
        "credibility_tier": 1
    },
    # 5. Unrelated Movie Story (1 item)
    {
        "source_name": "Reuters Entertainment",
        "source_title": "Denis Villeneuve Begins Dune Messiah Principal Photography in Budapest Studios",
        "source_url": "https://reuters.com/lifestyle/entertainment/villeneuve-dune-messiah-filming-budapest",
        "published_at": "2026-10-08T08:35:00Z",
        "category": "Movies",
        "subcategory": "Production",
        "credibility_tier": 1
    },
    # 6. Gaming Story (1 item)
    {
        "source_name": "Xbox Wire",
        "source_title": "Xbox Game Pass Adds Ten New Day-One Titles for Second Half of October",
        "source_url": "https://news.xbox.com/2026/10/08/game-pass-wave-2-october-lineup",
        "published_at": "2026-10-08T08:40:00Z",
        "category": "Gaming",
        "subcategory": "Subscription",
        "credibility_tier": 1
    },
    # 7. Celebrity Story (1 item)
    {
        "source_name": "Rolling Stone Culture",
        "source_title": "Zendaya Named Cultural Ambassador for Venice Biennale 2026 Pavilion",
        "source_url": "https://rollingstone.com/culture/zendaya-venice-biennale-ambassador",
        "published_at": "2026-10-08T08:45:00Z",
        "category": "Celebrities",
        "subcategory": "Fashion",
        "credibility_tier": 2
    }
]

def main():
    print("==================================================")
    print("  THE CHRONICLE — STEP 8 & 9 CONTROLLED TEST")
    print("  Dataset: 10 Items -> Expected: 7 Clusters, 3 Duplicates")
    print("==================================================")

    publisher = ChroniclePublisher()
    if not publisher.client:
        print("[-] Error: Supabase client unavailable.")
        sys.exit(1)

    def cleanup():
        print("\n[*] Cleaning up controlled test data from Supabase...")
        test_urls = [i["source_url"].split("?")[0] for i in CONTROLLED_10_ITEMS]
        for u in test_urls:
            publisher.client.table("story_sources").delete().eq("source_url", u).execute()
        from news_engine.normalize import slugify
        for i in CONTROLLED_10_ITEMS:
            slug = slugify(i["source_title"])
            publisher.client.table("stories").delete().eq("slug", slug).execute()
        stories_final = publisher.client.table("stories").select("id").execute()
        story_sources_final = publisher.client.table("story_sources").select("id").execute()
        print(f"[OK] Cleaned up: DB returned to stories={len(stories_final.data)}, story_sources={len(story_sources_final.data)}")

    # Initial cleanup to ensure pristine baseline
    cleanup()
    stories_before = publisher.client.table("stories").select("id").execute()
    story_sources_before = publisher.client.table("story_sources").select("id").execute()
    initial_stories_count = len(stories_before.data)
    initial_sources_count = len(story_sources_before.data)
    print(f"[*] Baseline Supabase state: stories={initial_stories_count}, story_sources={initial_sources_count}")

    try:
        # ==================================================
        # RUN 1: Primary Insertion
        # ==================================================
        print("\n>>> EXECUTING RUN 1 (Primary Ingestion)...")
        report_1 = run_ingestion_pipeline(custom_items=CONTROLLED_10_ITEMS, allow_concurrency=True)

        print("\n--- RUN 1 VERIFICATION ---")
        print(f"Discovered:         {report_1['storiesDiscovered']}")
        print(f"Canonical Clusters: {report_1['canonicalClusters']}")
        print(f"Duplicates:         {report_1['duplicatesDetected']}")
        print(f"Stories Created:    {report_1['storiesCreated']}")
        print(f"Stories Updated:    {report_1['storiesUpdated']}")
        print(f"Sources Linked:     {report_1['storySourcesCreated']}")
        print(f"Reconciled:         {report_1['accountingReconciled']}")

        assert report_1['storiesDiscovered'] == 10, f"Expected 10 discovered, got {report_1['storiesDiscovered']}"
        assert report_1['canonicalClusters'] == 7, f"Expected 7 clusters, got {report_1['canonicalClusters']}"
        assert report_1['duplicatesDetected'] == 3, f"Expected 3 duplicates, got {report_1['duplicatesDetected']}"
        assert report_1['storiesCreated'] == 7, f"Expected 7 stories created, got {report_1['storiesCreated']}"
        assert report_1['storiesUpdated'] == 0, f"Expected 0 stories updated, got {report_1['storiesUpdated']}"
        assert report_1['storySourcesCreated'] == 10, f"Expected 10 sources linked, got {report_1['storySourcesCreated']}"
        assert report_1['accountingReconciled'] is True, "Run 1 accounting must reconcile"

        # Query Supabase directly
        stories_mid = publisher.client.table("stories").select("id,slug").execute()
        story_sources_mid = publisher.client.table("story_sources").select("id").execute()
        assert len(stories_mid.data) == initial_stories_count + 7, f"Expected DB to have +7 stories ({initial_stories_count + 7}), got {len(stories_mid.data)}"
        assert len(story_sources_mid.data) == initial_sources_count + 10, f"Expected DB to have +10 story_sources ({initial_sources_count + 10}), got {len(story_sources_mid.data)}"
        print(f"[OK] Supabase Live State Verified after RUN 1: +7 stories, +10 story_sources.")

        # ==================================================
        # RUN 2: Idempotency & Zero Duplicate Stories
        # ==================================================
        print("\n>>> EXECUTING RUN 2 (Idempotency Re-ingestion of Same 10 Items)...")
        report_2 = run_ingestion_pipeline(custom_items=CONTROLLED_10_ITEMS, allow_concurrency=True)

        print("\n--- RUN 2 VERIFICATION ---")
        print(f"Discovered:         {report_2['storiesDiscovered']}")
        print(f"Canonical Clusters: {report_2['canonicalClusters']}")
        print(f"Duplicates:         {report_2['duplicatesDetected']}")
        print(f"Stories Created:    {report_2['storiesCreated']}")
        print(f"Stories Updated:    {report_2['storiesUpdated']}")
        print(f"Sources Linked:     {report_2['storySourcesCreated']}")
        print(f"Reconciled:         {report_2['accountingReconciled']}")

        assert report_2['storiesDiscovered'] == 10, f"Expected 10 discovered, got {report_2['storiesDiscovered']}"
        assert report_2['canonicalClusters'] == 7, f"Expected 7 clusters, got {report_2['canonicalClusters']}"
        assert report_2['storiesCreated'] == 0, f"Expected 0 stories created in RUN 2, got {report_2['storiesCreated']}"
        assert report_2['storiesUpdated'] == 7, f"Expected 7 stories updated in RUN 2, got {report_2['storiesUpdated']}"
        assert report_2['storySourcesCreated'] == 10, f"Expected 10 sources linked in RUN 2, got {report_2['storySourcesCreated']}"
        assert report_2['accountingReconciled'] is True, "Run 2 accounting must reconcile"

        # Query Supabase directly after RUN 2
        stories_after = publisher.client.table("stories").select("id").execute()
        story_sources_after = publisher.client.table("story_sources").select("id").execute()
        assert len(stories_after.data) == initial_stories_count + 7, f"Idempotency violated: expected {initial_stories_count + 7} stories, got {len(stories_after.data)}"
        assert len(story_sources_after.data) == initial_sources_count + 10, f"Idempotency violated: expected {initial_sources_count + 10} sources, got {len(story_sources_after.data)}"
        print("[OK] Supabase Live State Verified after RUN 2: EXACTLY ZERO duplicate stories created.")

    finally:
        cleanup()

    print("\n==================================================")
    print("  CONTROLLED 10-ITEM RECONCILIATION TEST: 100% PASSED")
    print("==================================================")

if __name__ == "__main__":
    main()
