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
} from "./data/mockStories";
import { Story, CelebrityProfile, MovieItem } from "./types";

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

  // Collect all story objects for recommendation and search routing
  const allStoriesList: Story[] = [
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
  ];

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
              leadStory={LEAD_STORY}
              secondaryStories={SECONDARY_LEAD_STORIES}
              onSelectStory={handleSelectStory}
            />

            {/* 4. Trending Now (5-8 ranked items) */}
            <TrendingNow
              stories={TRENDING_STORIES}
              onSelectStory={handleSelectStory}
            />

            {/* 5. Latest (main column) + Most Read (sidebar ranked 01-05) */}
            <LatestAndMostRead
              latestStories={LATEST_STORIES}
              mostReadStories={MOST_READ_STORIES}
              onSelectStory={handleSelectStory}
            />

            {/* 6. Hollywood Section (1 large + 3 supporting) */}
            <HollywoodSection onSelectStory={handleSelectStory} />

            {/* 7. Bollywood Section (distinct visual rhythm) */}
            <BollywoodSection onSelectStory={handleSelectStory} />

            {/* 8. Celebrities Section (image-driven journalistic cards) */}
            <CelebritySection onSelectCelebrity={handleSelectCelebrity} />

            {/* 9. Movies Section (cinematic sub-nav: Latest/Upcoming/Reviews/Trailers) */}
            <MoviesSection
              onSelectMovie={handleSelectMovie}
              onOpenTrailersSection={() => {
                const el = document.getElementById("trailers");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            />

            {/* 10. TV & OTT Section (clean text badges) */}
            <OTTSection onSelectStory={handleSelectStory} />

            {/* 11. Gaming Section (first-class vertical with platform filter chips) */}
            <GamingSection onSelectStory={handleSelectStory} />

            {/* 12. Latest Trailers (in-page theater player - NO popups) */}
            <TrailerSection />

            {/* 13. Coming Up (compact release calendar rows) */}
            <UpcomingSection />

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
        onSelectStory={(storyId) => {
          const match = allStoriesList.find((s) => s.id === storyId);
          if (match) {
            handleSelectStory(match);
          } else {
            handleSelectStory(LEAD_STORY);
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
