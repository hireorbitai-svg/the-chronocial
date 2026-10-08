"""
The Chronicle — Story Clustering Engine
Groups normalized records from multiple bureaus into canonical editorial clusters.
Selects canonical metadata based on earliest discovery, highest credibility tier,
and source corroboration.
"""

from typing import List, Dict, Any
from news_engine.dedup import are_stories_same_event, compute_title_hash

def cluster_ingested_stories(
    items: List[Dict[str, Any]],
    similarity_threshold: float = 0.45
) -> List[Dict[str, Any]]:
    """
    Cluster raw items reporting the same event into a single canonical story with multiple sources.
    Example: Variety + Deadline + Reuters on same news -> 1 Canonical Cluster with 3 sources.
    """
    clusters: List[Dict[str, Any]] = []

    for item in items:
        matched_cluster = None
        for cluster in clusters:
            # Test if item matches this cluster
            representative_story = {
                "category": cluster["category"],
                "tokens": cluster["tokens"]
            }
            if are_stories_same_event(item, representative_story, similarity_threshold):
                matched_cluster = cluster
                break

        source_record = {
            "item_id": item.get("item_id"),
            "source_name": item["source_name"],
            "source_slug": item.get("source_slug", ""),
            "source_url": item["source_url"],
            "source_title": item["source_title"],
            "canonical_url": item.get("canonical_url", item["source_url"]),
            "published_at": item["published_at"],
            "credibility_tier": item.get("credibility_tier", 2),
            "image_url": item.get("image_url")
        }

        if matched_cluster:
            # Check for duplicate URL within the cluster to ensure source URL uniqueness
            existing_urls = {s["canonical_url"] for s in matched_cluster["sources"]}
            if source_record["canonical_url"] not in existing_urls:
                matched_cluster["sources"].append(source_record)
                matched_cluster["tokens"].update(item.get("tokens", set()))
                
                # If newly arrived source is a higher tier (Tier 1 vs Tier 2), upgrade primary evidence
                if source_record["credibility_tier"] < matched_cluster["best_credibility_tier"]:
                    matched_cluster["best_credibility_tier"] = source_record["credibility_tier"]
                    matched_cluster["primary_source_name"] = source_record["source_name"]

                # If current cluster has no image but newly added source has one, adopt it
                if not matched_cluster.get("hero_image_url") and source_record.get("image_url"):
                    matched_cluster["hero_image_url"] = source_record["image_url"]
        else:
            # Create a new canonical cluster
            clusters.append({
                "cluster_hash": compute_title_hash(item["source_title"]),
                "primary_title": item["source_title"],
                "category": item.get("category", "Hollywood"),
                "subcategory": item.get("subcategory", "Trade Dispatch"),
                "tokens": set(item.get("tokens", set())),
                "best_credibility_tier": item.get("credibility_tier", 2),
                "primary_source_name": item["source_name"],
                "hero_image_url": item.get("image_url"),
                "first_discovered_at": item["published_at"],
                "sources": [source_record]
            })

    return clusters
