"""
The Chronicle — Normalization Engine
Sanitizes raw text, strips tracking parameters to generate canonical URLs,
decodes HTML entities, handles Unicode, and normalizes timestamps.
"""

import re
import html
import unicodedata
import urllib.parse
import email.utils
import datetime

# Common URL query parameters to strip for canonicalization
TRACKING_PARAMS = {
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "ref", "fbclid", "gclid", "msclkid", "mc_cid", "mc_eid", "oc",
    "_hsenc", "_hsmi", "source", "igshid", "spJobID", "spReportId"
}

def clean_canonical_url(url: str) -> str:
    """Strip marketing tracking parameters while preserving source query routing."""
    if not url:
        return ""
    try:
        parsed = urllib.parse.urlsplit(url.strip())
        query_pairs = urllib.parse.parse_qsl(parsed.query, keep_blank_values=True)
        filtered = [(k, v) for k, v in query_pairs if k.lower() not in TRACKING_PARAMS]
        clean_query = urllib.parse.urlencode(filtered)
        clean_url = urllib.parse.urlunsplit((
            parsed.scheme.lower(),
            parsed.netloc.lower(),
            parsed.path,
            clean_query,
            ""  # Strip fragment
        ))
        return clean_url
    except Exception:
        return url.strip()

def normalize_text(text: str) -> str:
    """Normalize Unicode, unescape HTML entities, and collapse whitespace."""
    if not text:
        return ""
    # 1. Unescape HTML entities (e.g. &amp;, &quot;, &#8217;)
    s = html.unescape(text)
    # 2. Normalize Unicode (NFC form)
    s = unicodedata.normalize("NFC", s)
    # 3. Replace fancy quotes and typographic dashes with clean ASCII equivalents
    s = s.replace("“", '"').replace("”", '"').replace("’", "'").replace("‘", "'")
    s = s.replace("—", " - ").replace("–", " - ")
    # 4. Collapse whitespace
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def normalize_headline(raw_title: str) -> tuple:
    """
    Separate publication suffixes (e.g. 'Tom Holland Set for Epic - Deadline')
    and return (clean_title, detected_source_name).
    """
    clean = normalize_text(raw_title)
    detected_source = "Trade Wire"
    if " - " in clean:
        parts = clean.rsplit(" - ", 1)
        if len(parts[1].split()) <= 4:  # Source suffix is typically short
            clean = parts[0].strip()
            detected_source = parts[1].strip()
    elif " | " in clean:
        parts = clean.rsplit(" | ", 1)
        if len(parts[1].split()) <= 4:
            clean = parts[0].strip()
            detected_source = parts[1].strip()
    return clean, detected_source

def normalize_iso_timestamp(date_str: str) -> str:
    """Parse various RSS date formats (RFC 822, RFC 2822, ISO) into standard ISO-8601 UTC string."""
    if not date_str:
        return datetime.datetime.now(datetime.timezone.utc).isoformat()
    try:
        dt = email.utils.parsedate_to_datetime(date_str)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=datetime.timezone.utc)
        return dt.astimezone(datetime.timezone.utc).isoformat()
    except Exception:
        try:
            dt = datetime.datetime.fromisoformat(date_str.replace("Z", "+00:00"))
            return dt.astimezone(datetime.timezone.utc).isoformat()
        except Exception:
            return datetime.datetime.now(datetime.timezone.utc).isoformat()

def slugify(text: str) -> str:
    """Generate a clean URL slug."""
    s = text.lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s-]+', '-', s).strip('-')
    return s[:90]
