import React from "react";

export const TrustSection: React.FC = () => {
  const trustPillars = [
    {
      title: "Cross-Checked Sources",
      description:
        "We require at least two independent, non-affiliated studio, guild, or production sources before marking any report as confirmed. We do not publish single-source hearsay.",
      stat: "2+ Sources",
      statLabel: "Required per lead story",
    },
    {
      title: "Transparent Rumor Labeling",
      description:
        "When reporting on early casting discussions or development leaks, we clearly tag stories with our Rumor or Reported status. We never disguise speculation as verified fact.",
      stat: "Strict Taxonomy",
      statLabel: "Confirmed vs. Reported vs. Rumor",
    },
    {
      title: "Auditable Timestamps",
      description:
        "Every article displays both initial publication and most recent verification timestamps. Readers always know exactly how fresh the reporting is.",
      stat: "Minute-Level",
      statLabel: "Update transparency",
    },
    {
      title: "Acknowledged Corrections",
      description:
        "When facts evolve or errors occur, we issue transparent correction notices appended directly to the article header with timestamps and rationale. We do not stealth-edit.",
      stat: "Public Log",
      statLabel: "Unconditional corrections policy",
    },
  ];

  return (
    <section id="trust" className="py-10 sm:py-14 bg-[#F2EFE8] border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#9B1B30] mb-1 font-sans">
            Editorial Charter & Verification
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-stone-900 leading-tight">
            Why Readers Trust The Chronicle
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-600 font-sans mt-2 sm:mt-3 leading-relaxed">
            Entertainment journalism is saturated with clickbait, rehosted press releases, and fabricated scoops. We built The Chronicle on a simple principle: credible reporting with verified provenance and total transparency.
          </p>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white border border-stone-300/80 p-4 sm:p-5 rounded-xs flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="border-b border-stone-200 pb-2.5 sm:pb-3 mb-2.5 sm:mb-3">
                  <div className="text-base sm:text-lg font-serif font-semibold text-[#9B1B30]">
                    {pillar.stat}
                  </div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-500 font-sans">
                    {pillar.statLabel}
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-serif font-medium text-stone-900 mb-1.5 sm:mb-2">
                  {pillar.title}
                </h3>

                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-stone-100 text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-400 font-semibold font-sans">
                The Chronicle Standard
              </div>
            </div>
          ))}
        </div>

        {/* Integrity Pledge banner */}
        <div className="mt-6 sm:mt-8 p-3.5 sm:p-4 bg-white/70 border border-stone-300 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs text-stone-600 font-sans">
          <div>
            <span className="font-semibold text-stone-900">Have a news tip or factual inquiry? </span>
            Our investigative editors review encrypted communications daily at{" "}
            <span className="font-mono text-stone-800">tips@thechronicle.media</span>.
          </div>
          <a
            href="#footer"
            className="text-stone-900 hover:text-[#9B1B30] font-semibold uppercase tracking-wider text-[10px] sm:text-[11px] shrink-0"
          >
            Read Complete Editorial Guidelines →
          </a>
        </div>
      </div>
    </section>
  );
};
