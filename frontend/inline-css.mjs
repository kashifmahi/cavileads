/* Inlines the entry CSS into build/index.html to remove the render-blocking request. */
import fs from "fs";

const htmlPath = "build/index.html";
let html = fs.readFileSync(htmlPath, "utf8");
const linkRe = /<link[^>]*rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g;
let inlined = 0;
html = html.replace(linkRe, (tag, href) => {
  const css = fs.readFileSync(`build${href}`, "utf8");
  inlined++;
  return `<style>${css}</style>`;
});
fs.writeFileSync(htmlPath, html);
console.log(`Inlined ${inlined} stylesheet(s) into index.html`);
