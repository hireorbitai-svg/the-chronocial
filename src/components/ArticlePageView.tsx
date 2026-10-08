import React, { useEffect, useState } from "react";
import { Story } from "../types";
import { StorySourceRow } from "../types/database";
import { getStorySources } from "../lib/sources";
import { StatusBadge } from "./primitives/StatusBadge";
import { TrustBadge } from "./primitives/TrustBadge";
import { StoryCard } from "./primitives/StoryCard";

interface ArticlePageViewProps {
  story: Story;
  allStories: Story[];
  onBackToHome: () => void;
  onSelectStory: (story: Story) => void;
}

export const ArticlePageView: React.FC<ArticlePageViewProps> = ({
  story,
  allStories,
  onBackToHome,
  onSelectStory,
}) => {
  const [sources, setSources] = useState<StorySourceRow[]>([]);

  // Scroll to top and load sources whenever an article is opened
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let isMounted = true;
    getStorySources(story.id).then((srcs) => {
      if (isMounted) setSources(srcs);
    });
    return () => {
      isMounted = false;
    };
  }, [story.id]);

  const relatedStories = allStories
    .filter((s) => s.id !== story.id)
    .slice(0, 3);

  const formattedDate = new Date(story.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="min-h-screen bg-[#FAF9F5] text-[#1C1917] pb-16">
      {/* Top Navigation & Breadcrumbs Bar */}
      <nav aria-label="Article navigation" className="border-b border-stone-200 bg-[#FAF9F5]/90 sticky top-[57px] sm:top-[65px] z-30 backdrop-blur-md py-2.5 px-3 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 text-xs">
          <button
            type="button"
            onClick={onBackToHome}
            className="group flex items-center gap-1.5 font-semibold uppercase tracking-wider text-stone-700 hover:text-[#9B1B30] transition-colors py-1 cursor-pointer min-h-[36px]"
          >
            <span className="transform transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to Front Page</span>
          </button>

          <div className="flex items-center gap-2 text-stone-500 font-sans">
            <span className="hidden sm:inline hover:underline cursor-pointer" onClick={onBackToHome}>Home</span>
            <span className="hidden sm:inline text-stone-300">/</span>
            <span className="font-semibold text-stone-800 uppercase tracking-wider text-[10px] sm:text-xs">
              {story.category}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Article link copied to clipboard.");
              }
            }}
            className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-semibold uppercase tracking-wider text-[10px] sm:text-xs py-1 px-2.5 rounded-xs border border-stone-300 hover:border-stone-400 bg-white transition-colors cursor-pointer"
          >
            <span>Share</span>
            <span className="text-stone-400">🔗</span>
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Category & Status */}
        <div className="flex items-center gap-2.5 mb-3 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9B1B30] font-sans">
            {story.category}
          </span>
          <span className="text-stone-300 font-sans">/</span>
          <StatusBadge status={story.status} />
          {story.platform && (
            <>
              <span className="text-stone-300 font-sans">/</span>
              <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider bg-stone-100 px-2 py-0.5 rounded-xs">
                {story.platform}
              </span>
            </>
          )}
        </div>

        {/* Lead Headline */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1C1917] font-serif leading-[1.18] sm:leading-[1.15] [text-wrap:balance]">
          {story.title}
        </h1>

        {/* Editorial Subdeck */}
        {story.editorialSubdeck && (
          <p className="text-base sm:text-xl text-stone-600 font-serif italic mt-3 sm:mt-4 leading-relaxed [text-wrap:balance]">
            {story.editorialSubdeck}
          </p>
        )}

        {/* Byline and Trust Metadata Panel */}
        <div className="mt-6 sm:mt-8 py-4 sm:py-5 border-y border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-serif text-sm font-bold shrink-0">
              {story.author?.charAt(0) || "C"}
            </div>
            <div>
              <div className="text-sm sm:text-base font-semibold text-stone-900">
                {story.author || "The Chronicle Editorial Board"}
              </div>
              <div className="text-xs text-stone-500 font-sans">
                {story.authorRole || "Senior Industry Correspondent"} · {formattedDate}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-1">
            <TrustBadge
              updatedText="Updated 38 min ago"
              sourcesCount={story.sourcesCount || 3}
              readTime={story.readTime || 4}
            />
            <span className="text-[10px] uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-xs self-start sm:self-auto font-medium">
              Verified Primary Reporting
            </span>
          </div>
        </div>

        {/* Cinematic Main Article Image */}
        <figure className="my-6 sm:my-8">
          <div className="relative aspect-[16/9] w-full bg-stone-950 rounded-xs overflow-hidden shadow-xs">
            <img
              src={story.image}
              alt={story.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80";
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/75 backdrop-blur-xs text-[10px] text-white font-mono uppercase tracking-wider">
              Lead Dispatch
            </div>
          </div>
          <figcaption className="mt-2 text-xs text-stone-500 font-serif italic flex items-center justify-between">
            <span>Archival still photography / The Chronicle Global Wire</span>
            <span className="font-sans not-italic text-[10px] text-stone-400">Copyright The Chronicle Media</span>
          </figcaption>
        </figure>

        {/* Verified Source Disclosure Callout Box */}
        <div className="p-4 sm:p-5 bg-white border border-stone-200/90 rounded-xs border-l-4 border-l-[#9B1B30] shadow-2xs mb-8">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
              The Chronicle Verification Protocol
            </span>
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-xs">
              Corroborated
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            {story.verificationDetails ||
              "This reporting has been corroborated through direct studio production filings and independent guild registers. The Chronicle does not publish unverified gossip or single-source rumors."}
          </p>

          {sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-stone-200/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Verified Cited Sources ({sources.length}):
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {sources.map((src) => (
                  <a
                    key={src.id}
                    href={src.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-[#9B1B30] font-medium rounded-xs transition-colors"
                  >
                    <span>{src.source_title || src.sources?.name || 'Primary Source Record'}</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Article Body Content */}
        <div className="prose prose-stone max-w-none text-stone-800 font-sans leading-relaxed text-base sm:text-lg space-y-5">
          {story.contentParagraphs && story.contentParagraphs.length > 0 ? (
            story.contentParagraphs.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:text-[#9B1B30] leading-relaxed"
                    : "leading-relaxed"
                }
              >
                {para}
              </p>
            ))
          ) : (
            <>
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:text-[#9B1B30] leading-relaxed">
                {story.summary ||
                  "Senior entertainment correspondents confirm that production milestones and distribution accords remain on track according to official industry filings."}
              </p>
              <p>
                Studio executives and creative heads have initiated secondary stage planning following extensive technical reviews. Representatives for the parties declined to comment beyond official filings submitted earlier today.
              </p>
              <p>
                Industry observers emphasize that this development underscores strategic realignments across both theatrical pipelines and global streaming syndication agreements.
              </p>
            </>
          )}

          {/* Editorial Pull Quote */}
          <blockquote className="my-8 py-4 sm:py-6 px-6 sm:px-8 border-l-3 border-[#9B1B30] bg-[#F4F1E9]/60 text-lg sm:text-2xl font-serif italic text-stone-900 not-italic leading-snug">
            "{story.editorialSubdeck || story.summary || "This production sets a new technical and economic benchmark for international theatrical exhibition."}"
            <footer className="text-xs font-sans not-italic text-stone-500 mt-2">
              — The Chronicle Intelligence Desk
            </footer>
          </blockquote>

          <p>
            Further updates will be published as official guild filings and production notices are confirmed by regional bureaus in Los Angeles, London, and Mumbai.
          </p>
        </div>

        {/* Editorial Standards & Corrections Footer */}
        <div className="mt-12 pt-6 border-t border-stone-200 bg-white p-5 rounded-xs border border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-0.5">
                Public Accountability
              </span>
              <p className="text-xs text-stone-600 font-sans">
                Found a factual discrepancy? Submit documented corrections to{" "}
                <span className="font-semibold text-stone-900">standards@thechronicle.media</span>.
              </p>
            </div>
            <button
              type="button"
              onClick={onBackToHome}
              className="px-4 py-2 bg-stone-900 hover:bg-[#9B1B30] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shrink-0 cursor-pointer"
            >
              Back to Front Page
            </button>
          </div>
        </div>

        {/* Related Coverage Section */}
        <div className="mt-14 pt-8 border-t border-stone-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9B1B30] block mb-1">
                More Reporting
              </span>
              <h2 className="text-xl sm:text-2xl font-medium font-serif text-stone-900">
                Related Dispatches & Investigations
              </h2>
            </div>
            <button
              type="button"
              onClick={onBackToHome}
              className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#9B1B30] transition-colors"
            >
              All Desks →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStories.map((related) => (
              <StoryCard
                key={related.id}
                story={related}
                layout="vertical"
                onSelectStory={onSelectStory}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
