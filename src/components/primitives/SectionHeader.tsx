import React from "react";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  description,
  actionText = "View All",
  onActionClick,
  className = "",
}) => {
  return (
    <div
      className={`border-b border-stone-300 pb-2.5 sm:pb-3 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-4 ${className}`}
    >
      <div>
        {kicker && (
          <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#9B1B30] mb-0.5 sm:mb-1 font-sans">
            {kicker}
          </div>
        )}
        <h2 className="text-xl xs:text-2xl sm:text-3xl font-medium tracking-tight text-[#1C1917] font-serif leading-snug">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl font-sans leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionText && (
        <button
          type="button"
          onClick={onActionClick}
          className="group inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-700 hover:text-[#9B1B30] transition-colors cursor-pointer self-start sm:self-end shrink-0 py-1"
        >
          <span>{actionText}</span>
          <span className="transform transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </button>
      )}
    </div>
  );
};
