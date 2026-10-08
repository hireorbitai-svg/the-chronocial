-- Migration: 20261008000005_source_registry_and_ingestion.sql
-- Description: Expand sources table into a comprehensive Source Registry and add Ingestion Run tracking

-- 1. EXPAND SOURCES TABLE
ALTER TABLE public.sources 
    ADD COLUMN IF NOT EXISTS category TEXT,
    ADD COLUMN IF NOT EXISTS subcategory TEXT,
    ADD COLUMN IF NOT EXISTS rss_url TEXT,
    ADD COLUMN IF NOT EXISTS api_endpoint TEXT,
    ADD COLUMN IF NOT EXISTS polling_priority INTEGER DEFAULT 2,
    ADD COLUMN IF NOT EXISTS rate_limit_seconds INTEGER DEFAULT 2,
    ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'US',
    ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en',
    ADD COLUMN IF NOT EXISTS last_successful_fetch TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS last_failed_fetch TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS consecutive_failures INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS parser_type TEXT DEFAULT 'rss',
    ADD COLUMN IF NOT EXISTS notes TEXT;

-- Drop and recreate source_type check to accommodate expanded categories
DO $$ 
BEGIN
    ALTER TABLE public.sources DROP CONSTRAINT IF EXISTS sources_source_type_check;
    ALTER TABLE public.sources ADD CONSTRAINT sources_source_type_check 
        CHECK (source_type IN (
            'official', 
            'trade_publication', 
            'major_media', 
            'gaming_publication', 
            'aggregator', 
            'blog', 
            'social', 
            'press_release',
            'publication'
        ));
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

-- 2. EXPAND STORIES TABLE FOR RANKING & CLUSTERING
ALTER TABLE public.stories
    ADD COLUMN IF NOT EXISTS trending_score NUMERIC DEFAULT 0.0,
    ADD COLUMN IF NOT EXISTS ranking_score NUMERIC DEFAULT 0.0,
    ADD COLUMN IF NOT EXISTS key_facts JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS canonical_url TEXT,
    ADD COLUMN IF NOT EXISTS cluster_hash TEXT;

-- Indexes for scores and cluster matching
CREATE INDEX IF NOT EXISTS idx_stories_trending_score ON public.stories (trending_score DESC);
CREATE INDEX IF NOT EXISTS idx_stories_ranking_score ON public.stories (ranking_score DESC);
CREATE INDEX IF NOT EXISTS idx_stories_cluster_hash ON public.stories (cluster_hash);

-- 3. INGESTION RUNS TABLE
CREATE TABLE IF NOT EXISTS public.ingestion_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id TEXT UNIQUE NOT NULL,
    status TEXT CHECK (status IN ('running', 'completed', 'failed')) DEFAULT 'running',
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    sources_attempted INTEGER DEFAULT 0,
    sources_succeeded INTEGER DEFAULT 0,
    sources_failed INTEGER DEFAULT 0,
    stories_discovered INTEGER DEFAULT 0,
    stories_new INTEGER DEFAULT 0,
    stories_updated INTEGER DEFAULT 0,
    duplicates_detected INTEGER DEFAULT 0,
    rejected_items INTEGER DEFAULT 0,
    ai_failures INTEGER DEFAULT 0,
    database_failures INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ingestion_runs_run_id ON public.ingestion_runs (run_id);
CREATE INDEX IF NOT EXISTS idx_ingestion_runs_status ON public.ingestion_runs (status);
CREATE INDEX IF NOT EXISTS idx_ingestion_runs_started_at ON public.ingestion_runs (started_at DESC);

