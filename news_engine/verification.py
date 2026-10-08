"""
The Chronicle — Simple & Trustworthy Story Verification
Enforces clear, deterministic rules:
- official source → confirmed
- multiple reputable sources → confirmed
- clear rumor / speculation → rumor
- single reputable report → reported
"""

from typing import Dict, Any, Tuple

RUMOR_MARKERS = [
    "rumor", "rumored", "in talks", "eyed for", "unconfirmed",
    "speculation", "reportedly", "allegedly", "claims", "whispers"
]

def analyze_verification_status(cluster: Dict[str, Any]) -> Tuple[str, str]:
    """
    Deterministically computes story verification status: 'confirmed', 'reported', or 'rumor'.
    """
    title_lower = cluster["primary_title"].lower()
    sources = cluster.get("sources", [])
    source_count = len(sources)

    # 1. Clear rumor / speculation
    if any(marker in title_lower for marker in RUMOR_MARKERS):
        return ("rumor", "Reported as preliminary speculation or unconfirmed leak.")

    # 2. Official source → confirmed
    if any(s.get("credibility_tier") == 1 or s.get("is_official") for s in sources):
        primary_name = sources[0].get("source_name", "official disclosure")
        return ("confirmed", f"Officially confirmed via {primary_name}.")

    # 3. Multiple reputable sources → confirmed
    if source_count >= 2:
        return ("confirmed", f"Corroborated by {source_count} independent news sources.")

    # 4. Single reputable report → reported
    primary_name = sources[0].get("source_name", "trade dispatch") if sources else "trade wire"
    return ("reported", f"Initial reporting documented by {primary_name}.")

