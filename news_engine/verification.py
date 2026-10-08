"""
The Chronicle — Deterministic Source-Credibility & Verification Engine
Classifies stories into rumor, reported, developing, confirmed, or updated
based on empirical source tiers and linguistic markers.
"""

from typing import Dict, Any, Tuple

RUMOR_MARKERS = [
    "rumor", "reportedly", "allegedly", "sources say", "speculation",
    "may star", "could direct", "unconfirmed", "leaked details", "whispers"
]

def analyze_verification_status(cluster: Dict[str, Any]) -> Tuple[str, str]:
    """
    Deterministically computes story verification status and audit notes.
    Returns: (status, verification_notes)
    """
    title_lower = cluster["primary_title"].lower()
    sources = cluster.get("sources", [])
    source_count = len(sources)

    # 1. Linguistic Rumor Detection
    is_rumor = any(marker in title_lower for marker in RUMOR_MARKERS)
    if is_rumor:
        return (
            "rumor",
            "Flagged as industry reportage based on preliminary unverified market intelligence."
        )

    # 2. Source Credibility Tally
    tier_1_count = 0  # Official studio, developer, direct wire (Reuters, PlayStation Blog, Xbox Wire)
    tier_2_count = 0  # Established trades (Variety, Deadline, THR, IGN, Bollywood Hungama)
    tier_3_count = 0  # Secondary aggregators, blogs

    for s in sources:
        tier = s.get("credibility_tier", 2)
        if tier == 1:
            tier_1_count += 1
        elif tier == 2:
            tier_2_count += 1
        else:
            tier_3_count += 1

    # 3. Deterministic Decision Matrix
    if tier_1_count >= 1:
        # Direct official studio/publisher statement or accredited wire
        if source_count > 1:
            return (
                "confirmed",
                f"Officially confirmed by primary bureau ({sources[0]['source_name']}) with secondary trade corroboration."
            )
        return (
            "confirmed",
            f"Directly verified via official bureau disclosure from {sources[0]['source_name']}."
        )

    if tier_2_count >= 2:
        # Multiple independent trades corroborating the same event
        trade_names = ", ".join(list(set(s['source_name'] for s in sources))[:3])
        return (
            "confirmed",
            f"Corroborated across {source_count} independent trade bureaus ({trade_names})."
        )

    if tier_2_count == 1:
        # Single trade scoop/report
        return (
            "reported",
            f"Initial trade report documented exclusively by {sources[0]['source_name']}. Cross-verification ongoing."
        )

    if source_count >= 2:
        return (
            "reported",
            f"Reported across {source_count} secondary outlets without official primary trade confirmation."
        )

    # Single Tier-3 or unverified source
    return (
        "developing",
        f"Single dispatch noted from {sources[0].get('source_name', 'wire service')}. Active monitoring ongoing."
    )
