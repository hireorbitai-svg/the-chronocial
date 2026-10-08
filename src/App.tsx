/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  LEAD_STORY,
  SECONDARY_LEAD_STORIES,
  TRENDING_STORIES,
  LATEST_STORIES,
  MOST_READ_STORIES,
  HOLLYWOOD_STORIES,
  BOLLYWOOD_STORIES,
  GAMING_STORIES,
  OTT_STORIES,
  CELEBRITIES,
  MOVIES_ITEMS,
  TRAILERS,
  UPCOMING_RELEASES,
} from "./data/mockStories";
import { Story, CelebrityProfile, MovieItem, TrailerItem, ReleaseCalendarItem } from "./types";

// Supabase Data Layer
import {
  getFeaturedStories,
  getTrendingStories,
  getLatestStories,
  getMostReadStories,
  getHollywoodStories,
  getBollywoodStories,
  getOTTStories,
  getGamingStories,
  getAllStories,
  getStoryBySlug,
} from "./lib/stories";
import {
  getCelebrityProfiles,
  getMovieItems,
  getLatestTrailers,
  getUpcomingReleases,
} from "./lib/entities";

// Page Structure Components in exact rhythm
import { Header } from "./components/Header";
import { LiveStatusBar } from "./components/LiveStatusBar";
import { HeroSection } from "./components/HeroSection";
import { TrendingNow } from "./components/TrendingNow";
import { LatestAndMostRead } from "./components/LatestAndMostRead";
import { HollywoodSection } from "./components/HollywoodSection";
import { BollywoodSection } from "./components/BollywoodSection";
import { CelebritySection } from "./components/CelebritySection";
import { MoviesSection } from "./components/MoviesSection";
import { OTTSection } from "./components/OTTSection";
import { GamingSection } from "./components/GamingSection";
import { TrailerSection } from "./components/TrailerSection";
import { UpcomingSection } from "./components/UpcomingSection";
import { TrustSection } from "./components/TrustSection";
import { Footer } from "./components/Footer";

// In-Page Dedicated Article View (NO Popups)
import { ArticlePageView } from "./components/ArticlePageView";

// Utilities
import { SearchOverlay } from "./components/SearchOverlay";
import { AccountModal } from "./components/AccountModal";