-- 4. RLS & PERMISSIONS FOR INGESTION RUNS
ALTER TABLE public.ingestion_runs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view ingestion runs" ON public.ingestion_runs;
CREATE POLICY "Public can view ingestion runs"
    ON public.ingestion_runs FOR SELECT
    USING (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT ON public.ingestion_runs TO anon, authenticated;
GRANT ALL ON public.ingestion_runs TO service_role;

-- 5. SEED / UPDATE COMPREHENSIVE SOURCE REGISTRY
INSERT INTO public.sources (
    name, slug, domain, base_url, source_type, category, subcategory, credibility_tier, 
    rss_url, polling_priority, rate_limit_seconds, country, language, is_active, notes
) VALUES
    -- HOLLYWOOD & FILM TRADES (TIER 2)
    ('Variety', 'variety', 'variety.com', 'https://variety.com', 'trade_publication', 'Hollywood', 'Trade Bureau', 2, 
     'https://variety.com/feed/', 1, 2, 'US', 'en', true, 'Premier entertainment trade publication covering box office, casting, and deals.'),
    
    ('Deadline Hollywood', 'deadline', 'deadline.com', 'https://deadline.com', 'trade_publication', 'Hollywood', 'Breaking Scoop Desk', 2, 
     'https://deadline.com/feed/', 1, 2, 'US', 'en', true, 'First-look scoops, studio deals, and festival coverage.'),
    
    ('The Hollywood Reporter', 'hollywood-reporter', 'hollywoodreporter.com', 'https://www.hollywoodreporter.com', 'trade_publication', 'Hollywood', 'Industry Analysis', 2, 
     'https://www.hollywoodreporter.com/feed/', 1, 2, 'US', 'en', true, 'Authoritative entertainment trade news, labor agreements, and award circuits.'),

    ('IndieWire', 'indiewire', 'indiewire.com', 'https://www.indiewire.com', 'trade_publication', 'Movies', 'Festival & Auteur Cinema', 2, 
     'https://www.indiewire.com/feed/', 2, 2, 'US', 'en', true, 'Independent cinema, critical perspectives, and filmmaker masterclasses.'),

    -- BOLLYWOOD & PAN-INDIA (TIER 2)
    ('Bollywood Hungama', 'bollywood-hungama', 'bollywoodhungama.com', 'https://www.bollywoodhungama.com', 'trade_publication', 'Bollywood', 'Box Office & Trades', 2, 
     'https://www.bollywoodhungama.com/rss/news.xml', 1, 2, 'IN', 'en', true, 'Pan-India box office metrics, certification filings, and production dispatches.'),

    ('The Indian Express Cinema', 'indian-express-cinema', 'indianexpress.com', 'https://indianexpress.com/section/entertainment', 'major_media', 'Bollywood', 'Pan-India National Desk', 2, 
     'https://indianexpress.com/section/entertainment/feed/', 2, 2, 'IN', 'en', true, 'Comprehensive reporting across Hindi, Tamil, Telugu, and Malayalam cinema.'),

    -- CELEBRITIES & CULTURE (TIER 2)
    ('Rolling Stone Culture', 'rolling-stone', 'rollingstone.com', 'https://www.rollingstone.com/culture', 'major_media', 'Celebrities', 'Culture & Music', 2, 
     'https://www.rollingstone.com/culture/feed/', 2, 2, 'US', 'en', true, 'Deep-dive profiles, celebrity profiles, and cultural resonance.'),

    ('Billboard', 'billboard', 'billboard.com', 'https://www.billboard.com', 'trade_publication', 'Celebrities', 'Music & Live Touring', 2, 
     'https://www.billboard.com/feed/', 2, 2, 'US', 'en', true, 'Music industry filings, soundtrack developments, and arena touring analytics.'),

    -- TV & STREAMING / OTT (TIER 2)
    ('TVLine', 'tvline', 'tvline.com', 'https://tvline.com', 'trade_publication', 'TV & OTT', 'Episodic Television', 2, 
     'https://tvline.com/feed/', 1, 2, 'US', 'en', true, 'Series renewals, season cancellations, and network premiere schedules.'),

    ('What''s on Netflix', 'whats-on-netflix', 'whats-on-netflix.com', 'https://www.whats-on-netflix.com', 'aggregator', 'TV & OTT', 'Streaming Specialist', 2, 
     'https://www.whats-on-netflix.com/feed/', 2, 2, 'US', 'en', true, 'Verified streaming releases, licensing departures, and top 10 charts.'),

    -- GAMING OUTLETS (TIER 2 & TIER 1 OFFICIALS)
    ('PlayStation Blog', 'playstation-blog', 'blog.playstation.com', 'https://blog.playstation.com', 'official', 'Gaming', 'PlayStation Ecosystem', 1, 
     'https://blog.playstation.com/feed/', 1, 2, 'US', 'en', true, 'Official hardware announcements, State of Play dispatches, and SIE direct announcements.'),

    ('Xbox Wire', 'xbox-wire', 'news.xbox.com', 'https://news.xbox.com', 'official', 'Gaming', 'Xbox & Game Pass', 1, 
     'https://news.xbox.com/feed/', 1, 2, 'US', 'en', true, 'Official Microsoft Gaming announcements, Game Pass additions, and developer deep dives.'),

    ('IGN Games', 'ign-games', 'ign.com', 'https://www.ign.com/games', 'gaming_publication', 'Gaming', 'AAA & Hardware', 2, 
     'https://feeds.feedburner.com/ign/games-all', 1, 2, 'US', 'en', true, 'Interactive entertainment news, hardware benchmarks, and game reviews.'),

    ('GameSpot', 'gamespot', 'gamespot.com', 'https://www.gamespot.com', 'gaming_publication', 'Gaming', 'Interactive Industry', 2, 
     'https://www.gamespot.com/feeds/news/', 1, 2, 'US', 'en', true, 'Game reviews, developer interviews, and patch dispatching.'),

    ('PC Gamer', 'pc-gamer', 'pcgamer.com', 'https://www.pcgamer.com', 'gaming_publication', 'Gaming', 'PC Ecosystem & Hardware', 2, 
     'https://www.pcgamer.com/rss/', 1, 2, 'US', 'en', true, 'PC gaming, graphics hardware, modding communities, and Steam tracking.'),

    ('Polygon', 'polygon', 'polygon.com', 'https://www.polygon.com', 'gaming_publication', 'Gaming', 'Interactive & Culture', 2, 
     'https://www.polygon.com/rss/index.xml', 2, 2, 'US', 'en', true, 'Gaming culture, narrative design, and cross-medium entertainment.')
ON CONFLICT (slug) DO UPDATE SET
    rss_url = EXCLUDED.rss_url,
    category = EXCLUDED.category,
    subcategory = EXCLUDED.subcategory,
    credibility_tier = EXCLUDED.credibility_tier,
    source_type = EXCLUDED.source_type,
    is_active = EXCLUDED.is_active,
    polling_priority = EXCLUDED.polling_priority,
    notes = EXCLUDED.notes,
    updated_at = NOW();
