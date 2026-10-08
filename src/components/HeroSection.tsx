import React, { useState } from "react";
import { Story } from "../types";
import { StatusBadge } from "./primitives/StatusBadge";
import { TrustBadge } from "./primitives/TrustBadge";

interface HeroSectionProps {
  leadStory: Story;
  secondaryStories: Story[];
  onSelectStory: (story: Story) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  leadStory,
  secondaryStories,
  onSelectStory,
}) => {
  const [leadImgError, setLeadImgError] = useState(false);

  return (
    <section id="hero" className="pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-10 border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* Dominant Lead Story: 7 or 8 cols */}
          <article
            onClick={() => onSelectStory(leadStory)}
            className="lg:col-span-8 group cursor-pointer flex flex-col justify-between active:bg-stone-50/50 p-1 -m-1 rounded-xs transition-colors"
          >
            <div>
              {/* Lead Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-stone-900 rounded-xs overflow-hidden mb-3.5 sm:mb-5">
                {leadImgError ? (
                  <div className="w-full h-full bg-[#1C1917] flex items-center justify-center text-stone-300 font-serif text-lg sm:text-xl">
                    The Chronicle Exclusive
                  </div>
                ) : (
                  <img
                    src={leadStory.image}
                    alt={leadStory.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setLeadImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                )}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-stone-900/90 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider font-sans">
                    Lead Story
                  </span>
                </div>
              </div>

              {/* Category + Status */}
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#9B1B30] font-sans">
                  {leadStory.category}
                </span>
                <span className="text-stone-300 font-sans">/</span>
                <StatusBadge status={leadStory.status} />
              </div>

              {/* Single H1 for the page */}
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-medium tracking-tight text-[#1C1917] font-serif leading-[1.2] sm:leading-[1.18] group-hover:text-[#9B1B30] transition-colors [text-wrap:balance]">
                {leadStory.title}
              </h1>

              {/* 2-3 line editorial dek */}
              {leadStory.editorialSubdeck && (
                <p className="text-sm sm:text-base md:text-lg text-stone-600 font-serif mt-2.5 sm:mt-3 leading-relaxed [text-wrap:balance]">
                  {leadStory.editorialSubdeck}
                </p>
              )}
            </div>

            {/* Author, Timestamp & Sources cited */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-stone-200/90 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
              <TrustBadge
                author={leadStory.author}
                updatedText="Updated 38 min ago"
                sourcesCount={leadStory.sourcesCount}
                readTime={leadStory.readTime}
              />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-700 group-hover:text-[#9B1B30] transition-colors font-sans">
                Read Investigation →
              </span>
            </div>
          </article>

          {/* 2 Secondary Stories beside it: 4 or 5 cols */}
          <div className="lg:col-span-4 flex flex-col justify-between divide-y divide-stone-200 lg:border-l lg:border-stone-200 lg:pl-8 pt-4 lg:pt-0">
            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-stone-400 pb-2 mb-1 lg:mb-2 font-sans">
              Companion Lead Stories
            </div>

            {secondaryStories.map((story, index) => (
              <SecondaryStoryItem
                key={story.id}
                story={story}
                index={index}
                onSelectStory={onSelectStory}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface SecondaryStoryItemProps {
  story: Story;
  index: number;
  onSelectStory: (story: Story) => void;
}

const SecondaryStoryItem: React.FC<SecondaryStoryItemProps> = ({
  story,
  onSelectStory,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onSelectStory(story)}
      className="group cursor-pointer py-4 sm:py-5 first:pt-1 last:pb-0 flex flex-col justify-between active:bg-stone-50/50 rounded-xs transition-colors"
    >
      <div>
        <div className="relative aspect-[16/10] w-full bg-stone-100 rounded-xs overflow-hidden mb-2.5 sm:mb-3">
          {imgError ? (
            <div className="w-full h-full bg-[#EAE6DF] flex items-center justify-center text-xs uppercase tracking-wider text-stone-500 font-medium">
              {story.category}
            </div>
          ) : (
            <img
              src={story.image}
              alt={story.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#9B1B30] font-sans">
            {story.category}
          </span>
          <StatusBadge status={story.status} />
        </div>

        <h3 className="text-base sm:text-lg md:text-xl font-medium text-stone-900 font-serif leading-snug group-hover:text-[#9B1B30] transition-colors">
          {story.title}
        </h3>

        {story.summary && (
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1.5 sm:mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed">
            {story.summary}
          </p>
        )}
      </div>

      <TrustBadge
        author={story.author}
        updatedText="Updated 1h ago"
        sourcesCount={story.sourcesCount}
        readTime={story.readTime}
        className="mt-2.5 sm:mt-3 pt-1.5 sm:pt-2"
      />
    </article>
  );
};
