import React, { useEffect, useState } from "react";

// Compact cookie notice: a single slim bar in the bottom-left corner.
// - z-40 so any open dialog (the lead form uses z-50) covers it instead of the reverse.
// - "Decline" really turns off Google Ads cookies via Consent Mode (see index.html,
//   which also applies a stored "declined" choice before the tag loads).

const KEY = "cavicord_cookie_consent";

const setConsent = (choice) => {
  try {
    if (window.gtag) {
      const v = choice === "accepted" ? "granted" : "denied";
      window.gtag("consent", "update", {
        ad_storage: v,
        ad_user_data: v,
        ad_personalization: v,
        analytics_storage: v,
      });
    }
  } catch (e) {
    // ignore
  }
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch (e) {
      stored = null;
    }
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const handle = (choice) => {
    try {
      localStorage.setItem(KEY, choice);
    } catch (e) {
      // ignore
    }
    setConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      data-testid="cookie-banner"
      className="fixed bottom-3 left-3 right-24 sm:right-auto z-40 sm:max-w-sm animate-slide-up"
    >
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/95 backdrop-blur px-3.5 py-2.5 shadow-lg">
        <p className="text-xs text-slate-600 leading-snug">
          We use cookies to measure ads and improve the site.
        </p>
        <div className="ml-auto flex shrink-0 gap-1.5">
          <button
            type="button"
            onClick={() => handle("declined")}
            className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handle("accepted")}
            className="rounded-md bg-[#16233d] px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1e2f52]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
