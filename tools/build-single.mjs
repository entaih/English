#!/usr/bin/env node
// Bundles the app into one self-contained HTML file (all levels inlined, no service worker).
// Usage: node tools/build-single.mjs <out.html> [--fragment]
//   --fragment  omit <html>/<head>/<body> (for hosts that add their own document skeleton)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2];
if (!out) { console.error("usage: build-single.mjs <out.html> [--fragment]"); process.exit(1); }
const fragment = process.argv.includes("--fragment");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const html = read("index.html");
const css = read("css/app.css");
const scripts = ["content/catalog.js", "content/placement.js", ...["A1", "A2", "B1", "B2", "C1", "C2"].map((l) => `content/levels/${l}.js`), "js/app.js"].map(read).join("\n;\n").replace(/<\/script/gi, "<\\/script");
const body = html.slice(html.indexOf('<div id="app">'), html.indexOf("<!-- build:inline -->"));
const fonts = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap">';
const doc = fragment
  ? `<title>AIHEAR English</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n${fonts}\n<style>\n${css}\n</style>\n${body}\n<script>\n${scripts}\n</script>\n`
  : `<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<title>AIHEAR English</title>\n${fonts}\n<style>\n${css}\n</style>\n</head>\n<body>\n${body}\n<script>\n${scripts}\n</script>\n</body>\n</html>\n`;
fs.writeFileSync(out, doc);
console.log(`wrote ${out} (${(Buffer.byteLength(doc) / 1024).toFixed(0)} KB)`);
