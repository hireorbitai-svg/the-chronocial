import React, { useState } from "react";
import { BOLLYWOOD_STORIES } from "../data/mockStories";
import { Story } from "../types";
import { SectionHeader } from "./primitives/SectionHeader";
import { StatusBadge } from "./primitives/StatusBadge";
import { TrustBadge } from "./primitives/TrustBadge";

interface BollywoodSectionProps {
  onSelectStory: (story: Story) => void;
}

export const BollywoodSection: React.FC<BollywoodSectionProps> = ({
  onSelectStory,
}) => {
  const [leadImgError, setLeadImgError] = useState(false);
  const { featured, supporting } = BOLLYWOOD_STORIES;

  return (
    <section id="bollywood" className="py-8 sm:py-12 border-b border-stone-300 bg-[#FAF7F0]/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Pan-India & Global Circuits"
          title="Bollywood & South Asian Cinema"
          description="Multilingual box office milestones, international theatrical distribution, and high-budget epics across Hindi, Telugu, Tamil, and Malayalam cinema."
          actionText="View Pan-India Desk"
          onActionClick={() => onSelectStory(featured)}
        />

        {/* Distinct visual rhythm: Wide Hero Split Banner on top */}
        <article
          onClick={() => onSelectStory(featured)}
          className="group cursor-pointer bg-white border border-stone-200/90 rounded-xs overflow-hidden shadow-2xs hover:border-stone-400 active:bg-stone-50/50 transition-all duration-200 mb-6 sm:mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto bg-stone-900 overflow-hidden">
              {leadImgError ? (
                <div className="w-full h-full min-h-[200px] sm:min-h-[280px] bg-[#1C1917] flex items-center justify-center text-stone-300 font-serif text-base sm:text-lg">
                  Indian Cinema Global Analysis
                </div>
              ) : (
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setLeadImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              )}
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-stone-900/85 backdrop-blur-xs text-[9px] sm:text-[10px] uppercase font-semibold text-stone-100">
                Global Trade Report
              </div>
            </div>

            <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#9B1B30]">
                    Box Office Record
                  </span>
                  <StatusBadge status={featured.status} />
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-stone-900 font-serif leading-snug group-hover:text-[#9B1B30] transition-colors">
                  {featured.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2 sm:mt-3 leading-relaxed">
                  {featured.summary}
                </p>

                <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-stone-50 border-l-2 border-[#9B1B30] text-[11px] sm:text-xs text-stone-700 italic font-serif">
                  "Overseas theatrical rights for Indian spectacles are no longer tertiary income—they dictate primary greenlight budgets."
                </div>
              </div>

              <TrustBadge
                author={featured.author}
                updatedText="Updated 4h ago"
                sourcesCount={featured.sourcesCount}
                readTime={featured.readTime}
                className="mt-4 sm:mt-6 pt-3 border-t border-stone-100"
              />
            </div>
          </div>
        </article>

        {/* 3 Supporting Stories in clean 3-column cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {supporting.map((story) => (
            <BollywoodSupportingCard
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

interface BollywoodSupportingCardProps {
  story: Story;
  onSelectStory: (story: Story) => void;
}

const BollywoodSupportingCard: React.FC<BollywoodSupportingCardProps> = ({
  story,
  onSelectStory,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onSelectStory(story)}
      className="group cursor-pointer bg-white border border-stone-200/80 rounded-xs p-3.5 sm:p-4 flex flex-col justify-between hover:border-stone-400 active:bg-stone-50/50 transition-all duration-200"
    >
      <div>
        <div className="relative aspect-[16/10] bg-stone-100 rounded-xs overflow-hidden mb-2.5 sm:mb-3">
          {imgError ? (
            <div className="w-full h-full bg-[#EAE6DF] flex items-center justify-center text-xs text-stone-500 uppercase">
              Production Still
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
        </div>

        <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Production Dispatch
          </span>
          <StatusBadge status={story.status} />
        </div>

        <h4 className="text-sm sm:text-base font-medium text-stone-900 font-serif group-hover:text-[#9B1B30] transition-colors leading-snug line-clamp-2">
          {story.title}
        </h4>
      </div>

      <TrustBadge
        author={story.author}
        readTime={story.readTime}
        className="mt-2.5 sm:mt-3 pt-2 border-t border-stone-100 text-[10px] sm:text-[11px]"
      />
    </article>
  );
};
