"""
The Chronicle — Source Registry
Defines accredited sources, credibility tiers, categories, rate limits, and feed endpoints.
"""

from typing import List, Dict, Any, Optional

SOURCE_REGISTRY: List[Dict[str, Any]] = [
    # --- HOLLYWOOD & FILM TRADES (TIER 2) ---
    {
        "name": "Variety",
        "slug": "variety",
        "domain": "variety.com",
        "base_url": "https://variety.com",
        "source_type": "trade_publication",
        "category": "Hollywood",
        "subcategory": "Trade Bureau",
        "credibility_tier": 2,
        "rss_url": "https://variety.com/feed/",
        "polling_priority": 1,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Premier entertainment trade publication covering box office, casting, and deals."
    },
    {
        "name": "Deadline Hollywood",
        "slug": "deadline",
        "domain": "deadline.com",
        "base_url": "https://deadline.com",
        "source_type": "trade_publication",
        "category": "Hollywood",
        "subcategory": "Breaking Scoop Desk",
        "credibility_tier": 2,
        "rss_url": "https://deadline.com/feed/",
        "polling_priority": 1,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "First-look scoops, studio deals, and festival coverage."
    },
    {
        "name": "The Hollywood Reporter",
        "slug": "hollywood-reporter",
        "domain": "hollywoodreporter.com",
        "base_url": "https://www.hollywoodreporter.com",
        "source_type": "trade_publication",
        "category": "Hollywood",
        "subcategory": "Industry Analysis",
        "credibility_tier": 2,
        "rss_url": "https://www.hollywoodreporter.com/feed/",
        "polling_priority": 1,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Authoritative entertainment trade news, labor agreements, and award circuits."
    },
    {
        "name": "IndieWire",
        "slug": "indiewire",
        "domain": "indiewire.com",
        "base_url": "https://www.indiewire.com",
        "source_type": "trade_publication",
        "category": "Movies",
        "subcategory": "Festival & Auteur Cinema",
        "credibility_tier": 2,
        "rss_url": "https://www.indiewire.com/feed/",
        "polling_priority": 2,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Independent cinema, critical perspectives, and festival coverage."
    },

    # --- BOLLYWOOD & PAN-INDIA (TIER 2) ---
    {
        "name": "Bollywood Hungama",
        "slug": "bollywood-hungama",
        "domain": "bollywoodhungama.com",
        "base_url": "https://www.bollywoodhungama.com",
        "source_type": "trade_publication",
        "category": "Bollywood",
        "subcategory": "Box Office & Trades",
        "credibility_tier": 2,
        "rss_url": "https://www.bollywoodhungama.com/rss/news.xml",
        "polling_priority": 1,
        "rate_limit_seconds": 2,
        "country": "IN",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Pan-India box office metrics, certification filings, and production dispatches."
    },
    {
        "name": "The Indian Express Cinema",
        "slug": "indian-express-cinema",
        "domain": "indianexpress.com",
        "base_url": "https://indianexpress.com/section/entertainment",
        "source_type": "major_media",
        "category": "Bollywood",
        "subcategory": "Pan-India National Desk",
        "credibility_tier": 2,
        "rss_url": "https://indianexpress.com/section/entertainment/feed/",
        "polling_priority": 2,
        "rate_limit_seconds": 2,
        "country": "IN",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Comprehensive reporting across Hindi, Tamil, Telugu, and Malayalam cinema."
    },

    # --- CELEBRITIES & CULTURE (TIER 2) ---
    {
        "name": "Rolling Stone Culture",
        "slug": "rolling-stone",
        "domain": "rollingstone.com",
        "base_url": "https://www.rollingstone.com/culture",
        "source_type": "major_media",
        "category": "Celebrities",
        "subcategory": "Culture & Music",
        "credibility_tier": 2,
        "rss_url": "https://www.rollingstone.com/culture/feed/",
        "polling_priority": 2,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Deep-dive profiles, celebrity profiles, and cultural resonance."
    },
    {
        "name": "Billboard",
        "slug": "billboard",
        "domain": "billboard.com",
        "base_url": "https://www.billboard.com",
        "source_type": "trade_publication",
        "category": "Celebrities",
        "subcategory": "Music & Live Touring",
        "credibility_tier": 2,
        "rss_url": "https://www.billboard.com/feed/",
        "polling_priority": 2,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Music industry filings, soundtrack developments, and arena touring analytics."
    },

    # --- TV & STREAMING / OTT (TIER 2) ---
    {
        "name": "TVLine",
        "slug": "tvline",
        "domain": "tvline.com",
        "base_url": "https://tvline.com",
        "source_type": "trade_publication",
        "category": "TV & OTT",
        "subcategory": "Episodic Television",
        "credibility_tier": 2,
        "rss_url": "https://tvline.com/feed/",
        "polling_priority": 1,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Series renewals, season cancellations, and network premiere schedules."
    },
    {
        "name": "What's on Netflix",
        "slug": "whats-on-netflix",
        "domain": "whats-on-netflix.com",
        "base_url": "https://www.whats-on-netflix.com",
        "source_type": "aggregator",
        "category": "TV & OTT",
        "subcategory": "Streaming Specialist",
        "credibility_tier": 2,
        "rss_url": "https://www.whats-on-netflix.com/feed/",
        "polling_priority": 2,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Verified streaming releases, licensing departures, and top 10 charts."
    },

    # --- GAMING OFFICIAL DIRECT DISPATCHES (TIER 1) ---
    {
        "name": "PlayStation Blog",
        "slug": "playstation-blog",
        "domain": "blog.playstation.com",
        "base_url": "https://blog.playstation.com",
        "source_type": "official",
        "category": "Gaming",
        "subcategory": "PlayStation",
        "credibility_tier": 1,
        "rss_url": "https://blog.playstation.com/feed/",
        "polling_priority": 1,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Official hardware announcements, State of Play dispatches, and SIE direct announcements."
    },
    {
        "name": "Xbox Wire",
        "slug": "xbox-wire",
        "domain": "news.xbox.com",
        "base_url": "https://news.xbox.com",
        "source_type": "official",
        "category": "Gaming",
        "subcategory": "Xbox",
        "credibility_tier": 1,
        "rss_url": "https://news.xbox.com/feed/",
        "polling_priority": 1,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Official Microsoft Gaming announcements, Game Pass additions, and developer deep dives."
    },

    # --- GAMING PUBLICATIONS (TIER 2 & TIER 3) ---
    {
        "name": "IGN Games",
        "slug": "ign-games",
        "domain": "ign.com",
        "base_url": "https://www.ign.com/games",
        "source_type": "gaming_publication",
        "category": "Gaming",
        "subcategory": "All Platforms",
        "credibility_tier": 2,
        "rss_url": "https://feeds.feedburner.com/ign/games-all",
        "polling_priority": 1,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Interactive entertainment news, hardware benchmarks, and game reviews."
    },
    {
        "name": "GameSpot",
        "slug": "gamespot",
        "domain": "gamespot.com",
        "base_url": "https://www.gamespot.com",
        "source_type": "gaming_publication",
        "category": "Gaming",
        "subcategory": "Interactive Industry",
        "credibility_tier": 2,
        "rss_url": "https://www.gamespot.com/feeds/news/",
        "polling_priority": 1,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Game reviews, developer interviews, and patch dispatching."
    },
    {
        "name": "PC Gamer",
        "slug": "pc-gamer",
        "domain": "pcgamer.com",
        "base_url": "https://www.pcgamer.com",
        "source_type": "gaming_publication",
        "category": "Gaming",
        "subcategory": "PC",
        "credibility_tier": 2,
        "rss_url": "https://www.pcgamer.com/rss/",
        "polling_priority": 1,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "PC gaming, graphics hardware, modding communities, and Steam tracking."
    },
    {
        "name": "Polygon",
        "slug": "polygon",
        "domain": "polygon.com",
        "base_url": "https://www.polygon.com",
        "source_type": "gaming_publication",
        "category": "Gaming",
        "subcategory": "Gaming Culture",
        "credibility_tier": 2,
        "rss_url": "https://www.polygon.com/rss/index.xml",
        "polling_priority": 2,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Gaming culture, narrative design, and cross-medium entertainment."
    },

    # --- MAJOR GENERAL NEWS WIRES (TIER 1) ---
    {
        "name": "Reuters Entertainment",
        "slug": "reuters-entertainment",
        "domain": "reuters.com",
        "base_url": "https://www.reuters.com",
        "source_type": "major_media",
        "category": "Hollywood",
        "subcategory": "Global Wire",
        "credibility_tier": 1,
        "rss_url": "https://news.google.com/rss/search?q=when:2d+source:Reuters+entertainment&hl=en-US&gl=US&ceid=US:en",
        "polling_priority": 1,
        "rate_limit_seconds": 2,
        "country": "US",
        "language": "en",
        "is_active": True,
        "parser_type": "rss",
        "notes": "Global accredited news agency with direct verification protocols."
    }
]

def get_active_sources() -> List[Dict[str, Any]]:
    """Return all currently active sources ordered by polling priority."""
    active = [s for s in SOURCE_REGISTRY if s.get("is_active", True)]
    return sorted(active, key=lambda x: x.get("polling_priority", 2))

def find_source_by_slug(slug: str) -> Optional[Dict[str, Any]]:
    for s in SOURCE_REGISTRY:
        if s["slug"] == slug:
            return s
    return None

def find_source_by_name(name: str) -> Optional[Dict[str, Any]]:
    name_lower = name.lower()
    for s in SOURCE_REGISTRY:
        if s["name"].lower() == name_lower or s["slug"] in name_lower:
            return s
    return None
