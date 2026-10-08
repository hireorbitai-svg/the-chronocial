"""
The Chronicle — Duplicate Detection & Similarity Engine
Extracts informative content tokens, computes similarity metrics,
and enforces multi-signal event matching.
"""

import string
import hashlib
from typing import Set, Dict, Any

STOP_WORDS = {
    "the", "a", "an", "and", "or", "in", "on", "at", "to", "for", "of", "with",
    "by", "is", "are", "was", "were", "be", "been", "has", "have", "had", "it",
    "its", "as", "from", "that", "this", "after", "over", "into", "about", "new"
}

def tokenize_title(title: str) -> Set[str]:
    """Extract filtered, lowercase content words (length >= 3) without punctuation."""
    if not title:
        return set()
    translator = str.maketrans("", "", string.punctuation)
    clean = title.lower().translate(translator)
    words = clean.split()
    return set(w for w in words if w not in STOP_WORDS and len(w) >= 3)

def compute_title_hash(title: str) -> str:
    """Generate deterministic hash for exact duplicate detection."""
    tokens = sorted(list(tokenize_title(title)))
    token_str = " ".join(tokens)
    return hashlib.sha256(token_str.encode("utf-8")).hexdigest()[:16]

def calculate_jaccard_similarity(set_a: Set[str], set_b: Set[str]) -> float:
    """Compute token intersection over union."""
    if not set_a or not set_b:
        return 0.0
    intersection = len(set_a.intersection(set_b))
    union = len(set_a.union(set_b))
    return intersection / union if union > 0 else 0.0

def are_stories_same_event(
    story_a: Dict[str, Any],
    story_b: Dict[str, Any],
    similarity_threshold: float = 0.45
) -> bool:
    """
    Multi-signal decision to determine if two records cover the exact same real-world event.
    Requirements:
    1. Matching category (Hollywood vs Hollywood, Gaming vs Gaming).
    2. Token similarity above threshold.
    3. Prevents false positive mergers when stories only share an entity name but differ in event context.
    """
    cat_a = story_a.get("category", "").lower()
    cat_b = story_b.get("category", "").lower()
    if cat_a and cat_b and cat_a != cat_b:
        # Cross-category items are not merged into the same event
        return False

    tokens_a = story_a.get("tokens", set())
    tokens_b = story_b.get("tokens", set())

    # Exact token match
    if tokens_a == tokens_b and len(tokens_a) >= 3:
        return True

    sim = calculate_jaccard_similarity(tokens_a, tokens_b)

    # If similarity is lower than threshold, never merge
    if sim < similarity_threshold:
        return False

    # Check for shared key verbs / event action words
    shared = tokens_a.intersection(tokens_b)
    # If shared tokens are only 1-2 words (like a person's first and last name),
    # but the remaining tokens diverge, do not merge!
    if len(shared) <= 2 and (len(tokens_a) >= 5 or len(tokens_b) >= 5):
        return False

    return True
