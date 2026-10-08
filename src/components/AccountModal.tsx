import React, { useState, useEffect } from "react";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [preferences, setPreferences] = useState({
    hollywood: true,
    bollywood: true,
    gaming: true,
    streaming: true,
    breakingAlerts: true,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Reader Account & Dispatches"
      className="fixed inset-0 z-50 bg-[#1C1917]/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
    >
      <div className="w-full max-w-lg bg-[#FAF9F5] border-t sm:border border-stone-300 rounded-t-lg sm:rounded-xs shadow-2xl p-5 sm:p-8 relative max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-stone-400 hover:text-stone-700 text-sm font-medium min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#9B1B30] mb-1 font-sans">
          The Chronicle Member Portal
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-medium text-stone-900 pr-8">
          Reader Account & Industry Dispatches
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2 leading-relaxed">
          Receive cross-verified entertainment intelligence directly to your inbox. No clickbait, no spam.
        </p>

        {subscribed ? (
          <div className="mt-5 sm:mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xs text-center">
            <div className="text-emerald-800 font-serif text-base sm:text-lg font-medium">
              Subscription Confirmed
            </div>
            <p className="text-xs text-emerald-700 mt-1 font-sans">
              We have dispatched your verification token to <strong>{email}</strong>. Your vertical selections are active.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-4 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-xs min-h-[40px] cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-4">
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Work or Reader Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="editor@studio.com or name@domain.com"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xs text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#9B1B30] min-h-[44px]"
              />
            </div>

            <div className="pt-2 border-t border-stone-200">
              <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Custom Vertical Coverage
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                <label className="flex items-center gap-2.5 p-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.hollywood}
                    onChange={(e) =>
                      setPreferences({ ...preferences, hollywood: e.target.checked })
                    }
                    className="accent-[#9B1B30] w-4 h-4 cursor-pointer"
                  />
                  Hollywood Studio Desk
                </label>
                <label className="flex items-center gap-2.5 p-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.bollywood}
                    onChange={(e) =>
                      setPreferences({ ...preferences, bollywood: e.target.checked })
                    }
                    className="accent-[#9B1B30] w-4 h-4 cursor-pointer"
                  />
                  Bollywood & Pan-India
                </label>
                <label className="flex items-center gap-2.5 p-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.gaming}
                    onChange={(e) =>
                      setPreferences({ ...preferences, gaming: e.target.checked })
                    }
                    className="accent-[#9B1B30] w-4 h-4 cursor-pointer"
                  />
                  Gaming & Interactive
                </label>
                <label className="flex items-center gap-2.5 p-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.streaming}
                    onChange={(e) =>
                      setPreferences({ ...preferences, streaming: e.target.checked })
                    }
                    className="accent-[#9B1B30] w-4 h-4 cursor-pointer"
                  />
                  TV & OTT Streaming
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#9B1B30] hover:bg-[#7F1526] text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-xs cursor-pointer shadow-xs min-h-[44px]"
            >
              Confirm Membership & Alerts
            </button>
            <p className="text-[10px] sm:text-[11px] text-stone-400 text-center font-sans pb-2">
              Protected by The Chronicle Editorial Privacy Standard. Opt out anytime.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
