/* Deploy-time step (no browser needed): injects the committed prerendered pages
   (frontend/prerendered/, produced in the dev pod via `yarn build:ssg` +
   `node snapshot-prerender.mjs`) into the fresh Vite build output.

   Asset hashes can differ between the snapshot build and this build, so every
   /assets/<name>-<hash>.(js|css) reference in the snapshots is remapped to the
   matching file of THIS build, and inlined stylesheets are re-inlined from this
   build's CSS. Each route is written as build/<route>/index.html AND
   build/<route>.html for static-server compatibility. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD = path.join(__dirname, "build");
const SRC = path.join(__dirname, "prerendered");

if (!fs.existsSync(SRC)) {
  console.log("apply-prerender: no prerendered/ snapshot found — skipping (SPA only)");
  process.exit(0);
}

const assetDir = path.join(BUILD, "assets");
const freshMap = {};
for (const f of fs.readdirSync(assetDir)) {
  const m = f.match(/^(.+)-[A-Za-z0-9_-]{8}\.(js|css)$/); // Vite hashes are 8 chars and may contain '-' or '_'
  if (m) freshMap[`${m[1]}.${m[2]}`] = f;
}

let missing = new Set();
const remapAssets = (html) =>
  html.replace(/\/assets\/([\w.-]+?)-([\w-]{8})\.(js|css)/g, (full, base, _hash, ext) => {
    const fresh = freshMap[`${base}.${ext}`];
    if (!fresh) {
      missing.add(`${base}.${ext}`);
      return full;
    }
    return `/assets/${fresh}`;
  });

const cssCache = new Map();
const reinlineCss = (html) =>
  html.replace(
    /<style data-inlined="\/assets\/([\w.-]+?)-[\w-]{8}\.css">[\s\S]*?<\/style>/g,
    (full, base) => {
      const fresh = freshMap[`${base}.css`];
      if (!fresh) return full;
      if (!cssCache.has(fresh)) cssCache.set(fresh, fs.readFileSync(path.join(assetDir, fresh), "utf8"));
      return `<style data-inlined="/assets/${fresh}">${cssCache.get(fresh)}</style>`;
    }
  );

let count = 0;
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) {
      const rel = path.relative(SRC, p);
      const html = reinlineCss(remapAssets(fs.readFileSync(p, "utf8")));
      const out = path.join(BUILD, rel);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, html);
      if (rel.endsWith(`${path.sep}index.html`)) {
        fs.writeFileSync(path.join(BUILD, `${rel.slice(0, -`${path.sep}index.html`.length)}.html`), html);
      }
      count++;
    }
  }
};
walk(SRC);
if (missing.size) console.warn(`apply-prerender: no fresh asset match for: ${[...missing].join(", ")} (kept snapshot hashes — re-run build:ssg + snapshot)`);
console.log(`apply-prerender: injected ${count} prerendered pages into build/ (asset hashes remapped)`);
