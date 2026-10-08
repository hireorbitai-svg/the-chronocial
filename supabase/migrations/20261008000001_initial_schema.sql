-- Migration: 20261008000001_initial_schema.sql
-- Description: Core relational schema for The Chronicle publication

-- 1. SOURCES
CREATE TABLE IF NOT EXISTS public.sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    domain TEXT,
    base_url TEXT,
    source_type TEXT CHECK (source_type IN ('official', 'publication', 'aggregator', 'blog', 'social', 'press_release')),
    credibility_tier INTEGER CHECK (credibility_tier IN (1, 2, 3)) DEFAULT 2,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. STORIES
CREATE TABLE IF NOT EXISTS public.stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    dek TEXT,
    summary TEXT,
    body TEXT,
    excerpt TEXT,
    category TEXT NOT NULL,
    subcategory TEXT,
    status TEXT CHECK (status IN ('draft', 'published', 'updated', 'developing', 'confirmed', 'reported', 'rumor', 'archived')) DEFAULT 'draft',
    hero_image_url TEXT,
    thumbnail_url TEXT,
    author_name TEXT DEFAULT 'The Chronicle Intelligence Desk',
    published_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    discovered_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    read_time_minutes INTEGER DEFAULT 3,
    source_count INTEGER DEFAULT 0,
    verification_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. STORY_SOURCES
CREATE TABLE IF NOT EXISTS public.story_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
    source_id UUID REFERENCES public.sources(id) ON DELETE SET NULL,
    source_url TEXT NOT NULL,
    source_title TEXT,
    source_published_at TIMESTAMPTZ,
    source_type TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    first_seen_at TIMESTAMPTZ DEFAULT NOW(),
    last_checked_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_story_source UNIQUE (story_id, source_url)
);

-- 4. STORY_UPDATES
CREATE TABLE IF NOT EXISTS public.story_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
    update_type TEXT,
    update_summary TEXT,
    previous_status TEXT,
    new_status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PEOPLE
CREATE TABLE IF NOT EXISTS public.people (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    role TEXT,
    bio TEXT,
    image_url TEXT,
    external_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MOVIES
CREATE TABLE IF NOT EXISTS public.movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    overview TEXT,
    poster_url TEXT,
    backdrop_url TEXT,
    release_date DATE,
    runtime_minutes INTEGER,
    director TEXT,
    external_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TV_SHOWS
CREATE TABLE IF NOT EXISTS public.tv_shows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    overview TEXT,
    poster_url TEXT,
    backdrop_url TEXT,
    release_date DATE,
    network TEXT,
    external_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. GAMES
CREATE TABLE IF NOT EXISTS public.games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    overview TEXT,
    cover_url TEXT,
    backdrop_url TEXT,
    release_date DATE,
    developer TEXT,
    publisher TEXT,
    external_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. COMPANIES
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    company_type TEXT,
    logo_url TEXT,
    website_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. STORY_ENTITIES (Connects stories to People, Movies, TV Shows, Games, Companies)
CREATE TABLE IF NOT EXISTS public.story_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('person', 'movie', 'tv_show', 'game', 'company')),
    entity_id UUID NOT NULL,
    relevance_score NUMERIC DEFAULT 1.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_story_entity UNIQUE (story_id, entity_type, entity_id)
);

-- 12. TRAILERS
CREATE TABLE IF NOT EXISTS public.trailers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    platform TEXT DEFAULT 'YouTube',
    movie_id UUID REFERENCES public.movies(id) ON DELETE SET NULL,
    tv_show_id UUID REFERENCES public.tv_shows(id) ON DELETE SET NULL,
    game_id UUID REFERENCES public.games(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    review_body TEXT,
    rating NUMERIC CHECK (rating >= 0 AND rating <= 5),
    reviewer_name TEXT,
    movie_id UUID REFERENCES public.movies(id) ON DELETE SET NULL,
    tv_show_id UUID REFERENCES public.tv_shows(id) ON DELETE SET NULL,
    game_id UUID REFERENCES public.games(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. RELEASE_DATES
CREATE TABLE IF NOT EXISTS public.release_dates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    release_type TEXT,
    movie_id UUID REFERENCES public.movies(id) ON DELETE SET NULL,
    tv_show_id UUID REFERENCES public.tv_shows(id) ON DELETE SET NULL,
    game_id UUID REFERENCES public.games(id) ON DELETE SET NULL,
    platform TEXT,
    release_date DATE,
    region TEXT DEFAULT 'Global',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. BOOKMARKS (Reader saved stories)
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_story_bookmark UNIQUE (user_id, story_id)
);

-- ==================================================
-- INDEXES
-- ==================================================

-- stories
CREATE INDEX IF NOT EXISTS idx_stories_slug ON public.stories (slug);
CREATE INDEX IF NOT EXISTS idx_stories_published_at ON public.stories (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_stories_updated_at ON public.stories (updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_stories_category ON public.stories (category);
CREATE INDEX IF NOT EXISTS idx_stories_status ON public.stories (status);
CREATE INDEX IF NOT EXISTS idx_stories_is_published ON public.stories (is_published);
CREATE INDEX IF NOT EXISTS idx_stories_is_featured ON public.stories (is_featured);
CREATE INDEX IF NOT EXISTS idx_stories_is_trending ON public.stories (is_trending);

-- sources
CREATE INDEX IF NOT EXISTS idx_sources_slug ON public.sources (slug);
CREATE INDEX IF NOT EXISTS idx_sources_credibility ON public.sources (credibility_tier);
CREATE INDEX IF NOT EXISTS idx_sources_is_active ON public.sources (is_active);

-- people
CREATE INDEX IF NOT EXISTS idx_people_slug ON public.people (slug);
CREATE INDEX IF NOT EXISTS idx_people_name ON public.people (name);

-- movies
CREATE INDEX IF NOT EXISTS idx_movies_slug ON public.movies (slug);
CREATE INDEX IF NOT EXISTS idx_movies_release_date ON public.movies (release_date);

-- tv_shows
CREATE INDEX IF NOT EXISTS idx_tv_shows_slug ON public.tv_shows (slug);
CREATE INDEX IF NOT EXISTS idx_tv_shows_release_date ON public.tv_shows (release_date);

-- games
CREATE INDEX IF NOT EXISTS idx_games_slug ON public.games (slug);
CREATE INDEX IF NOT EXISTS idx_games_release_date ON public.games (release_date);

-- story_entities
CREATE INDEX IF NOT EXISTS idx_story_entities_story ON public.story_entities (story_id);
CREATE INDEX IF NOT EXISTS idx_story_entities_entity ON public.story_entities (entity_type, entity_id);

-- bookmarks
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks (user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_story ON public.bookmarks (story_id);
