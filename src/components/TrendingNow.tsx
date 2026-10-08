import React from "react";
import { Story } from "../types";
import { StatusBadge } from "./primitives/StatusBadge";

interface TrendingNowProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
}

export const TrendingNow: React.FC<TrendingNowProps> = ({
  stories,
  onSelectStory,
}) => {
  return (
    <section className="py-5 sm:py-7 border-b border-stone-300 bg-[#F4F1E9]/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-stone-300/80">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#9B1B30] font-sans">
              Trending Velocity
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-[11px] sm:text-xs text-stone-500 font-sans truncate">
              Top reader interest
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-stone-500 uppercase shrink-0">
            Ranked 01–06
          </span>
        </div>

        {/* Responsive layout: Touch horizontal snap scroll on mobile, responsive grid on tablet & desktop */}
        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-3 px-3 md:mx-0 md:px-0">
          {stories.slice(0, 6).map((story, idx) => (
            <article
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="group cursor-pointer w-[72vw] xs:w-[65vw] sm:w-[48vw] md:w-auto shrink-0 snap-start bg-white md:bg-transparent border border-stone-200/90 md:border-0 md:border-r last:md:border-r-0 md:border-stone-200 p-3 sm:p-3.5 md:p-0 md:px-2.5 first:md:pl-0 last:md:pr-0 rounded-xs md:rounded-none flex flex-col justify-between shadow-2xs md:shadow-none active:bg-stone-50 transition-colors"
            >
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-lg sm:text-2xl font-serif font-light text-[#9B1B30] tabular-nums">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 font-sans">
                    {story.category}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-medium text-stone-900 group-hover:text-[#9B1B30] transition-colors leading-snug line-clamp-3">
                  {story.title}
                </h3>
              </div>

              <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 font-sans">
                <span>{story.readTime || 3}m read</span>
                <StatusBadge status={story.status} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
