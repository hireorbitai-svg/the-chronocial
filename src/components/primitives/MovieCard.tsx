import React, { useState } from "react";
import { MovieItem } from "../../types";

interface MovieCardProps {
  movie: MovieItem;
  onSelect?: (movie: MovieItem) => void;
  className?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelect,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onSelect && onSelect(movie)}
      className={`group cursor-pointer bg-white border border-stone-200/90 rounded-xs overflow-hidden flex flex-col justify-between hover:border-stone-400 active:bg-stone-50 transition-all duration-200 shadow-2xs ${className}`}
    >
      <div>
        <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
          {imageError ? (
            <div className="w-full h-full bg-[#292524] flex items-center justify-center text-stone-400 text-xs uppercase tracking-wider font-medium">
              {movie.title}
            </div>
          ) : (
            <img
              src={movie.image}
              alt={movie.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 px-2 py-0.5 bg-stone-900/85 backdrop-blur-xs text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-stone-200">
            {movie.status}
          </div>

          {movie.rating && (
            <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 px-2 py-0.5 bg-stone-900/90 backdrop-blur-xs text-[10px] sm:text-[11px] font-semibold text-amber-300 flex items-center gap-1">
              <span>★</span>
              <span>{movie.rating.toFixed(1)} / 5</span>
            </div>
          )}
        </div>

        <div className="p-3.5 sm:p-5">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#9B1B30]">
              {movie.category}
            </span>
            <span className="truncate ml-2">{movie.runtime || movie.releaseDate}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-medium text-stone-900 font-serif group-hover:text-[#9B1B30] transition-colors leading-snug">
            {movie.title}
          </h3>

          <p className="text-[11px] sm:text-xs text-stone-500 mt-1">
            Directed by <span className="text-stone-800 font-medium">{movie.director}</span>
          </p>

          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans leading-relaxed line-clamp-2">
            {movie.synopsis}
          </p>

          {movie.criticVerdict && (
            <blockquote className="mt-2.5 sm:mt-3 p-2 sm:p-2.5 bg-stone-50 border-l-2 border-[#9B1B30] text-[11px] sm:text-xs text-stone-700 italic font-serif leading-relaxed line-clamp-2">
              "{movie.criticVerdict}"
            </blockquote>
          )}
        </div>
      </div>

      <div className="px-3.5 sm:px-5 pb-3 sm:pb-4 pt-1.5 sm:pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] sm:text-xs">
        <span className="text-stone-500 truncate mr-2">{movie.releaseDate}</span>
        <span className="font-semibold text-stone-700 group-hover:text-[#9B1B30] transition-colors shrink-0">
          Guide →
        </span>
      </div>
    </div>
  );
};
