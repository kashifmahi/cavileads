/* Writes public/sitemap.xml so every build ships a fresh sitemap. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { termPages } from "./src/data/terms.js";
import { landingPages } from "./src/data/landings.js";
import { guides } from "./src/data/guides.js";
import { articles } from "./src/data/articles.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://cavicord.tech";
const today = new Date().toISOString().slice(0, 10);

const pages = [
  { route: "/", freq: "daily", pri: "1.0" },
  ...termPages.map((p) => ({ route: `/${p.slug}`, freq: "daily", pri: "0.8" })),
  ...landingPages.map((p) => ({ route: `/${p.slug}`, freq: "daily", pri: "0.8" })),
  { route: "/articles", freq: "weekly", pri: "0.8" },
  { route: "/cd-rate-trends", freq: "daily", pri: "0.8" },
  ...articles.map((a) => ({ route: `/articles/${a.slug}`, freq: "monthly", pri: "0.7", lastmod: a.dateModified })),
  { route: "/guides", freq: "weekly", pri: "0.7" },
  ...guides.map((g) => ({ route: `/guides/${g.slug}`, freq: "monthly", pri: "0.6", lastmod: g.dateModified })),
  { route: "/about", freq: "monthly", pri: "0.5" },
  { route: "/privacy", freq: "yearly", pri: "0.2" },
  { route: "/terms", freq: "yearly", pri: "0.2" },
];

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
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), xml);
console.log(`public/sitemap.xml written (${pages.length} URLs)`);
