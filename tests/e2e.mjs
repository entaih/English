#!/usr/bin/env node
// End-to-end tests in a real browser (Playwright + Chromium) at phone size.
// Usage: node tests/e2e.mjs [--shots <dir>]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shotsDir = process.argv.includes("--shots") ? process.argv[process.argv.indexOf("--shots") + 1] : null;
let chromium;
try { ({ chromium } = await import("playwright")); }
catch { const req = createRequire(import.meta.url); ({ chromium } = req(process.env.PLAYWRIGHT_MODULE || "playwright")); }

// --- tiny static server ---
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml" };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const f = path.join(ROOT, p === "/" ? "index.html" : p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end("not found"); return; }
  res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}/`;

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
let failures = 0, passes = 0;
const errors = [];
async function test(name, fn) {
  try { await fn(); passes++; console.log("  ✓ " + name); }
  catch (e) { failures++; console.log("  ✗ " + name + "\n      " + (e && e.message ? e.message.split("\n")[0] : e)); }
}
const assert = (c, m) => { if (!c) throw new Error(m || "assertion failed"); };

const launchOpts = {};
if (process.env.CHROMIUM_PATH) launchOpts.executablePath = process.env.CHROMIUM_PATH;
const browser = await chromium.launch(launchOpts);
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "tr-TR", serviceWorkers: "block" });
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error" && !/fonts\.(googleapis|gstatic)/.test(m.text()) && !/ERR_(NAME_NOT_RESOLVED|INTERNET_DISCONNECTED|CONNECTION)/.test(m.text())) errors.push("console: " + m.text()); });
await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.fulfill({ status: 200, contentType: "text/css", body: "" }));
const shot = async (name) => { if (shotsDir) { fs.mkdirSync(shotsDir, { recursive: true }); await page.screenshot({ path: path.join(shotsDir, name + ".png") }); } };
const noOverflow = async (where) => {
  const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert(o <= 0, `${where}: page is ${o}px wider than the screen`);
};
const dismiss = async () => { for (let i = 0; i < 3 && (await page.locator(".celebrate-wrap button").count()); i++) { await page.click(".celebrate-wrap button"); await page.waitForTimeout(250); } };
const goto = async (hash) => { await dismiss(); await page.evaluate((h) => { location.hash = h; }, hash); await page.waitForTimeout(150); await dismiss(); };

console.log("AIHEAR English e2e");

await test("first visit opens onboarding", async () => {
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForSelector(".onboard");
  assert((await page.evaluate(() => location.hash)) === "#welcome", "expected #welcome");
  await shot("01-welcome");
  await noOverflow("welcome");
});

await test("onboarding + placement test recommends C2 when all answers are right", async () => {
  await page.click("text=Başlayalım");
  await page.fill("#ob-name", "Deniz");
  await page.click(".onboard .btn:has-text('Devam')");
  await page.click("text=Seviye testini yap");
  const answers = await page.evaluate(() => window.PLACEMENT.flatMap((g) => g.items.map((i) => i.a)));
  for (const a of answers) { await page.locator(".options .option").nth(a).click(); }
  await page.waitForSelector(".lv-big");
  assert((await page.textContent(".lv-big")).trim() === "C2", "expected C2");
  await shot("02-placement");
  await page.click("text=C2 ile başla");
  await page.locator(".level-opt").nth(1).click(); // goal 20
  await page.waitForSelector(".card.primary");
  assert((await page.textContent("#levelchip")).trim() === "C2", "level chip should be C2");
});

await test("placement stops early and recommends A1 when unsure", async () => {
  await goto("placement");
  for (let i = 0; i < 3; i++) await page.click("button:has-text('Bilmiyorum')");
  await page.waitForSelector(".lv-big");
  assert((await page.textContent(".lv-big")).trim() === "A1", "expected A1");
  await page.click("text=A1 ile başla");
});

await test("level sheet switches level", async () => {
  await page.click("#levelchip");
  await page.waitForSelector(".sheet");
  await page.waitForTimeout(400);
  await shot("03-levels");
  await page.locator(".sheet .level-opt").nth(1).click();
  await page.waitForTimeout(150);
  assert((await page.textContent("#levelchip")).trim() === "A2", "expected A2");
  await noOverflow("home");
  await shot("04-home");
});

await test("story map: 32 chapters, only the first is open", async () => {
  await goto("story");
  await page.waitForSelector(".node-row");
  assert((await page.locator(".node").count()) === 32, "expected 32 chapter nodes");
  assert((await page.locator(".node.locked").count()) === 31, "expected 31 locked chapters");
  assert((await page.locator(".act").count()) === 6, "expected 6 seasons");
  await noOverflow("story");
  await shot("05-story");
  await page.locator(".node-row").nth(1).click();
  assert(!(await page.locator(".sheet").count()), "locked chapter should not open");
  await goto("lesson/ai-01/A2");
  assert((await page.evaluate(() => location.hash)) === "#story", "locked lesson should redirect to the map");
});

await test("complete chapter 1 with all answers right; chapter 2 unlocks; value grows", async () => {
  const v0 = await page.evaluate(() => window.AIHEAR.valuation(window.AIHEAR.state.xp));
  await goto("lesson/ai-02/A2");
  await page.waitForSelector("#stepbody .sentence");
  const V = await page.evaluate(() => window.LEVEL_DATA.A2["ai-02"]);
  await page.click("text=Kelimelere geç");
  await page.waitForSelector(".card.grammar");
  await page.click("text=Kelimeleri ekle ve devam et");
  const qcards = page.locator("#stepbody > .card");
  for (let i = 0; i < V.questions.length; i++) await qcards.nth(i).locator(".option").nth(V.questions[i].a).click();
  await page.click("text=Kullanıma geç");
  for (let i = 0; i < V.gaps.length; i++) { await page.fill("#gap-" + i, V.gaps[i].a); await page.press("#gap-" + i, "Enter"); }
  const orders = page.locator(".order");
  for (let i = 0; i < V.order.length; i++) {
    for (const w of V.order[i].a.replace(/[.?!]/g, "").split(/\s+/)) await orders.nth(i).locator(".wordbank .word:not(.used)", { hasText: new RegExp("^" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$") }).first().click();
  }
  for (let i = 0; i < V.translate.length; i++) { await page.fill("#tr-" + i, V.translate[i].en); await page.click("#tr-check-" + i); }
  await page.click("text=Konuşmaya geç");
  for (const t of V.roleplay.turns) { await page.fill("#talk-input", t.hint); await page.click(".composer .send"); await page.waitForTimeout(150); }
  await page.waitForSelector(".done-card", { timeout: 8000 });
  await page.waitForTimeout(700);
  await shot("06-done");
  const done = await page.evaluate(() => window.AIHEAR.state.done["ai-02@A2"]);
  assert(done && done.complete && done.pct === 1, "expected 100% completion, got " + JSON.stringify(done));
  const v1 = await page.evaluate(() => window.AIHEAR.valuation(window.AIHEAR.state.xp));
  assert(v1 > v0, "company value should grow");
  assert((await page.textContent("#goalchip")).includes("€"), "header shows the company value");
  assert((await page.textContent(".done-card")).includes("AIHEAR değeri"), "done card shows value gain");
  await goto("story");
  await page.waitForSelector(".node-row");
  assert((await page.locator(".node.done").count()) === 1, "chapter 1 should be done");
  assert((await page.locator(".node.locked").count()) === 30, "chapter 2 should be unlocked");
});

await test("every lesson renders at every level (locks off)", async () => {
  await page.evaluate(() => { window.AIHEAR.state.settings.locks = false; });
  const order = await page.evaluate(() => window.CATALOG.order);
  assert(order.length >= 30, "expected at least 30 lessons, got " + order.length);
  for (const L of LEVELS) {
    await page.evaluate((l) => window.AIHEAR.loadLevel(l), L);
    for (const id of order) {
      await goto(`lesson/${id}/${L}`);
      await page.waitForSelector("#stepbody .sentence", { timeout: 4000 });
      const [cards, expected] = await page.evaluate(([i, l]) => [document.querySelectorAll("#stepbody .sentence").length, window.LEVEL_DATA[l][i].text.length], [id, L]);
      assert(cards === expected, `${id}@${L}: ${cards} cards, expected ${expected}`);
    }
  }
});

await test("text step: highlights, translation toggle and focus mode", async () => {
  await goto("lesson/ai-03/B1");
  await page.waitForSelector("#stepbody .sentence");
  assert((await page.locator(".w.hl").count()) > 0, "vocabulary should be highlighted in the text");
  assert(await page.locator(".sentence .tr").first().isHidden(), "Turkish should start hidden");
  await page.locator(".sentence .body").first().click();
  assert(await page.locator(".sentence .tr").first().isVisible(), "tap should reveal Turkish");
  await shot("07-lesson");
  await page.click(".toolbar button:has-text('Odak')");
  await page.waitForSelector(".sentence.big");
  await page.click(".focus-nav button:has-text('Sonraki')");
  assert((await page.textContent(".focus .row span")).includes("2 /"), "focus mode should advance");
  await noOverflow("lesson");
});

await test("typo-tolerant gap check accepts a near miss", async () => {
  await goto("lesson/ai-01/B1");
  await page.waitForSelector("#stepbody .sentence");
  await page.click(".steps button:nth-child(4)");
  const a = await page.evaluate(() => window.LEVEL_DATA.B1["ai-01"].gaps.map((g) => g.a).find((w) => w.length >= 5));
  if (!a) return;
  const i = await page.evaluate((x) => window.LEVEL_DATA.B1["ai-01"].gaps.findIndex((g) => g.a === x), a);
  const typo = a.slice(0, -2) + a.slice(-1) + a.slice(-2, -1); // swap last two letters
  await page.fill("#gap-" + i, typo);
  await page.press("#gap-" + i, "Enter");
  assert(await page.locator(".gap").nth(i).locator(".feedback.good").isVisible(), "near miss should be accepted");
});

await test("word list and review", async () => {
  await goto("words");
  await page.waitForSelector(".wordrow");
  await noOverflow("words");
  await page.click("main .btn.wide");
  await page.waitForSelector(".flash");
  await page.click("button:has-text('Kartı çevir')");
  await page.click(".rate .easy");
  await shot("08-review");
});

await test("company page: value, rounds and chart", async () => {
  await goto("company");
  await page.waitForSelector(".chart rect", { state: "attached" });
  assert((await page.locator(".rounds li").count()) === 7, "expected 7 funding rounds");
  assert((await page.locator(".rounds li.now").count()) === 1, "one current round");
  await noOverflow("company");
  await shot("09-company");
});

await test("game: listen and choose (10 rounds)", async () => {
  await goto("games/listen");
  await page.waitForSelector(".g-options");
  await noOverflow("listen game");
  await shot("12-listen");
  for (let i = 0; i < 10; i++) { await page.waitForSelector('.g-opt[data-ok="1"]:not(.correct)'); await page.click('.g-opt[data-ok="1"]'); await page.waitForTimeout(1000); }
  await page.waitForSelector(".done-card");
  assert((await page.textContent(".done-card .score-big")).trim() === "10/10", "expected 10/10");
  assert((await page.evaluate(() => window.AIHEAR.state.games.listen)) === 10, "record saved");
});

await test("game: match sounds to meanings", async () => {
  await goto("games/match");
  await page.waitForSelector(".m-audio");
  const n = await page.locator(".m-audio").count();
  await page.locator(".m-tr").first().click(); // without a sound selected: should ask first
  for (let k = 0; k < n; k++) { await page.click('.m-audio[data-k="' + k + '"]'); await page.click('.m-tr[data-k="' + k + '"]'); }
  await shot("13-match");
  await page.waitForSelector(".done-card", { timeout: 4000 });
  assert((await page.textContent(".done-card .score-big")).includes("Hatasız"), "expected a perfect board");
});

await test("game: timed blitz ends on time", async () => {
  await goto("games/blitz/4");
  await page.click("#blitz-start");
  for (let i = 0; i < 3; i++) { await page.waitForSelector('.b-btn[data-ok="1"]:not([disabled])'); await page.click('.b-btn[data-ok="1"]'); await page.waitForTimeout(350); }
  await shot("14-blitz");
  await page.waitForSelector(".done-card", { timeout: 8000 });
  assert(Number(await page.textContent(".done-card .score-big")) >= 3, "expected at least 3 points");
});

await test("investor duel: strong answers win the investment", async () => {
  await goto("duel");
  await page.click("#duel-start");
  for (let i = 0; i < 6; i++) {
    await page.waitForSelector("#duel-input:not([disabled])");
    const hint = (await page.textContent(".hintbox")).replace(/^Örnek:\s*/, "");
    if (i === 0) await shot("15-duel");
    await page.fill("#duel-input", hint);
    await page.click(".composer .send");
    await page.click("#duel-next");
  }
  await page.waitForSelector(".duel-verdict");
  assert((await page.textContent(".duel-verdict")).includes("Yatırım aldın"), "expected to win: " + (await page.textContent(".duel-verdict")));
  await noOverflow("duel");
  await shot("16-duel-win");
});

await test("pronunciation scoring matches spoken words", async () => {
  const r = await page.evaluate(() => window.AIHEAR.scoreSpeech(["We", "are", "a", "small", "team", "of", "six", "people"], "we're a small team of 6 people"));
  assert(r.pct === 1, "contractions and numbers should count: " + JSON.stringify(r));
  const r2 = await page.evaluate(() => window.AIHEAR.scoreSpeech(["We", "build", "a", "device", "that", "tests", "hearing"], "we built a device that test"));
  assert(r2.hits[6] === false && r2.hits[3] === true, "missing word should be marked: " + JSON.stringify(r2));
});

await test("settings: dark theme, font size and persistence", async () => {
  await goto("settings");
  await page.click(".seg button:has-text('Koyu')");
  await page.click(".seg button:has-text('Büyük')");
  assert((await page.getAttribute("html", "data-theme")) === "dark", "dark theme attribute");
  await noOverflow("settings");
  await shot("10-settings-dark");
  await page.reload({ waitUntil: "load" });
  await page.waitForSelector("main > *");
  assert((await page.getAttribute("html", "data-size")) === "l", "font size should persist");
  await goto("lessons");
  await page.waitForSelector(".node-row");
  assert((await page.evaluate(() => location.hash)) === "#lessons", "old lessons link still works");
  await shot("11-story-dark");
});

await test("no runtime errors", async () => { assert(errors.length === 0, errors.slice(0, 5).join(" | ")); });

await browser.close();
server.close();
console.log(`\n${passes} passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
