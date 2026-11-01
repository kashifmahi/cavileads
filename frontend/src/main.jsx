import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/fonts.css";
import "@/index.css";
import App from "@/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const rootEl = document.getElementById("root");

const app = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

if (rootEl.hasChildNodes()) {
  // Prerendered page. Keep the static HTML on screen (it is what paints first and
  // what Largest Contentful Paint measures) and build the live app in a hidden
  // container, then swap the two once the live page has the same content.
  // Clearing the static HTML first left a blank screen until the route's JS chunk
  // and the rates API had loaded, which pushed mobile LCP to ~4.5s.
  document
    .querySelectorAll(
      'head title, head meta[name="description"], head meta[name="keywords"], head meta[name="robots"], head link[rel="canonical"], head meta[property="og:title"], head meta[property="og:description"], head meta[property="og:url"], head meta[property="og:image"], head meta[name="twitter:title"], head meta[name="twitter:description"], head meta[name="twitter:image"], head script[type="application/ld+json"]'
    )
    .forEach((n) => n.remove());

  const live = document.createElement("div");
  live.style.display = "none";
  rootEl.after(live);

  const needsRates = !!rootEl.querySelector('[data-testid^="open-account-"]');
  const staticH1 = rootEl.querySelector("main h1")?.textContent;
  const ready = () => {
    const h1 = live.querySelector("main h1");
    if (!h1) return false;
    // A different page than the static copy (e.g. 404): show it right away.
    if (h1.textContent !== staticH1) return true;
    return !needsRates || !!live.querySelector('[data-testid^="open-account-"]');
  };

  let swapped = false;
  const swap = () => {
    if (swapped) return;
    swapped = true;
    observer.disconnect();
    clearTimeout(fallback);
    rootEl.remove();
    live.id = "root";
    live.style.display = "";
  };
  const observer = new MutationObserver(() => {
    if (ready()) swap();
  });
  observer.observe(live, { childList: true, subtree: true });
  // Never keep the static copy longer than this, even if the API is slow.
  const fallback = setTimeout(swap, 6000);

  ReactDOM.createRoot(live).render(app);
} else {
  ReactDOM.createRoot(rootEl).render(app);
}
