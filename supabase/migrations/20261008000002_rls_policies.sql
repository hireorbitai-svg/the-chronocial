-- Migration: 20261008000002_rls_policies.sql
-- Description: Row Level Security policies for The Chronicle publication (Idempotent)

-- Enable RLS across all tables
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tv_shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.release_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- 1. STORIES (Public reads published stories only)
DROP POLICY IF EXISTS "Public can view published stories" ON public.stories;
CREATE POLICY "Public can view published stories"
    ON public.stories FOR SELECT
    USING (is_published = true);

-- 2. STORY SOURCES (Public reads sources attached to published stories)
DROP POLICY IF EXISTS "Public can view sources for published stories" ON public.story_sources;
CREATE POLICY "Public can view sources for published stories"
    ON public.story_sources FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.stories
        WHERE stories.id = story_sources.story_id
        AND stories.is_published = true
    ));

-- 3. STORY UPDATES (Public reads updates for published stories)
DROP POLICY IF EXISTS "Public can view updates for published stories" ON public.story_updates;
CREATE POLICY "Public can view updates for published stories"
    ON public.story_updates FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.stories
        WHERE stories.id = story_updates.story_id
        AND stories.is_published = true
    ));

-- 4. STORY ENTITIES (Public reads entity relationships for published stories)
DROP POLICY IF EXISTS "Public can view entities for published stories" ON public.story_entities;
CREATE POLICY "Public can view entities for published stories"
    ON public.story_entities FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.stories
        WHERE stories.id = story_entities.story_id
        AND stories.is_published = true
    ));

-- 5. PUBLIC ENTITIES READ POLICIES
DROP POLICY IF EXISTS "Public can view active sources" ON public.sources;
CREATE POLICY "Public can view active sources"
    ON public.sources FOR SELECT
    USING (is_active = true);

DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories"
    ON public.categories FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Public can view people" ON public.people;
CREATE POLICY "Public can view people"
    ON public.people FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Public can view movies" ON public.movies;
CREATE POLICY "Public can view movies"
    ON public.movies FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Public can view tv shows" ON public.tv_shows;
CREATE POLICY "Public can view tv shows"
    ON public.tv_shows FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Public can view games" ON public.games;
CREATE POLICY "Public can view games"
    ON public.games FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Public can view companies" ON public.companies;
CREATE POLICY "Public can view companies"
    ON public.companies FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Public can view trailers" ON public.trailers;
CREATE POLICY "Public can view trailers"
    ON public.trailers FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Public can view reviews" ON public.reviews;
CREATE POLICY "Public can view reviews"
    ON public.reviews FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Public can view release dates" ON public.release_dates;
CREATE POLICY "Public can view release dates"
    ON public.release_dates FOR SELECT
    USING (true);

-- 6. PROFILES (Users control their own profile)
DROP POLICY IF EXISTS "Public can view reader profile info" ON public.profiles;
CREATE POLICY "Public can view reader profile info"
    ON public.profiles FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- 7. BOOKMARKS (Users control their own bookmarks)
DROP POLICY IF EXISTS "Users can view own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can view own bookmarks"
    ON public.bookmarks FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can add own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can add own bookmarks"
    ON public.bookmarks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can delete own bookmarks"
    ON public.bookmarks FOR DELETE
    USING (auth.uid() = user_id);
