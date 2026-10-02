// First-touch attribution: landing page + UTM params, kept for the session

const KEY = "cavicord_attribution";

export const captureAttribution = () => {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const p = new URLSearchParams(window.location.search);
    sessionStorage.setItem(
      KEY,
      JSON.stringify({
        source_page: window.location.pathname,
        utm_source: p.get("utm_source") || "",
        utm_medium: p.get("utm_medium") || "",
        utm_campaign: p.get("utm_campaign") || "",
        utm_term: p.get("utm_term") || "",
        gclid: p.get("gclid") || "",
      })
    );
  } catch (e) {
    // sessionStorage unavailable — attribution silently skipped
  }
};

export const getAttribution = () => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY)) || {};
  } catch (e) {
    return {};
  }
};