export default function App() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [activeVertical, setActiveVertical] = useState("Home");

  // Live Database States initialized with mock fallbacks
  const [heroData, setHeroData] = useState({
    leadStory: LEAD_STORY,
    secondaryStories: SECONDARY_LEAD_STORIES,
  });
  const [trendingData, setTrendingData] = useState<Story[]>(TRENDING_STORIES);
  const [latestData, setLatestData] = useState<Story[]>(LATEST_STORIES);
  const [mostReadData, setMostReadData] = useState<Story[]>(MOST_READ_STORIES);
  const [hollywoodData, setHollywoodData] = useState<{
    featured: Story;
    supporting: Story[];
  }>(HOLLYWOOD_STORIES);
  const [bollywoodData, setBollywoodData] = useState<{
    featured: Story;
    supporting: Story[];
  }>(BOLLYWOOD_STORIES);
  const [ottData, setOttData] = useState<Story[]>(OTT_STORIES);
  const [gamingData, setGamingData] = useState<
    (Story & { platforms?: string[]; genre?: string })[]
  >(GAMING_STORIES);
  const [celebritiesData, setCelebritiesData] = useState<CelebrityProfile[]>(CELEBRITIES);
  const [moviesData, setMoviesData] = useState<MovieItem[]>(MOVIES_ITEMS);
  const [trailersData, setTrailersData] = useState<TrailerItem[]>(TRAILERS);
  const [releasesData, setReleasesData] = useState<ReleaseCalendarItem[]>(UPCOMING_RELEASES);
  const [allStoriesList, setAllStoriesList] = useState<Story[]>([
    LEAD_STORY,
    ...SECONDARY_LEAD_STORIES,
    ...TRENDING_STORIES,
    ...LATEST_STORIES,
    ...MOST_READ_STORIES,
    HOLLYWOOD_STORIES.featured,
    ...HOLLYWOOD_STORIES.supporting,
    BOLLYWOOD_STORIES.featured,
    ...BOLLYWOOD_STORIES.supporting,
    ...GAMING_STORIES,
    ...OTT_STORIES,
  ]);

  // Load live data from Supabase on mount
  useEffect(() => {
    let isMounted = true;

    async function loadLiveData() {
      try {
        const [
          featured,
          trending,
          latest,
          mostRead,
          hollywood,
          bollywood,
          ott,
          gaming,
          celebs,
          films,
          trailrs,
          releass,
          allList,
        ] = await Promise.allSettled([
          getFeaturedStories(),
          getTrendingStories(),
          getLatestStories(),
          getMostReadStories(),
          getHollywoodStories(),
          getBollywoodStories(),
          getOTTStories(),
          getGamingStories(),
          getCelebrityProfiles(),
          getMovieItems(),
          getLatestTrailers(),
          getUpcomingReleases(),
          getAllStories(),
        ]);

        if (!isMounted) return;

        if (featured.status === "fulfilled") setHeroData(featured.value);
        if (trending.status === "fulfilled") setTrendingData(trending.value);
        if (latest.status === "fulfilled") setLatestData(latest.value);
        if (mostRead.status === "fulfilled") setMostReadData(mostRead.value);
        if (hollywood.status === "fulfilled") setHollywoodData(hollywood.value);
        if (bollywood.status === "fulfilled") setBollywoodData(bollywood.value);
        if (ott.status === "fulfilled") setOttData(ott.value);
        if (gaming.status === "fulfilled") setGamingData(gaming.value);
        if (celebs.status === "fulfilled") setCelebritiesData(celebs.value);
        if (films.status === "fulfilled") setMoviesData(films.value);
        if (trailrs.status === "fulfilled") setTrailersData(trailrs.value);
        if (releass.status === "fulfilled") setReleasesData(releass.value);
        if (allList.status === "fulfilled") setAllStoriesList(allList.value);

        // Check hash routing for deep linked article: #story/slug or #story/id
        const hash = window.location.hash;
        if (hash.startsWith("#story/")) {
          const target = hash.replace("#story/", "");
          const match = allList.status === "fulfilled"
            ? allList.value.find((s) => s.slug === target || s.id === target)
            : undefined;
          if (match) {
            setSelectedStory(match);
          } else {
            const fetched = await getStoryBySlug(target);
            if (fetched && isMounted) {
              setSelectedStory(fetched);
            } else if (isMounted) {
              // Cleanly reset invalid hash to front page
              window.history.replaceState(null, "", window.location.pathname);
            }
          }
        }
      } catch (err) {
        console.warn("[Chronicle App] Supabase live hydration notice (fallbacks active):", err);
      }
    }

    loadLiveData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync with browser history for clean Back/Forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.storyId) {
        const found = allStoriesList.find((s) => s.id === event.state.storyId);
        if (found) {
          setSelectedStory(found);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
      // Return to homepage
      setSelectedStory(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Global keyboard shortcut for Cmd+K / Ctrl+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(
      { storyId: story.id },
      "",
      `#story/${story.slug || story.id}`
    );
  };

  const handleBackToHome = () => {
    setSelectedStory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", window.location.pathname);
  };

  const handleSelectCelebrity = (celeb: CelebrityProfile) => {
    const dossierStory: Story = {
      id: celeb.id,
      title: `${celeb.name}: ${celeb.latestHeadline}`,
      slug: `celebrity-dossier-${celeb.name.toLowerCase().replace(/\s+/g, "-")}`,
      summary: `Comprehensive talent dossier and career breakdown covering upcoming theatrical and episodic commitments for ${celeb.name}.`,
      editorialSubdeck: `Known for ${celeb.knownFor}. Recent credit: ${celeb.latestCredit}.`,
      image: celeb.image,
      category: "Celebrities",
      publishedAt: new Date().toISOString(),
      status: "confirmed",
      author: "Talent Desk",
      authorRole: "Bureau Profile",
      readTime: celeb.readTime,
      sourcesCount: 3,
      verificationDetails: "Verified with talent agency filings, union call sheets, and guild registers.",
      contentParagraphs: [
        `${celeb.name} continues to expand their international slate with high-profile projects spanning auteur cinema and major theatrical tentpoles.`,
        `Industry sources confirm that recent negotiations reflect growing demand for talent capable of commanding both traditional box office and worldwide streaming engagement.`,
        `Upcoming production dates and shooting schedules have been verified through local film commission filings and guild registers.`
      ]
    };
    handleSelectStory(dossierStory);
  };

  const handleSelectMovie = (movie: MovieItem) => {
    const filmGuideStory: Story = {
      id: movie.id,
      title: `${movie.title} — Directed by ${movie.director}`,
      slug: `movie-ledger-${movie.title.toLowerCase().replace(/\s+/g, "-")}`,
      summary: movie.synopsis,
      editorialSubdeck: movie.criticVerdict || `Theatrical Release: ${movie.releaseDate} (${movie.runtime || "Feature Film"}).`,
      image: movie.image,
      category: "Movies",
      publishedAt: new Date().toISOString(),
      status: "confirmed",
      author: "Film Desk",
      authorRole: "Chief Film Critic",
      readTime: 5,
      sourcesCount: 2,
      rating: movie.rating,
      verificationDetails: "Confirmed via studio distribution schedule and theatrical booking registers.",
      contentParagraphs: [
        movie.synopsis,
        movie.criticVerdict ? `Critical consensus: "${movie.criticVerdict}"` : "Early industry tracking indicates high anticipation across major theatrical exhibition circuits.",
        `Distribution is locked for ${movie.releaseDate} across worldwide standard and premium large formats.`
      ]
    };
    handleSelectStory(filmGuideStory);
  };

  const handleNavigateVertical = (vertical: string) => {
    setActiveVertical(vertical);
    if (selectedStory) {
      setSelectedStory(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1C1917] selection:bg-[#9B1B30]/15 selection:text-[#9B1B30]">
      {/* 1. Sticky Header */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        activeVertical={activeVertical}
        onNavigateVertical={handleNavigateVertical}
      />

      <main className="flex-1">
        {selectedStory ? (
          /* ======================================================== */
          /* DEDICATED IN-PAGE ARTICLE VIEW (EVERY POST OPENS IN PAGE) */
          /* ======================================================== */
          <ArticlePageView
            story={selectedStory}
            allStories={allStoriesList}
            onBackToHome={handleBackToHome}
            onSelectStory={handleSelectStory}
          />
        ) : (
          /* ======================================================== */
          /* HOMEPAGE VIEW (EXACT 15 RHYTHMIC SECTIONS IN ORDER)      */
          /* ======================================================== */
          <>
            {/* 2. Live Status Bar */}
            <LiveStatusBar />

            {/* 3. Hero Section (One dominant lead + 2 secondary) */}
            <HeroSection
              leadStory={heroData.leadStory}
              secondaryStories={heroData.secondaryStories}
              onSelectStory={handleSelectStory}
            />

            {/* 4. Trending Now (5-8 ranked items) */}
            <TrendingNow
              stories={trendingData}
              onSelectStory={handleSelectStory}
            />

            {/* 5. Latest (main column) + Most Read (sidebar ranked 01-05) */}
            <LatestAndMostRead
              latestStories={latestData}
              mostReadStories={mostReadData}
              onSelectStory={handleSelectStory}
            />

            {/* 6. Hollywood Section (1 large + 3 supporting) */}
            <HollywoodSection
              stories={hollywoodData}
              onSelectStory={handleSelectStory}
            />

            {/* 7. Bollywood Section (distinct visual rhythm) */}
            <BollywoodSection
              stories={bollywoodData}
              onSelectStory={handleSelectStory}
            />

            {/* 8. Celebrities Section (image-driven journalistic cards) */}
            <CelebritySection
              celebrities={celebritiesData}
              onSelectCelebrity={handleSelectCelebrity}
            />

            {/* 9. Movies Section (cinematic sub-nav: Latest/Upcoming/Reviews/Trailers) */}
            <MoviesSection
              movies={moviesData}
              onSelectMovie={handleSelectMovie}
              onOpenTrailersSection={() => {
                const el = document.getElementById("trailers");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            />

            {/* 10. TV & OTT Section (clean text badges) */}
            <OTTSection
              stories={ottData}
              onSelectStory={handleSelectStory}
            />

            {/* 11. Gaming Section (first-class vertical with platform filter chips) */}
            <GamingSection
              stories={gamingData}
              onSelectStory={handleSelectStory}
            />

            {/* 12. Latest Trailers (in-page theater player - NO popups) */}
            <TrailerSection trailers={trailersData} />

            {/* 13. Coming Up (compact release calendar rows) */}
            <UpcomingSection releases={releasesData} />

            {/* 14. Why Readers Trust Us (sources, cross-checked claims, timestamps, rumors) */}
            <TrustSection />
          </>
        )}
      </main>

      {/* 15. Footer (4 columns + copyright + social) */}
      <Footer onOpenAccount={() => setAccountOpen(true)} />

      {/* Search Overlay (searches and routes directly to story in page) */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectStory={async (storyId) => {
          const match = allStoriesList.find((s) => s.id === storyId || s.slug === storyId);
          if (match) {
            handleSelectStory(match);
          } else {
            const fetched = await getStoryBySlug(storyId);
            if (fetched) {
              handleSelectStory(fetched);
            } else {
              handleSelectStory(allStoriesList[0] || LEAD_STORY);
            }
          }
        }}
      />

      {/* Account & Newsletter Preferences */}
      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
      />
    </div>
  );
}
