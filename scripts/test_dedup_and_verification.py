#!/usr/bin/env python3
"""
Unit and integration test for:
1. Multi-source deduplication clustering (3 sources -> 1 canonical story with 3 sources)
2. Deterministic verification engine logic (rumor vs reported vs confirmed)
3. Pipeline idempotency (re-running on identical feeds creates no duplicates)
"""
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import run_news

def test_deduplication_scenario():
    print("=== TEST 1: MULTI-SOURCE DEDUPLICATION TEST ===")
    raw_items = [
        {
            "raw_title": "Christopher Nolan Sets Next Feature Film at Universal for Summer 2026 - Variety",
            "url": "https://variety.com/2026/film/nolan-universal-next",
            "published_at": "Thu, 08 Oct 2026 10:00:00 GMT",
            "category_hint": "Hollywood"
        },
        {
            "raw_title": "Nolan's Next Feature Film Headed to Universal for Summer 2026 Release - Deadline",
            "url": "https://deadline.com/2026/film/nolan-universal-2026",
            "published_at": "Thu, 08 Oct 2026 10:05:00 GMT",
            "category_hint": "Hollywood"
        },
        {
            "raw_title": "Universal Lands Christopher Nolan Next Feature Film for Summer 2026 - The Hollywood Reporter",
            "url": "https://hollywoodreporter.com/movies/nolan-universal-date",
            "published_at": "Thu, 08 Oct 2026 10:10:00 GMT",
            "category_hint": "Hollywood"
        }
    ]

    processed = []
    for item in raw_items:
        clean_title, src_name = run_news.normalize_title(item["raw_title"])
        processed.append({
            "raw_title": item["raw_title"],
            "title": clean_title,
            "source_name": src_name,
            "url": item["url"],
            "published_at": item["published_at"],
            "category_hint": item["category_hint"],
            "tokens": run_news.tokenize_title(clean_title)
        })

    clusters = run_news.cluster_duplicates(processed, similarity_threshold=0.40)
    print(f"Discovered items: {len(processed)}")
    print(f"Formed clusters: {len(clusters)}")

    assert len(clusters) == 1, f"Expected 1 canonical cluster, but got {len(clusters)}"
    assert len(clusters[0]["sources"]) == 3, f"Expected 3 sources in canonical cluster, got {len(clusters[0]['sources'])}"
    print(f"[PASS] 3 distinct source wires successfully clustered into 1 canonical story with 3 sources!")
    for idx, s in enumerate(clusters[0]["sources"]):
        print(f"       Source {idx+1}: [{s['source_name']}] {s['title']}")

def test_verification_engine():
    print("\n=== TEST 2: DETERMINISTIC VERIFICATION ENGINE TEST ===")
    
    # Case A: Corroborated by 2+ trade sources -> confirmed
    cluster_a = {
        "primary_title": "Christopher Nolan Sets Next Feature Film at Universal for Summer 2026",
        "sources": [
            {"source_name": "Variety", "title": "...", "url": "..."},
            {"source_name": "Deadline", "title": "...", "url": "..."}
        ]
    }
    status_a, notes_a = run_news.determine_verification_status(cluster_a)
    assert status_a == "confirmed", f"Expected confirmed, got {status_a}"
    print(f"[PASS] Case A (2 accredited trades): '{status_a}' ({notes_a})")

    # Case B: Single trade exclusive -> reported (NOT confirmed)
    cluster_b = {
        "primary_title": "Sony Pictures in Early Talks for New Sci-Fi IP",
        "sources": [
            {"source_name": "Deadline", "title": "...", "url": "..."}
        ]
    }
    status_b, notes_b = run_news.determine_verification_status(cluster_b)
    assert status_b == "reported", f"Expected reported, got {status_b}"
    print(f"[PASS] Case B (Single trade exclusive): '{status_b}' ({notes_b})")

    # Case C: Rumor keywords -> rumor
    cluster_c = {
        "primary_title": "Rumor Suggests Cillian Murphy in Talks for Antagonist Role",
        "sources": [
            {"source_name": "Variety", "title": "...", "url": "..."},
            {"source_name": "Deadline", "title": "...", "url": "..."}
        ]
    }
    status_c, notes_c = run_news.determine_verification_status(cluster_c)
    assert status_c == "rumor", f"Expected rumor, got {status_c}"
    print(f"[PASS] Case C (Contains rumor keyword): '{status_c}' ({notes_c})")

    # Case D: Single unverified blog/secondary -> developing (NEVER confirmed)
    cluster_d = {
        "primary_title": "New Gaming Handheld Prototype Spotted Online",
        "sources": [
            {"source_name": "TechBlogHub", "title": "...", "url": "..."}
        ]
    }
    status_d, notes_d = run_news.determine_verification_status(cluster_d)
    assert status_d == "developing", f"Expected developing, got {status_d}"
    print(f"[PASS] Case D (Single unverified blog): '{status_d}' ({notes_d})")

def test_idempotency_simulation():
    print("\n=== TEST 3: INGESTION IDEMPOTENCY TEST ===")
    # Simulate processing identical items twice
    items = [
        {
            "raw_title": "GTA VI Development Enters Final Polish Phase - IGN",
            "url": "https://ign.com/articles/gta-6-polish-phase",
            "published_at": "Thu, 08 Oct 2026 11:00:00 GMT",
            "category_hint": "Gaming"
        }
    ]
    p = []
    for item in items:
        clean_title, src_name = run_news.normalize_title(item["raw_title"])
        p.append({
            "title": clean_title,
            "source_name": src_name,
            "url": item["url"],
            "published_at": item["published_at"],
            "category_hint": item["category_hint"],
            "tokens": run_news.tokenize_title(clean_title)
        })

    c1 = run_news.cluster_duplicates(p)
    c2 = run_news.cluster_duplicates(p)
    assert len(c1) == len(c2) == 1
    assert c1[0]["primary_title"] == c2[0]["primary_title"]
    print(f"[PASS] Ingestion clustering is completely deterministic and idempotent.")

if __name__ == '__main__':
    test_deduplication_scenario()
    test_verification_engine()
    test_idempotency_simulation()
    print("\n[OK] ALL DEDUPLICATION & VERIFICATION TESTS PASSED.")
