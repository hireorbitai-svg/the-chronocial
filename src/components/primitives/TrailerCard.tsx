import React, { useState } from "react";
import { TrailerItem } from "../../types";

interface TrailerCardProps {
  trailer: TrailerItem;
  onPlay?: (trailer: TrailerItem) => void;
  className?: string;
}

export const TrailerCard: React.FC<TrailerCardProps> = ({
  trailer,
  onPlay,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onPlay && onPlay(trailer)}
      className={`group cursor-pointer bg-white border border-stone-200/90 rounded-xs overflow-hidden flex flex-col justify-between hover:border-stone-400 active:bg-stone-50 transition-all duration-200 shadow-2xs ${className}`}
    >
      <div>
        <div className="relative aspect-video bg-stone-950 overflow-hidden">
          {imageError ? (
            <div className="w-full h-full bg-[#1C1917] flex items-center justify-center text-stone-500 text-xs uppercase tracking-wider">
              {trailer.title}
            </div>
          ) : (
            <img
              src={trailer.thumbnail}
              alt={trailer.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
          )}

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#9B1B30] text-white flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110 active:scale-95">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-xs text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-white">
            {trailer.trailerType}
          </div>

          <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 px-2 py-0.5 bg-black/85 backdrop-blur-xs text-[10px] sm:text-[11px] font-mono text-white/90">
            {trailer.duration}
          </div>
        </div>

        <div className="p-3.5 sm:p-4">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#9B1B30]">
              {trailer.category}
            </span>
            <span className="truncate ml-2">{trailer.studioOrPublisher}</span>
          </div>

          <h3 className="text-sm sm:text-base font-medium text-stone-900 font-serif group-hover:text-[#9B1B30] transition-colors leading-snug line-clamp-2">
            {trailer.title}
          </h3>

          <p className="text-xs text-stone-600 mt-1 sm:mt-1.5 line-clamp-2 font-sans">
            {trailer.synopsis}
          </p>
        </div>
      </div>

      <div className="px-3.5 sm:px-4 pb-3 sm:pb-3.5 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[11px] sm:text-xs">
        <span className="text-stone-500 font-sans truncate mr-2">{trailer.releaseDate}</span>
        <span className="font-semibold text-stone-800 group-hover:text-[#9B1B30] transition-colors flex items-center gap-1 shrink-0">
          <span>Watch</span>
          <span>▶</span>
        </span>
      </div>
    </div>
  );
};
