/* Prerender every route to static HTML. Run after `vite build`:
     node prerender.mjs
   Requires the backend API (REACT_APP_BACKEND_URL) to be reachable so rates get baked in. */
import { createServer } from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import { termPages } from "./src/data/terms.js";
import { landingPages } from "./src/data/landings.js";
import { guides } from "./src/data/guides.js";
import { articles } from "./src/data/articles.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD = path.join(__dirname, "build");
const PORT = 5050;
const SITE_URL = "https://cavicord.tech";

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon",
  ".svg": "image/svg+xml", ".txt": "text/plain", ".xml": "application/xml",
  ".webp": "image/webp", ".woff": "font/woff", ".woff2": "font/woff2",
};

// Keep the pristine SPA shell in memory so fallbacks never serve prerendered pages
const shell = fs.readFileSync(path.join(BUILD, "index.html"));

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const file = path.join(BUILD, urlPath);
  if (urlPath !== "/" && fs.existsSync(file) && fs.statSync(file).isFile()) {
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
    res.end(fs.readFileSync(file));
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(shell);
});

const today = new Date().toISOString().slice(0, 10);

/* Remove render-blocking requests from the prerendered HTML:
   1. The Google Fonts <link> is written with media="print" + onload="this.media='all'"
      in index.html, but the headless browser has already run onload by the time we
      snapshot the DOM, so the captured tag says media="all" (blocking again). Reset it.
   2. Inline the hashed app stylesheet (~12 KB) into a <style> tag so first paint
      doesn't wait on a second request. The file stays in build/ for the SPA fallback. */
const cssCache = new Map();
const unblockRender = (html) => {
  html = html.replace(
    /(<link[^>]*id="gfonts"[^>]*)media="all"/,
    '$1media="print"'
  );
  html = html.replace(
    /<link([^>]*)rel="stylesheet"([^>]*)href="(\/assets\/[^"]+\.css)"([^>]*)>/g,
    (tag, a, b, href, c) => {
      if (/id="gfonts"/.test(tag)) return tag;
      const file = path.join(BUILD, href);
      if (!fs.existsSync(file)) return tag;
      if (!cssCache.has(href)) cssCache.set(href, fs.readFileSync(file, "utf8"));
      return `<style data-inlined="${href}">${cssCache.get(href)}</style>`;
    }
  );
  return html;
};

const pages = [
  { route: "/", freq: "daily", pri: "1.0" },
  ...termPages.map((p) => ({ route: `/${p.slug}`, freq: "daily", pri: "0.8" })),
  ...landingPages.map((p) => ({ route: `/${p.slug}`, freq: "daily", pri: "0.8" })),
  { route: "/articles", freq: "weekly", pri: "0.8" },
  ...articles.map((a) => ({ route: `/articles/${a.slug}`, freq: "monthly", pri: "0.7", lastmod: a.dateModified })),
  { route: "/guides", freq: "weekly", pri: "0.7" },
  ...guides.map((g) => ({ route: `/guides/${g.slug}`, freq: "monthly", pri: "0.6" })),
  { route: "/about", freq: "monthly", pri: "0.5" },
];

// Non-sitemap routes that still need static files
const extraRoutes = [
  { route: "/admin" },
  { route: "/404", visit: "/this-page-does-not-exist-404" },
];

const writeSitemap = () => {
  const body = pages
    .map(
      (p) => `  <url>
    <loc>${SITE_URL}${p.route === "/" ? "" : p.route}</loc>
    <lastmod>${p.lastmod || today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.pri}</priority>
  </url>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  fs.writeFileSync(path.join(BUILD, "sitemap.xml"), xml);
  console.log(`sitemap.xml written (${pages.length} URLs, lastmod dates included)`);
};

async function main() {
  await new Promise((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });

  let ok = 0;
  const all = [...pages, ...extraRoutes];
  for (const { route, visit } of all) {
    const target = `http://127.0.0.1:${PORT}${visit || route}`;
    try {
      await page.goto(target, { waitUntil: "networkidle0", timeout: 60000 });
      await new Promise((r) => setTimeout(r, 400));
      let html = `<!doctype html>\n${await page.evaluate(() => document.documentElement.outerHTML)}`;
      let seenTitle = false;
      html = html.replace(/<title>[\s\S]*?<\/title>/g, (m) => (seenTitle ? "" : ((seenTitle = true), m)));
      html = unblockRender(html);
      let outFile;
      if (route === "/") outFile = path.join(BUILD, "index.html");
      else if (route === "/404") outFile = path.join(BUILD, "404.html");
      else {
        const dir = path.join(BUILD, route);
        fs.mkdirSync(dir, { recursive: true });
        outFile = path.join(dir, "index.html");
      }
      fs.writeFileSync(outFile, html);
      const title = await page.title();
      console.log(`✓ ${route}  →  "${title.slice(0, 60)}"`);
      ok += 1;
    } catch (err) {
      console.error(`✗ ${route} failed: ${err.message}`);
    }
  }

  await browser.close();
  server.close();
  writeSitemap();
  console.log(`\nPrerendered ${ok}/${all.length} routes into ${BUILD}`);
  if (ok < all.length) process.exit(1);
}

main();
