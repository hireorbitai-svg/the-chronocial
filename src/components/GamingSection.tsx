import React, { useState } from "react";
import { GAMING_STORIES } from "../data/mockStories";
import { Story } from "../types";
import { SectionHeader } from "./primitives/SectionHeader";
import { GameCard } from "./primitives/GameCard";
import { StatusBadge } from "./primitives/StatusBadge";
import { TrustBadge } from "./primitives/TrustBadge";

interface GamingSectionProps {
  onSelectStory: (story: Story) => void;
  stories?: (Story & { platforms?: string[]; genre?: string })[];
}

export const GamingSection: React.FC<GamingSectionProps> = ({ onSelectStory, stories = GAMING_STORIES }) => {
  const [activeChip, setActiveChip] = useState<string>("All");
  const [featImgError, setFeatImgError] = useState(false);

  const chips = [
    "All",
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo",
    "Mobile",
    "Esports",
  ];

  const leadGameStory = stories[0] || GAMING_STORIES[0];
  const supportingGames = stories.slice(1).length > 0 ? stories.slice(1) : GAMING_STORIES.slice(1);

  const filteredSupporting = supportingGames.filter((item) => {
    if (activeChip === "All") return true;
    return item.platforms?.some(
      (p) => p.toLowerCase() === activeChip.toLowerCase()
    );
  });

  return (
    <section id="gaming" className="py-8 sm:py-12 border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Interactive Arts & Hardware"
          title="Gaming"
          description="Studio acquisitions, next-generation silicon, AAA launches, and competitive circuits treated with journalistic gravity."
          actionText="View Gaming Wire"
          onActionClick={() => onSelectStory(leadGameStory)}
        />

        {/* Filter chips: smooth touch horizontal scroll on mobile */}
        <div className="overflow-x-auto no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 mb-6 sm:mb-8">
          <div className="flex items-center gap-1.5 sm:gap-2 w-max py-0.5">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-400 mr-1 font-sans">
              Platforms:
            </span>
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setActiveChip(chip)}
                className={`px-3 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors whitespace-nowrap cursor-pointer min-h-[36px] ${
                  activeChip === chip
                    ? "bg-[#9B1B30] text-white"
                    : "bg-stone-200/70 text-stone-700 hover:text-stone-900 hover:bg-stone-300/70"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Breaking / Featured Story Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <article
            onClick={() => onSelectStory(leadGameStory)}
            className="lg:col-span-8 group cursor-pointer bg-white border border-stone-200/90 rounded-xs overflow-hidden flex flex-col justify-between hover:border-stone-400 active:bg-stone-50 transition-all duration-200 shadow-2xs"
          >
            <div>
              <div className="relative aspect-[16/9] bg-stone-950 overflow-hidden">
                {featImgError ? (
                  <div className="w-full h-full bg-[#1C1917] flex items-center justify-center text-stone-300 font-serif">
                    Gaming Breaking News
                  </div>
                ) : (
                  <img
                    src={leadGameStory.image}
                    alt={leadGameStory.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setFeatImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-2">
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-stone-950/90 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                    Studio Spotlight
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  {leadGameStory.platforms?.map((plat) => (
                    <span
                      key={plat}
                      className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-stone-600 bg-stone-100 px-1.5 py-0.5"
                    >
                      {plat}
                    </span>
                  ))}
                  <StatusBadge status={leadGameStory.status} />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-stone-900 font-serif group-hover:text-[#9B1B30] transition-colors leading-snug">
                  {leadGameStory.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2 sm:mt-3 leading-relaxed">
                  {leadGameStory.summary}
                </p>
              </div>
            </div>

            <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2 sm:pt-3 border-t border-stone-100">
              <TrustBadge
                author={leadGameStory.author}
                sourcesCount={leadGameStory.sourcesCount}
                readTime={leadGameStory.readTime}
              />
            </div>
          </article>

          {/* Quick industry pulse sidebar */}
          <div className="lg:col-span-4 bg-[#F4F1E9]/50 border border-stone-200 p-4 sm:p-5 rounded-xs flex flex-col justify-between">
            <div>
              <div className="border-b border-stone-300 pb-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9B1B30] block">
                  Studio Economics
                </span>
                <h4 className="text-base sm:text-lg font-medium font-serif text-stone-900">
                  Hardware & Subscription Metrics
                </h4>
              </div>
              <ul className="space-y-3 text-xs font-sans text-stone-700">
                <li className="pb-2.5 border-b border-stone-200/80">
                  <span className="font-semibold block text-stone-900 mb-0.5">
                    Console Generational Shift:
                  </span>
                  Mid-cycle hardware refreshes lean into dynamic AI upscaling to maintain 60 FPS parity on raytraced titles.
                </li>
                <li className="pb-2.5 border-b border-stone-200/80">
                  <span className="font-semibold block text-stone-900 mb-0.5">
                    Day-One Publishing Model:
                  </span>
                  Subscription services shift toward guaranteed minimum royalties for mid-budget action RPG developers.
                </li>
                <li>
                  <span className="font-semibold block text-stone-900 mb-0.5">
                    Esports Rationalization:
                  </span>
                  Championship organizers centralize prize structures around proven legacy shooters and fighting games.
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-300/80 text-[10px] sm:text-[11px] text-stone-500 font-sans">
              Compiled by Devon Reed, Lead Interactive Arts Correspondent
            </div>
          </div>
        </div>

        {/* Filtered cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredSupporting.length > 0 ? (
            filteredSupporting.map((story) => (
              <GameCard
                key={story.id}
                gameStory={story}
                onSelect={onSelectStory}
              />
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-stone-500 text-xs sm:text-sm">
              No recent dispatches matching "{activeChip}". View full gaming archives.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
