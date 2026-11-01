/* Copies the prerendered HTML produced by `yarn build:ssg` (build/) into
   frontend/prerendered/ so it can be committed and re-applied at deploy time
   by apply-prerender.mjs (the deploy environment has no headless Chrome).
   Run in the dev pod after `yarn build:ssg`:  node snapshot-prerender.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD = path.join(__dirname, "build");
const OUT = path.join(__dirname, "prerendered");

fs.rmSync(OUT, { recursive: true, force: true });

let count = 0;
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "assets") continue;
      walk(p);
    } else if (e.name.endsWith(".html")) {
      const rel = path.relative(BUILD, p);
      const dest = path.join(OUT, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(p, dest);
      count++;
    }
  }
};
walk(BUILD);
console.log(`snapshot-prerender: copied ${count} HTML files from build/ to prerendered/`);
