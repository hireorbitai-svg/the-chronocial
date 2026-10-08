import React from "react";
import { Story } from "../types";
import { SectionHeader } from "./primitives/SectionHeader";
import { StoryCard } from "./primitives/StoryCard";

interface LatestAndMostReadProps {
  latestStories: Story[];
  mostReadStories: Story[];
  onSelectStory: (story: Story) => void;
}

export const LatestAndMostRead: React.FC<LatestAndMostReadProps> = ({
  latestStories,
  mostReadStories,
  onSelectStory,
}) => {
  return (
    <section className="py-8 sm:py-10 border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Column: Latest Stories (8 cols) */}
          <div className="lg:col-span-8">
            <SectionHeader
              kicker="The Wire"
              title="Latest Reporting"
              description="Chronological dispatches, corporate filings, reviews, and verified developments."
              actionText="Browse Wire"
              onActionClick={() => onSelectStory(latestStories[0])}
            />

            <div className="divide-y divide-stone-200">
              {/* Featured horizontal lead within latest */}
              {latestStories.slice(0, 1).map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  layout="horizontal"
                  onSelectStory={onSelectStory}
                  className="pb-4 sm:pb-6"
                />
              ))}

              {/* 2-column editorial grid for next 2 stories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 py-4 sm:py-6 border-b border-stone-200">
                {latestStories.slice(1, 3).map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    layout="vertical"
                    onSelectStory={onSelectStory}
                  />
                ))}
              </div>

              {/* Remaining latest horizontal stories */}
              {latestStories.slice(3, 5).map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  layout="horizontal"
                  onSelectStory={onSelectStory}
                  className="py-3.5 sm:py-5"
                />
              ))}
            </div>
          </div>

          {/* Sidebar: Most Read Stories ranked 01-05 (4 cols) */}
          <div className="lg:col-span-4 lg:border-l lg:border-stone-200 lg:pl-8 pt-6 lg:pt-0">
            <div className="lg:sticky lg:top-20">
              <div className="border-b border-stone-300 pb-2 mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#9B1B30] font-sans block mb-1">
                  Reader Pulse
                </span>
                <h3 className="text-lg sm:text-xl font-medium font-serif text-stone-900">
                  Most Read This Week
                </h3>
              </div>

              <div className="divide-y divide-stone-200">
                {mostReadStories.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    layout="sidebar"
                    onSelectStory={onSelectStory}
                  />
                ))}
              </div>

              {/* Newsletter / Dispatch subscription callout */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-[#F3F0E8] border border-stone-300/80 rounded-xs">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9B1B30] block mb-1">
                  Morning Intelligence Brief
                </span>
                <h4 className="text-sm sm:text-base font-medium font-serif text-stone-900">
                  The Daily Screen & Console
                </h4>
                <p className="text-xs text-stone-600 mt-1 sm:mt-1.5 leading-relaxed font-sans">
                  The day's essential entertainment transactions and cultural analysis delivered at 6:00 AM EST.
                </p>
                <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter email address..."
                    className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-xs focus:outline-none focus:border-[#9B1B30] min-h-[38px]"
                  />
                  <button
                    type="button"
                    onClick={() => alert("Subscription requested. Check inbox for confirmation.")}
                    className="px-3.5 py-2 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#9B1B30] transition-colors shrink-0 cursor-pointer min-h-[38px]"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
