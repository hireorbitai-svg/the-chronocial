"""
The Chronicle — Homepage Ranking & Trending Scoring Engine
Calculates deterministic ranking scores based on source corroboration,
status confidence, and temporal recency.
"""

import datetime
from typing import Dict, Any

def compute_story_scores(
    cluster: Dict[str, Any],
    status: str,
    source_count: int,
    is_updated: bool = False
) -> Dict[str, float]:
    """
    Computes both 'trending_score' and 'ranking_score' for editorial display.
    """
    # 1. Status Weight
    status_weights = {
        "confirmed": 10.0,
        "updated": 9.0,
        "reported": 6.0,
        "developing": 5.0,
        "rumor": 3.0
    }
    status_score = status_weights.get(status, 5.0)

    # 2. Corroboration Weight (Each independent source adds confidence)
    source_score = min(source_count * 3.5, 15.0)

    # 3. Recency Decay (Hours since discovery)
    hours_ago = 1.0
    discovered_at = cluster.get("first_discovered_at")
    if discovered_at:
        try:
            import email.utils
            try:
                dt = email.utils.parsedate_to_datetime(discovered_at)
            except Exception:
                dt = datetime.datetime.fromisoformat(discovered_at.replace("Z", "+00:00"))
            now = datetime.datetime.now(datetime.timezone.utc)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=datetime.timezone.utc)
            delta = (now - dt).total_seconds() / 3600.0
            hours_ago = max(delta, 0.5)
        except Exception:
            hours_ago = 1.0

    # Recency multiplier: 1.0 / (1.0 + hours / 24)
    recency_factor = 24.0 / (24.0 + hours_ago)

    # 4. Editorial Priority Boost
    priority_boost = 5.0 if cluster.get("best_credibility_tier") == 1 else 2.0
    if is_updated:
        priority_boost += 3.0

    trending_score = round((status_score + source_score + priority_boost) * recency_factor, 2)
    ranking_score = round(status_score + source_score + priority_boost, 2)

    return {
        "trending_score": trending_score,
        "ranking_score": ranking_score
    }
