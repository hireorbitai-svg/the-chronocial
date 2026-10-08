import React from "react";

interface FooterProps {
  onOpenAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAccount }) => {
  return (
    <footer id="footer" className="bg-[#1C1917] text-stone-300 py-10 sm:py-14 font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-stone-800">
          {/* Column 1: Brand description (4 cols) */}
          <div className="sm:col-span-2 lg:col-span-4">
            <span className="font-serif tracking-tight font-bold text-xl sm:text-2xl text-white block mb-2 sm:mb-3">
              THE CHRONICLE
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              The premier global publication for cinema, television, talent intelligence, and interactive arts. Authoritative reporting from London, Los Angeles, Mumbai, and Tokyo bureaus.
            </p>

            <div className="mt-4 sm:mt-5 pt-4 border-t border-stone-800">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                Join The Daily Dispatch
              </span>
              <button
                type="button"
                onClick={onOpenAccount}
                className="w-full sm:w-auto px-3.5 py-2.5 bg-[#9B1B30] hover:bg-[#7F1526] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer min-h-[42px]"
              >
                Subscribe to Executive Wire
              </button>
            </div>
          </div>

          {/* Column 2: Explore (2 cols) */}
          <div className="lg:col-span-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-stone-100 block mb-2.5 sm:mb-3">
              Explore Desks
            </span>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#hollywood" className="hover:text-white transition-colors block py-0.5">
                  Hollywood
                </a>
              </li>
              <li>
                <a href="#bollywood" className="hover:text-white transition-colors block py-0.5">
                  Bollywood & Pan-India
                </a>
              </li>
              <li>
                <a href="#celebrities" className="hover:text-white transition-colors block py-0.5">
                  Celebrity Dossiers
                </a>
              </li>
              <li>
                <a href="#movies" className="hover:text-white transition-colors block py-0.5">
                  Movies & Theatrical
                </a>
              </li>
              <li>
                <a href="#tv-ott" className="hover:text-white transition-colors block py-0.5">
                  TV & OTT Streaming
                </a>
              </li>
              <li>
                <a href="#gaming" className="hover:text-white transition-colors block py-0.5">
                  Gaming & Tech
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: More (3 cols) */}
          <div className="lg:col-span-3">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-stone-100 block mb-2.5 sm:mb-3">
              More Coverage
            </span>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#trailers" className="hover:text-white transition-colors block py-0.5">
                  Official Trailers & Teasers
                </a>
              </li>
              <li>
                <a href="#movies" className="hover:text-white transition-colors block py-0.5">
                  Reviews & Critical Verdicts
                </a>
              </li>
              <li>
                <a href="#coming-up" className="hover:text-white transition-colors block py-0.5">
                  Global Release Calendar
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-white transition-colors block py-0.5">
                  Trending Velocity Index
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-white transition-colors block py-0.5">
                  Industry Box Office Archive
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Standards (3 cols) */}
          <div className="lg:col-span-3">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-stone-100 block mb-2.5 sm:mb-3">
              Company & Standards
            </span>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#trust" className="hover:text-white transition-colors block py-0.5">
                  About The Chronicle
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-white transition-colors block py-0.5">
                  Editorial Standards & Integrity
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-white transition-colors block py-0.5">
                  Public Corrections Policy
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-white transition-colors block py-0.5">
                  Source Protection & Tips
                </a>
              </li>
              <li>
                <span className="text-stone-500 cursor-pointer hover:text-stone-400 block py-0.5">
                  Privacy Policy & Terms
                </span>
              </li>
              <li>
                <span className="text-stone-500 cursor-pointer hover:text-stone-400 block py-0.5">
                  Masthead & Bureau Leadership
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar: © line + minimal social icons */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} The Chronicle Media Group Inc. All rights reserved. ISSN 2831-9042.
          </div>

          {/* Minimal social icons with comfortable touch targets */}
          <div className="flex items-center gap-2 text-stone-400">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="The Chronicle on X"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="The Chronicle on YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="The Chronicle on Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
