import React, { useState } from "react";
import { CelebrityProfile } from "../../types";

interface CelebrityCardProps {
  celebrity: CelebrityProfile;
  onSelect?: (celebrity: CelebrityProfile) => void;
  className?: string;
}

export const CelebrityCard: React.FC<CelebrityCardProps> = ({
  celebrity,
  onSelect,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onSelect && onSelect(celebrity)}
      className={`group cursor-pointer bg-white border border-stone-200/90 rounded-xs overflow-hidden flex flex-col justify-between hover:border-stone-400 active:bg-stone-50 transition-all duration-200 shadow-2xs ${className}`}
    >
      <div>
        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
          {imageError ? (
            <div className="w-full h-full bg-[#EAE6DF] flex items-center justify-center text-stone-500 text-xs uppercase tracking-wider font-medium">
              {celebrity.name}
            </div>
          ) : (
            <img
              src={celebrity.image}
              alt={celebrity.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 px-2 py-0.5 bg-stone-900/80 backdrop-blur-xs text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-stone-100">
            {celebrity.nationality}
          </div>
        </div>

        <div className="p-3.5 sm:p-5">
          <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#9B1B30] mb-0.5 sm:mb-1">
            Focus & Filmography
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-stone-900 font-serif group-hover:text-[#9B1B30] transition-colors">
            {celebrity.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 font-sans">
            {celebrity.knownFor}
          </p>

          <div className="mt-2.5 sm:mt-3.5 pt-2 sm:pt-3 border-t border-stone-100">
            <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-0.5 sm:mb-1">
              Latest Reporting
            </div>
            <p className="text-xs sm:text-sm font-medium text-stone-800 leading-snug line-clamp-2">
              {celebrity.latestHeadline}
            </p>
          </div>
        </div>
      </div>

      <div className="px-3.5 sm:px-5 pb-3 sm:pb-4 pt-1.5 sm:pt-2 border-t border-stone-100 text-[10px] sm:text-[11px] text-stone-500 flex items-center justify-between">
        <span className="truncate max-w-[140px] sm:max-w-[200px]">{celebrity.latestCredit}</span>
        <span className="font-semibold text-stone-700 group-hover:text-[#9B1B30] transition-colors shrink-0">
          Dossier →
        </span>
      </div>
    </div>
  );
};
