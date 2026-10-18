#!/usr/bin/env node
// Captures store/manifest screenshots (780x1688) and the social preview (icons/og.png)
// from the real app, using a sample learner profile.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let chromium;
try { ({ chromium } = await import("playwright")); } catch { ({ chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || "playwright")); }
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
const server = http.createServer((req, res) => { const p = decodeURIComponent(new URL(req.url, "http://x").pathname); const f = path.join(ROOT, p === "/" ? "index.html" : p); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "tr-TR", serviceWorkers: "block" });
const page = await ctx.newPage();
const outDir = path.join(ROOT, "screenshots");
fs.mkdirSync(outDir, { recursive: true });

// Sample profile: a week of study at B1
await page.goto(BASE + "#home");
await page.evaluate(() => window.AIHEAR.loadLevel("B1"));
await page.evaluate(() => {
  const day = 86400000, key = (t) => { const d = new Date(t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const activity = {}; [12, 0, 25, 31, 18, 22, 40, 26, 0, 21, 34, 28, 23, 14].forEach((v, i) => { if (v) activity[key(Date.now() - (13 - i) * day)] = v; });
  const done = {}; ["st-01", "ai-01", "co-01", "ab-01", "ai-02", "st-02"].forEach((id, i) => { done[id + "@B1"] = { complete: true, pct: 0.86, ts: Date.now() - i * day, steps: { 1: true, 2: true, 3: true, 4: true, 5: true } }; });
  done["st-01@A2"] = { complete: true, pct: 1, steps: {} };
  const srs = {}; const B1 = window.LEVEL_DATA.B1;
  ["st-01", "ai-01", "co-01", "ab-01", "ai-02", "st-02"].forEach((id, i) => B1[id].vocab.forEach((v, j) => { srs[v.en] = { tr: v.tr, ex: v.ex, def: v.def, lesson: id, level: "B1", ease: 2.5, reps: j % 3, interval: (j % 3) * 4, due: Date.now() + ((j % 4) - 1) * day, lapses: 0, added: Date.now() }; }));
  localStorage.setItem("aihear-english-v1", JSON.stringify({ v: 3, onboarded: true, level: "B1", settings: { name: "Deniz", goal: 20, showTr: false }, done, srs, streak: { last: key(Date.now()), count: 6, best: 9 }, xp: 940, activity }));
});
const snap = async (name) => { await page.waitForTimeout(500); await page.screenshot({ path: path.join(outDir, name + ".png") }); console.log("screenshots/" + name + ".png"); };
await page.goto(BASE + "?profile=1#home", { waitUntil: "load" }); await page.waitForSelector(".card.primary"); await snap("home");
await page.evaluate(() => { location.hash = "lesson/ai-03/B1"; }); await page.waitForSelector("#stepbody .sentence");
await page.evaluate(() => { const c = document.querySelectorAll("#stepbody .sentence"); c[1].classList.add("speaking"); const w = c[1].querySelectorAll(".w"); if (w[4]) w[4].classList.add("now"); c[1].querySelector(".tr").hidden = false; window.scrollTo(0, 520); });
await snap("lesson");
await page.evaluate(() => { window.scrollTo(0, 0); location.hash = "home"; }); await page.waitForSelector(".card.primary"); await page.click("#levelchip"); await page.waitForSelector(".sheet"); await snap("levels");
await page.evaluate(() => { document.querySelectorAll(".sheet-wrap").forEach((n) => n.remove()); location.hash = "lesson/in-01/B2"; });
await page.evaluate(() => window.AIHEAR.loadLevel("B2"));
await page.waitForSelector("#stepbody .sentence"); await page.click(".steps button:nth-child(5)");
const V = await page.evaluate(() => window.LEVEL_DATA.B2["in-01"].roleplay);
await page.fill("#talk-input", V.turns[0].hint); await page.click(".composer .send"); await page.waitForTimeout(300);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await snap("talk");

// Social preview 1200x630
const og = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const css = fs.readFileSync(path.join(ROOT, "css/app.css"), "utf8");
await og.setContent(`<style>${css}
  body{margin:0;width:1200px;height:630px;overflow:hidden;background:#0b0f17;color:#fff;font-family:"Lexend",system-ui,sans-serif}
  .og{position:relative;height:100%;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;background:radial-gradient(900px 500px at 85% 20%,rgba(124,58,237,.55),transparent 60%),radial-gradient(800px 500px at 10% 100%,rgba(59,91,253,.6),transparent 60%),#0b0f17}
  .top{display:flex;align-items:center;gap:20px;font-size:34px;font-weight:700}
  .top svg{width:72px;height:72px}
  h1{font-size:76px;line-height:1.08;margin:0;letter-spacing:-.01em;max-width:900px}
  .lv{display:flex;gap:14px} .lv span{padding:10px 22px;border-radius:999px;background:rgba(255,255,255,.12);font-weight:700;font-size:28px}
  .lv span.on{background:linear-gradient(135deg,#3b5bfd,#7c3aed)}
  p{font-size:30px;color:rgba(255,255,255,.75);margin:0}</style>
  <div class="og"><div class="top"><svg viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b5bfd"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs><rect width="64" height="64" rx="18" fill="url(#g)"/><g stroke="#fff" stroke-width="5" stroke-linecap="round"><path d="M16 27v10"/><path d="M24 19v26"/><path d="M32 24v16"/><path d="M40 29v6"/><path d="M48 26v12"/></g></svg>AIHEAR English</div>
  <div style="display:flex;flex-direction:column;gap:22px"><h1>İngilizceyi kendi işinle öğren.</h1><p>Yatırımcı sunumu, ürün demosu, yurt dışında hayat. Disleksi dostu.</p></div>
  <div class="lv"><span>A1</span><span>A2</span><span class="on">B1</span><span>B2</span><span>C1</span><span>C2</span></div></div>`);
await og.waitForTimeout(300);
await og.screenshot({ path: path.join(ROOT, "icons/og.png") });
console.log("icons/og.png");
await browser.close(); server.close();
