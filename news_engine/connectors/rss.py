"""
The Chronicle — Modular Ingestion Connector: RSS
Fetches, validates, and parses standard RSS and Atom feeds with retries,
backoff, timeout, and malformed-feed protection.
"""

import time
import requests
import datetime
import xml.etree.ElementTree as ET
from typing import List, Dict, Any, Optional

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) TheChronicleBot/2.0 (+https://thechronicle.media/bot)"

def fetch_feed_with_retry(
    url: str,
    max_retries: int = 2,
    timeout: int = 10,
    backoff_factor: float = 1.5
) -> Optional[bytes]:
    """Fetch feed content with exponential backoff and timeout."""
    headers = {"User-Agent": USER_AGENT}
    for attempt in range(max_retries + 1):
        try:
            resp = requests.get(url, headers=headers, timeout=timeout)
            if resp.status_code == 200 and resp.content:
                return resp.content
            elif resp.status_code in [429, 500, 502, 503, 504] and attempt < max_retries:
                time.sleep(backoff_factor ** attempt)
            else:
                return None
        except (requests.RequestException, TimeoutError):
            if attempt < max_retries:
                time.sleep(backoff_factor ** attempt)
            else:
                return None
    return None

def parse_rss_items(
    content: bytes,
    source_meta: Dict[str, Any],
    max_items: int = 10
) -> List[Dict[str, Any]]:
    """Parse raw XML into common normalized feed records."""
    items: List[Dict[str, Any]] = []
    if not content:
        return items

    try:
        root = ET.fromstring(content)
    except ET.ParseError:
        # Feed is malformed XML; abort gracefully
        return items

    channel_items = root.findall(".//item")
    if not channel_items:
        # Check Atom format <entry>
        channel_items = root.findall(".//{http://www.w3.org/2005/Atom}entry")

    for el in channel_items[:max_items]:
        # Handle both standard RSS and Atom elements
        title_el = el.find("title")
        if title_el is None:
            title_el = el.find("{http://www.w3.org/2005/Atom}title")
        
        link_el = el.find("link")
        if link_el is None:
            link_el = el.find("{http://www.w3.org/2005/Atom}link")
        
        date_el = el.find("pubDate")
        if date_el is None:
            date_el = el.find("{http://www.w3.org/2005/Atom}published") or el.find("{http://www.w3.org/2005/Atom}updated")
            
        desc_el = el.find("description")
        if desc_el is None:
            desc_el = el.find("{http://www.w3.org/2005/Atom}summary")

        # Extract link text or attribute
        link = ""
        if link_el is not None:
            link = link_el.text.strip() if link_el.text else link_el.attrib.get("href", "").strip()

        title = title_el.text.strip() if title_el is not None and title_el.text else ""
        pub_date = date_el.text.strip() if date_el is not None and date_el.text else ""
        desc = desc_el.text.strip() if desc_el is not None and desc_el.text else ""

        # Extract enclosure or media thumbnail if present
        image_url = None
        enclosure = el.find("enclosure")
        if enclosure is not None and "image" in enclosure.attrib.get("type", ""):
            image_url = enclosure.attrib.get("url")
        if not image_url:
            media_thumb = el.find(".//{http://search.yahoo.com/mrss/}thumbnail") or el.find(".//{http://search.yahoo.com/mrss/}content")
            if media_thumb is not None:
                image_url = media_thumb.attrib.get("url")

        if title and link:
            items.append({
                "source_name": source_meta["name"],
                "source_slug": source_meta["slug"],
                "source_url": link,
                "source_title": title,
                "published_at": pub_date or datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "image_url": image_url,
                "category": source_meta.get("category", "Hollywood"),
                "subcategory": source_meta.get("subcategory", "Trade Dispatch"),
                "credibility_tier": source_meta.get("credibility_tier", 2),
                "raw_description": desc
            })

    return items
