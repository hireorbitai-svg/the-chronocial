import React from "react";

interface TrustBadgeProps {
  updatedText?: string;
  sourcesCount?: number;
  readTime?: number;
  author?: string;
  className?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  updatedText,
  sourcesCount,
  readTime,
  author,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 font-sans ${className}`}
    >
      {author && <span className="font-medium text-stone-700">{author}</span>}
      {author && (updatedText || sourcesCount || readTime) && (
        <span aria-hidden="true" className="text-stone-300">
          ·
        </span>
      )}

      {updatedText && <span>{updatedText}</span>}

      {sourcesCount !== undefined && sourcesCount > 0 && (
        <>
          <span aria-hidden="true" className="text-stone-300">
            ·
          </span>
          <span className="text-stone-600 font-medium">
            {sourcesCount} {sourcesCount === 1 ? "source" : "sources cited"}
          </span>
        </>
      )}

      {readTime && (
        <>
          <span aria-hidden="true" className="text-stone-300">
            ·
          </span>
          <span>{readTime} min read</span>
        </>
      )}
    </div>
  );
};
