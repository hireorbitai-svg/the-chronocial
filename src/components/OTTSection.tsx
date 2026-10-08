import React, { useState } from "react";
import { OTT_STORIES } from "../data/mockStories";
import { Story } from "../types";
import { SectionHeader } from "./primitives/SectionHeader";
import { StatusBadge } from "./primitives/StatusBadge";
import { TrustBadge } from "./primitives/TrustBadge";

interface OTTSectionProps {
  onSelectStory: (story: Story) => void;
}

export const OTTSection: React.FC<OTTSectionProps> = ({ onSelectStory }) => {
  const [filter, setFilter] = useState<"All" | "Renewals" | "Streaming Slates">("All");

  const filteredStories = OTT_STORIES.filter((story) => {
    if (filter === "Renewals") {
      return (
        story.title.toLowerCase().includes("renews") ||
        story.title.toLowerCase().includes("cancels") ||
        story.title.toLowerCase().includes("season")
      );
    }
    return true;
  });

  return (
    <section id="tv-ott" className="py-8 sm:py-12 border-b border-stone-300 bg-[#FAF8F5]/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Broadband & Episodic"
          title="TV & OTT Streaming"
          description="Prestige drama orders, streaming platform renewals, cancellations, and subscriber retention economics."
          actionText="View Streaming Index"
          onActionClick={() => onSelectStory(OTT_STORIES[0])}
        />

        {/* Category filters */}
        <div className="overflow-x-auto no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 mb-6">
          <div className="flex items-center gap-2 w-max">
            {(["All", "Renewals", "Streaming Slates"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer min-h-[38px] whitespace-nowrap ${
                  filter === tab
                    ? "bg-stone-900 text-white"
                    : "bg-stone-200/60 text-stone-700 hover:bg-stone-300/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3 cards grid with clear text platform labels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredStories.map((story) => (
            <OTTCard
              key={story.id}
              story={story}
              onSelectStory={onSelectStory}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface OTTCardProps {
  story: Story;
  onSelectStory: (story: Story) => void;
}

const OTTCard: React.FC<OTTCardProps> = ({ story, onSelectStory }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onSelectStory(story)}
      className="group cursor-pointer bg-white border border-stone-200/90 rounded-xs overflow-hidden flex flex-col justify-between hover:border-stone-400 active:bg-stone-50 transition-all duration-200 shadow-2xs"
    >
      <div>
        <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
          {imgError ? (
            <div className="w-full h-full bg-[#1C1917] flex items-center justify-center text-xs uppercase text-stone-400">
              Streaming Still
            </div>
          ) : (
            <img
              src={story.image}
              alt={story.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Clean text platform label (NOT logo soup) */}
          {story.platform && (
            <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-stone-900/90 backdrop-blur-xs text-[10px] sm:text-[11px] font-semibold text-stone-100 uppercase tracking-wider">
              {story.platform}
            </div>
          )}

          <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5">
            <StatusBadge status={story.status} className="bg-white/90 px-1.5 py-0.5 rounded-xs" />
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#9B1B30] mb-0.5 sm:mb-1">
            Series & Programming
          </div>
          <h3 className="text-base sm:text-lg font-medium text-stone-900 font-serif group-hover:text-[#9B1B30] transition-colors leading-snug">
            {story.title}
          </h3>
          {story.summary && (
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2 leading-relaxed line-clamp-3">
              {story.summary}
            </p>
          )}
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-3.5 sm:pb-4 pt-1.5 sm:pt-2 border-t border-stone-100">
        <TrustBadge
          author={story.author}
          updatedText="Updated today"
          sourcesCount={story.sourcesCount}
          readTime={story.readTime}
        />
      </div>
    </article>
  );
};
