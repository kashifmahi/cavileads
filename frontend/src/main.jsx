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

// Prerendered page: strip baked per-route head tags (Helmet re-adds them) and reset body
if (rootEl.hasChildNodes()) {
  document
    .querySelectorAll(
      'head title, head meta[name="description"], head meta[name="keywords"], head meta[name="robots"], head link[rel="canonical"], head meta[property="og:title"], head meta[property="og:description"], head meta[property="og:url"], head meta[property="og:image"], head meta[name="twitter:title"], head meta[name="twitter:description"], head meta[name="twitter:image"], head script[type="application/ld+json"]'
    )
    .forEach((n) => n.remove());
  rootEl.innerHTML = "";
}

const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
