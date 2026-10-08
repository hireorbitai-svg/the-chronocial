import React, { useState } from "react";
import { Story } from "../../types";
import { StatusBadge } from "./StatusBadge";
import { TrustBadge } from "./TrustBadge";

interface GameCardProps {
  gameStory: Story & { platforms?: string[]; genre?: string };
  onSelect?: (story: Story) => void;
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  gameStory,
  onSelect,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      onClick={() => onSelect && onSelect(gameStory)}
      className={`group cursor-pointer bg-white border border-stone-200/90 rounded-xs overflow-hidden flex flex-col justify-between hover:border-stone-400 active:bg-stone-50 transition-all duration-200 shadow-2xs ${className}`}
    >
      <div>
        <div className="relative aspect-[16/9] bg-stone-900 overflow-hidden">
          {imageError ? (
            <div className="w-full h-full bg-[#1C1917] flex items-center justify-center text-stone-400 text-xs uppercase tracking-wider font-medium">
              Gaming Dispatch
            </div>
          ) : (
            <img
              src={gameStory.image}
              alt={gameStory.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {gameStory.genre && (
            <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 px-2 py-0.5 bg-stone-900/85 backdrop-blur-xs text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-stone-200">
              {gameStory.genre}
            </div>
          )}
        </div>

        <div className="p-3.5 sm:p-5">
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5 sm:mb-2">
            {gameStory.platforms?.map((plat) => (
              <span
                key={plat}
                className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded-xs"
              >
                {plat}
              </span>
            ))}
            <StatusBadge status={gameStory.status} />
          </div>

          <h3 className="text-base sm:text-lg md:text-xl font-medium text-stone-900 font-serif group-hover:text-[#9B1B30] transition-colors leading-snug">
            {gameStory.title}
          </h3>

          {gameStory.summary && (
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2 line-clamp-2 leading-relaxed">
              {gameStory.summary}
            </p>
          )}
        </div>
      </div>

      <div className="px-3.5 sm:px-5 pb-3 sm:pb-4 pt-1.5 sm:pt-2 border-t border-stone-100">
        <TrustBadge
          author={gameStory.author}
          sourcesCount={gameStory.sourcesCount}
          readTime={gameStory.readTime}
        />
      </div>
    </article>
  );
};
