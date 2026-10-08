"""
The Chronicle — Entity Extraction & Matching Engine
Identifies People, Movies, TV Shows, Games, and Companies from trade reporting.
Prevents duplicate entity creation through slug normalization and alias matching.
"""

import re
from typing import Dict, List, Any, Optional
from news_engine.normalize import slugify, normalize_text

# Controlled canonical aliases for known high-profile entertainment & gaming entities
KNOWN_ENTITY_ALIASES = {
    # Companies / Studios / Platforms
    "universal": {"name": "Universal Pictures", "type": "company", "slug": "universal-pictures"},
    "universal pictures": {"name": "Universal Pictures", "type": "company", "slug": "universal-pictures"},
    "warner bros": {"name": "Warner Bros. Discovery", "type": "company", "slug": "warner-bros-discovery"},
    "warner bros.": {"name": "Warner Bros. Discovery", "type": "company", "slug": "warner-bros-discovery"},
    "wbd": {"name": "Warner Bros. Discovery", "type": "company", "slug": "warner-bros-discovery"},
    "disney": {"name": "The Walt Disney Company", "type": "company", "slug": "the-walt-disney-company"},
    "sony pictures": {"name": "Sony Pictures Entertainment", "type": "company", "slug": "sony-pictures-entertainment"},
    "sony interactive entertainment": {"name": "Sony Interactive Entertainment", "type": "company", "slug": "sony-interactive-entertainment"},
    "playstation": {"name": "Sony Interactive Entertainment", "type": "company", "slug": "sony-interactive-entertainment"},
    "xbox": {"name": "Microsoft Gaming", "type": "company", "slug": "microsoft-gaming"},
    "microsoft gaming": {"name": "Microsoft Gaming", "type": "company", "slug": "microsoft-gaming"},
    "nintendo": {"name": "Nintendo", "type": "company", "slug": "nintendo"},
    "rockstar games": {"name": "Rockstar Games", "type": "company", "slug": "rockstar-games"},
    "netflix": {"name": "Netflix", "type": "company", "slug": "netflix"},

    # High-profile Filmmakers & Actors
    "christopher nolan": {"name": "Christopher Nolan", "type": "person", "slug": "christopher-nolan", "role": "Director / Writer"},
    "nolan": {"name": "Christopher Nolan", "type": "person", "slug": "christopher-nolan", "role": "Director / Writer"},
    "shah rukh khan": {"name": "Shah Rukh Khan", "type": "person", "slug": "shah-rukh-khan", "role": "Actor / Producer"},
    "denis villeneuve": {"name": "Denis Villeneuve", "type": "person", "slug": "denis-villeneuve", "role": "Director / Producer"},
    "tom holland": {"name": "Tom Holland", "type": "person", "slug": "tom-holland", "role": "Actor"},
    "zendaya": {"name": "Zendaya", "type": "person", "slug": "zendaya", "role": "Actress"},
    "cillian murphy": {"name": "Cillian Murphy", "type": "person", "slug": "cillian-murphy", "role": "Actor"},
    "hideo kojima": {"name": "Hideo Kojima", "type": "person", "slug": "hideo-kojima", "role": "Game Director"},

    # High-profile Games
    "grand theft auto vi": {"name": "Grand Theft Auto VI", "type": "game", "slug": "grand-theft-auto-vi"},
    "gta vi": {"name": "Grand Theft Auto VI", "type": "game", "slug": "grand-theft-auto-vi"},
    "gta 6": {"name": "Grand Theft Auto VI", "type": "game", "slug": "grand-theft-auto-vi"},
    "death stranding 2": {"name": "Death Stranding 2: On The Beach", "type": "game", "slug": "death-stranding-2"},
    "elder scrolls vi": {"name": "The Elder Scrolls VI", "type": "game", "slug": "the-elder-scrolls-vi"},
    "wolverine": {"name": "Marvel's Wolverine", "type": "game", "slug": "marvels-wolverine"}
}

def normalize_entity_name(name: str) -> str:
    """Standardize entity naming (clean multiple spaces, commas)."""
    s = normalize_text(name)
    # Remove inverted comma notation (e.g. 'Nolan, Christopher' -> 'Christopher Nolan')
    if "," in s:
        parts = [p.strip() for p in s.split(",", 1)]
        if len(parts) == 2:
            s = f"{parts[1]} {parts[0]}"
    return re.sub(r'\s+', ' ', s).strip()

def extract_entities_from_text(title: str, body: str = "") -> List[Dict[str, Any]]:
    """
    Deterministically scan headline and context text for recognized canonical entities.
    Returns deduplicated list of matched entities with type and slug.
    """
    combined = f"{title} {body}".lower()
    matched_slugs = set()
    results = []

    # Check known aliases
    for alias_key, entity in KNOWN_ENTITY_ALIASES.items():
        # Match whole word pattern
        pattern = r'\b' + re.escape(alias_key) + r'\b'
        if re.search(pattern, combined):
            slug = entity["slug"]
            if slug not in matched_slugs:
                matched_slugs.add(slug)
                results.append({
                    "name": entity["name"],
                    "type": entity["type"],
                    "slug": entity["slug"],
                    "role": entity.get("role")
                })

    return results

def match_or_create_entity_record(
    entity_data: Dict[str, Any],
    existing_db_entities: Dict[str, str]
) -> Dict[str, Any]:
    """
    Ensure an entity is matched to an existing record ID if present.
    `existing_db_entities` maps slug -> UUID.
    """
    norm_name = normalize_entity_name(entity_data["name"])
    slug = slugify(norm_name)
    
    entity_id = existing_db_entities.get(slug)
    return {
        "id": entity_id,
        "name": norm_name,
        "slug": slug,
        "type": entity_data["type"],
        "is_existing": entity_id is not None
    }
