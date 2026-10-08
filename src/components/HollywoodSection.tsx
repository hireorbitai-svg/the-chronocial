import React, { useState } from "react";
import { HOLLYWOOD_STORIES } from "../data/mockStories";
import { Story } from "../types";
import { SectionHeader } from "./primitives/SectionHeader";
import { StatusBadge } from "./primitives/StatusBadge";
import { TrustBadge } from "./primitives/TrustBadge";

interface HollywoodSectionProps {
  onSelectStory: (story: Story) => void;
  stories?: {
    featured: Story;
    supporting: Story[];
  };
}

export const HollywoodSection: React.FC<HollywoodSectionProps> = ({
  onSelectStory,
  stories,
}) => {
  const [featImgError, setFeatImgError] = useState(false);
  const featured = stories?.featured || HOLLYWOOD_STORIES.featured;
  const supporting = stories?.supporting || HOLLYWOOD_STORIES.supporting;

  return (
    <section id="hollywood" className="py-8 sm:py-12 border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Studio System & Guilds"
          title="Hollywood"
          description="Studio mergers, greenlights, guild agreements, and major theatrical releases from Burbank to London."
          actionText="View Hollywood Desk"
          onActionClick={() => onSelectStory(featured)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          {/* 1 Large Featured Story (7 cols) */}
          <article
            onClick={() => onSelectStory(featured)}
            className="lg:col-span-7 group cursor-pointer flex flex-col justify-between active:bg-stone-50/50 rounded-xs transition-colors"
          >
            <div>
              <div className="relative aspect-[16/10] bg-stone-900 rounded-xs overflow-hidden mb-3.5 sm:mb-4">
                {featImgError ? (
                  <div className="w-full h-full bg-[#1C1917] flex items-center justify-center text-stone-300 font-serif">
                    Hollywood Studio Report
                  </div>
                ) : (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setFeatImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                )}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-stone-900/80 backdrop-blur-xs text-[10px] uppercase font-semibold text-stone-200">
                  Feature Analysis
                </div>
              </div>

              <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#9B1B30]">
                  Academy & Guilds
                </span>
                <StatusBadge status={featured.status} />
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-stone-900 font-serif leading-snug group-hover:text-[#9B1B30] transition-colors">
                {featured.title}
              </h3>

              <p className="text-xs sm:text-sm md:text-base text-stone-600 font-sans mt-2 sm:mt-3 leading-relaxed">
                {featured.summary}
              </p>
            </div>

            <TrustBadge
              author={featured.author}
              updatedText="Updated 3h ago"
              sourcesCount={featured.sourcesCount}
              readTime={featured.readTime}
              className="mt-4 sm:mt-6 pt-3 border-t border-stone-200"
            />
          </article>

          {/* 3 Supporting Stories (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-stone-200 pt-4 lg:pt-0">
            {supporting.map((story) => (
              <SupportingStoryItem
                key={story.id}
                story={story}
                onSelectStory={onSelectStory}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface SupportingStoryItemProps {
  story: Story;
  onSelectStory: (story: Story) => void;
}

const SupportingStoryItem: React.FC<SupportingStoryItemProps> = ({
  story,
  onSelectStory,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onSelectStory(story)}
      className="group cursor-pointer py-3.5 sm:py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-3 sm:gap-4 active:bg-stone-50/50 rounded-xs transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Theatrical Pipeline
          </span>
          <StatusBadge status={story.status} />
        </div>
        <h4 className="text-sm sm:text-base font-medium text-stone-900 font-serif group-hover:text-[#9B1B30] transition-colors leading-snug line-clamp-2">
          {story.title}
        </h4>
        <TrustBadge
          author={story.author}
          readTime={story.readTime}
          className="mt-1.5 text-[10px] sm:text-[11px]"
        />
      </div>

      <div className="w-20 h-16 sm:w-28 sm:h-20 shrink-0">
        <div className="relative w-full h-full bg-stone-100 rounded-xs overflow-hidden">
          {imgError ? (
            <div className="w-full h-full bg-[#EAE6DF] flex items-center justify-center text-[9px] uppercase text-stone-400">
              Still
            </div>
          ) : (
            <img
              src={story.image}
              alt={story.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
      </div>
    </article>
  );
};
