import React, { useState } from "react";
import { Story } from "../../types";
import { StatusBadge } from "./StatusBadge";
import { TrustBadge } from "./TrustBadge";

interface StoryCardProps {
  story: Story;
  layout?: "horizontal" | "vertical" | "compact" | "lead" | "sidebar";
  onSelectStory?: (story: Story) => void;
  className?: string;
  imageAspectRatio?: "16:9" | "4:3" | "3:2";
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  layout = "vertical",
  onSelectStory,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (onSelectStory) {
      onSelectStory(story);
    }
  };

  const formattedTime = "Updated today";

  const renderFallbackImage = () => (
    <div className="w-full h-full bg-[#EAE6DF] flex flex-col items-center justify-center p-2 sm:p-4 text-stone-500">
      <svg
        className="w-5 h-5 sm:w-7 sm:h-7 text-stone-400 mb-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
        />
      </svg>
      <span className="text-[9px] sm:text-[11px] font-medium uppercase tracking-wider text-stone-500">
        {story.category}
      </span>
    </div>
  );

  if (layout === "compact") {
    return (
      <article
        onClick={handleClick}
        className={`group cursor-pointer py-2.5 sm:py-3 border-b border-stone-200/80 last:border-b-0 hover:bg-stone-50/60 active:bg-stone-100/50 transition-colors ${className}`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#9B1B30]">
            {story.category}
          </span>
          <StatusBadge status={story.status} />
        </div>
        <h3 className="text-xs sm:text-sm font-medium text-stone-900 group-hover:text-[#9B1B30] transition-colors leading-snug line-clamp-2">
          {story.title}
        </h3>
        <TrustBadge
          updatedText={formattedTime}
          sourcesCount={story.sourcesCount}
          readTime={story.readTime}
          className="mt-1"
        />
      </article>
    );
  }

  if (layout === "sidebar") {
    return (
      <article
        onClick={handleClick}
        className={`group cursor-pointer py-3 sm:py-4 border-b border-stone-200 last:border-b-0 flex gap-3 sm:gap-4 items-start active:bg-stone-50 transition-colors ${className}`}
      >
        {story.mostReadRank && (
          <span className="text-xl sm:text-2xl font-serif font-light text-stone-300 group-hover:text-[#9B1B30] transition-colors tabular-nums shrink-0 w-6 sm:w-8">
            0{story.mostReadRank}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#9B1B30] mb-0.5 sm:mb-1">
            {story.category}
          </div>
          <h3 className="text-xs sm:text-sm font-medium text-stone-900 group-hover:text-[#9B1B30] transition-colors leading-snug line-clamp-2">
            {story.title}
          </h3>
          <TrustBadge
            author={story.author}
            readTime={story.readTime}
            className="mt-1 sm:mt-1.5"
          />
        </div>
      </article>
    );
  }

  if (layout === "horizontal") {
    return (
      <article
        onClick={handleClick}
        className={`group cursor-pointer flex flex-row items-center sm:items-stretch sm:grid sm:grid-cols-12 gap-3 sm:gap-6 py-3.5 sm:py-5 border-b border-stone-200 last:border-b-0 active:bg-stone-50/50 transition-colors ${className}`}
      >
        <div className="flex-1 sm:col-span-8 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 flex-wrap">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#9B1B30]">
                {story.category}
              </span>
              <StatusBadge status={story.status} />
            </div>
            <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-medium text-stone-900 group-hover:text-[#9B1B30] transition-colors font-serif leading-snug line-clamp-3 sm:line-clamp-none">
              {story.title}
            </h3>
            {story.summary && (
              <p className="hidden sm:block text-xs sm:text-sm text-stone-600 font-sans mt-2 line-clamp-2 leading-relaxed">
                {story.summary}
              </p>
            )}
          </div>
          <TrustBadge
            author={story.author}
            updatedText={formattedTime}
            sourcesCount={story.sourcesCount}
            readTime={story.readTime}
            className="mt-2 sm:mt-3"
          />
        </div>

        {/* Thumbnail: Compact on mobile, wider on tablet/desktop */}
        <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-auto sm:h-auto sm:col-span-4 shrink-0 sm:order-last">
          <div className="relative w-full h-full aspect-square sm:aspect-[16/10] overflow-hidden bg-stone-100 rounded-xs">
            {imageError ? (
              renderFallbackImage()
            ) : (
              <img
                src={story.image}
                alt={story.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
          </div>
        </div>
      </article>
    );
  }

  // Default vertical layout
  return (
    <article
      onClick={handleClick}
      className={`group cursor-pointer flex flex-col justify-between active:bg-stone-50/50 rounded-xs transition-colors ${className}`}
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 rounded-xs mb-2.5 sm:mb-3">
          {imageError ? (
            renderFallbackImage()
          ) : (
            <img
              src={story.image}
              alt={story.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 flex-wrap">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#9B1B30]">
            {story.category}
          </span>
          <StatusBadge status={story.status} />
        </div>

        <h3 className="text-base sm:text-lg font-medium text-stone-900 group-hover:text-[#9B1B30] transition-colors font-serif leading-snug">
          {story.title}
        </h3>

        {story.summary && (
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed">
            {story.summary}
          </p>
        )}
      </div>

      <TrustBadge
        author={story.author}
        updatedText={formattedTime}
        sourcesCount={story.sourcesCount}
        readTime={story.readTime}
        className="mt-2.5 sm:mt-3 pt-2 border-t border-stone-200/60"
      />
    </article>
  );
};
