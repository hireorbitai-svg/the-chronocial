import React, { useState, useEffect } from "react";

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  activeVertical?: string;
  onNavigateVertical?: (vertical: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAccount,
  activeVertical = "Home",
  onNavigateVertical,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Hollywood", href: "#hollywood" },
    { label: "Bollywood", href: "#bollywood" },
    { label: "Celebrities", href: "#celebrities" },
    { label: "Movies", href: "#movies" },
    { label: "TV & OTT", href: "#tv-ott" },
    { label: "Gaming", href: "#gaming" },
  ];

  const moreLinks = [
    { label: "Latest Trailers", href: "#trailers" },
    { label: "Reviews & Verdicts", href: "#movies" },
    { label: "Release Calendar", href: "#coming-up" },
    { label: "Editorial Standards", href: "#trust" },
  ];

  const handleNavClick = (label: string, href: string) => {
    if (onNavigateVertical) {
      onNavigateVertical(label);
    }
    setMobileMenuOpen(false);
    setShowMoreMenu(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 w-full bg-[#FAF9F5]/98 backdrop-blur-md ${
          isScrolled
            ? "border-b border-stone-300 shadow-xs py-2 sm:py-2.5"
            : "border-b border-stone-200 py-2.5 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Zone 1: Mobile Hamburger + Brand Mark */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-stone-800 hover:text-stone-900 rounded-xs min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Open full site directory"
                aria-expanded={mobileMenuOpen}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("Home", "#hero");
                }}
                className="group block"
              >
                <span
                  className={`font-serif tracking-tight font-bold text-stone-900 group-hover:text-[#9B1B30] transition-colors whitespace-nowrap ${
                    isScrolled
                      ? "text-lg sm:text-xl md:text-2xl"
                      : "text-lg xs:text-xl sm:text-2xl md:text-3xl"
                  }`}
                >
                  THE CHRONICLE
                </span>
              </a>
            </div>

            {/* Zone 2: Desktop Center Navigation */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-semibold uppercase tracking-wider text-stone-700">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.label, link.href);
                  }}
                  className={`transition-colors py-1 relative hover:text-[#9B1B30] ${
                    activeVertical === link.label
                      ? "text-[#9B1B30] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#9B1B30]"
                      : "text-stone-700"
                  }`}
                >
                  {link.label}
                </a>
              ))}

              {/* More dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="flex items-center gap-1 hover:text-[#9B1B30] transition-colors py-1 cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={showMoreMenu}
                >
                  <span>More</span>
                  <span className="text-[9px] transform transition-transform duration-200">
                    {showMoreMenu ? "▲" : "▼"}
                  </span>
                </button>

                {showMoreMenu && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-[#FAF9F5] border border-stone-300 shadow-xl py-1.5 z-50 rounded-xs"
                    onMouseLeave={() => setShowMoreMenu(false)}
                  >
                    {moreLinks.map((m) => (
                      <a
                        key={m.label}
                        href={m.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(m.label, m.href);
                        }}
                        className="block px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-[#9B1B30] transition-colors normal-case"
                      >
                        {m.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Zone 3: Search + Account Right */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={onOpenSearch}
                className="flex items-center justify-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 transition-colors rounded-xs text-xs font-medium min-h-[40px] min-w-[40px] cursor-pointer"
                aria-label="Open search index"
              >
                <svg
                  className="w-4 h-4 text-stone-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="hidden sm:inline font-sans text-xs">Search</span>
                <kbd className="hidden md:inline text-[10px] bg-stone-200/70 text-stone-500 px-1 rounded-xs">
                  ⌘K
                </kbd>
              </button>

              <button
                type="button"
                onClick={onOpenAccount}
                className="px-2.5 sm:px-3 py-1.5 bg-[#1C1917] hover:bg-[#9B1B30] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shrink-0 shadow-xs cursor-pointer min-h-[36px]"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Mobile horizontal category rail with fade indicators */}
          <div className="lg:hidden relative mt-2 pt-2 border-t border-stone-200">
            <div className="flex items-center gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar py-1 text-xs font-semibold uppercase tracking-wider text-stone-600 whitespace-nowrap scroll-smooth">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.label, link.href)}
                  className={`pb-1 shrink-0 transition-colors cursor-pointer ${
                    activeVertical === link.label
                      ? "text-[#9B1B30] border-b-2 border-[#9B1B30]"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNavClick("Trailers", "#trailers")}
                className="pb-1 shrink-0 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
              >
                Trailers
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("Reviews", "#movies")}
                className="pb-1 shrink-0 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
              >
                Reviews
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("Calendar", "#coming-up")}
                className="pb-1 shrink-0 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
              >
                Calendar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-featured Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Directory"
          className="fixed inset-0 z-50 lg:hidden flex"
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
          />

          {/* Slide-out drawer content */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-[#FAF9F5] h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-5 z-10 border-r border-stone-300">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-300">
                <span className="font-serif font-bold text-xl tracking-tight text-stone-900">
                  THE CHRONICLE
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900 rounded-xs min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Quick action search in drawer */}
              <div className="mt-4 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 bg-stone-200/70 text-stone-700 rounded-xs text-xs font-medium text-left cursor-pointer"
                >
                  <svg className="w-4 h-4 text-stone-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search stories, films, talent...</span>
                </button>
              </div>

              {/* Editorial Desks */}
              <div className="mb-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#9B1B30] mb-2 font-sans">
                  Editorial Desks
                </div>
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => handleNavClick(link.label, link.href)}
                      className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-xs transition-colors flex items-center justify-between cursor-pointer ${
                        activeVertical === link.label
                          ? "bg-stone-200/80 text-[#9B1B30] font-semibold"
                          : "text-stone-800 hover:bg-stone-100"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-stone-400 font-serif text-xs">→</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* More Coverage */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2 font-sans">
                  Special Features
                </div>
                <div className="space-y-1">
                  {moreLinks.map((m) => (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => handleNavClick(m.label, m.href)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-xs transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{m.label}</span>
                      <span className="text-stone-300">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-stone-300 mt-6 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="w-full py-3 bg-[#9B1B30] hover:bg-[#7F1526] text-white text-xs font-semibold uppercase tracking-wider rounded-xs text-center cursor-pointer shadow-xs min-h-[44px]"
              >
                Reader Account & Dispatches
              </button>
              <div className="text-[11px] text-stone-500 text-center font-sans">
                Global bureaus: London · LA · Mumbai · Tokyo
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
