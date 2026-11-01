import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { REDIRECTS } from "./src/data/redirects.js";

// Injects src/data/redirects.js into index.html as a real JS navigation
// (location.replace) that runs before the app loads. On SPA hosting with no
// server-side 301s, React Router's <Navigate> only rewrites the address bar via
// the History API, which Google does not treat as a redirect, so it kept the old
// slugs (/jumbo-cd, /6-month-cd) as canonical. location.replace is the JS redirect
// Google documents as followed. One source of truth: redirects.js.
const legacyRedirects = () => ({
  name: "cavicord-legacy-redirects",
  transformIndexHtml(html) {
    return html.replace("__CAVICORD_REDIRECTS__", JSON.stringify(REDIRECTS));
  },
  // Static stub for each retired URL. The host can't send 301s, so the stub gives
  // crawlers a canonical + instant meta refresh (treated as a permanent redirect)
  // instead of the homepage copy the SPA fallback would serve.
  generateBundle() {
    for (const [from, to] of Object.entries(REDIRECTS)) {
      const url = `https://cavicord.tech${to}`;
      const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved | Cavicord</title><link rel="canonical" href="${url}"><meta http-equiv="refresh" content="0; url=${to}"><script>location.replace(${JSON.stringify(to)} + location.search + location.hash)</script></head><body><p>This page has moved to <a href="${to}">${url}</a>.</p></body></html>`;
      const base = from.replace(/^\//, "");
      this.emitFile({ type: "asset", fileName: `${base}/index.html`, source: html });
      this.emitFile({ type: "asset", fileName: `${base}.html`, source: html });
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "REACT_APP_");

  return {
    plugins: [react(), legacyRedirects()],
    // Keep the existing REACT_APP_* env vars working (platform-protected names)
    envPrefix: "REACT_APP_",
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
      allowedHosts: true,
      hmr: { clientPort: 443 },
      watch: {
        ignored: ["**/node_modules/**", "**/.git/**", "**/build/**", "**/dist/**"],
      },
    },
    build: {
      // Keep the same output folder as CRA so VPS nginx config keeps working
      outDir: "build",
      emptyOutDir: true,
      sourcemap: true,
    },
  };
});
