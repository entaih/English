#!/usr/bin/env node
// Validates lesson JSON files in content/src against docs/CONTENT_GUIDE.md.
// Usage: node tools/validate.mjs [files...]   (no args = all files)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const TOPICS = ["startup", "aihear", "tech", "invest", "comms", "science", "life", "abroad", "future"];
const LIMITS = {
  A1: { text: [6, 8], words: 10, vocab: [5, 6], q: [3, 3], gaps: [3, 3], order: [2, 2], tr: [2, 2], turns: [2, 3] },
  A2: { text: [7, 9], words: 14, vocab: [6, 8], q: [4, 4], gaps: [3, 3], order: [2, 2], tr: [2, 2], turns: [3, 3] },
  B1: { text: [8, 10], words: 20, vocab: [7, 9], q: [4, 4], gaps: [3, 3], order: [2, 2], tr: [2, 2], turns: [3, 4] },
  B2: { text: [9, 11], words: 26, vocab: [8, 9], q: [4, 5], gaps: [3, 3], order: [2, 2], tr: [2, 2], turns: [3, 4] },
  C1: { text: [10, 12], words: 32, vocab: [9, 10], q: [5, 5], gaps: [3, 4], order: [2, 2], tr: [2, 3], turns: [4, 4] },
  C2: { text: [10, 12], words: 38, vocab: [9, 10], q: [5, 5], gaps: [3, 4], order: [2, 2], tr: [2, 3], turns: [4, 4] }
};
export const norm = (s) => (s || "").toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();
const words = (s) => norm(s).split(" ").filter(Boolean).length;
const str = (v) => typeof v === "string" && v.trim().length > 0;

export function validateLesson(L, file) {
  const errors = [], warnings = [];
  const E = (m) => errors.push(m), W = (m) => warnings.push(m);
  if (!str(L.id)) E("missing id");
  if (file && L.id && path.basename(file, ".json") !== L.id) E(`id ${L.id} does not match file name`);
  if (!TOPICS.includes(L.topic)) E(`unknown topic ${L.topic}`);
  if (!str(L.title)) E("missing title");
  if (!str(L.titleTr)) E("missing titleTr");
  if (!L.levels || typeof L.levels !== "object") { E("missing levels"); return { errors, warnings }; }
  for (const lv of LEVELS) {
    const V = L.levels[lv], lim = LIMITS[lv], p = `${lv}:`;
    if (!V) { E(`${p} missing level`); continue; }
    const range = (name, arr, [lo, hi]) => {
      if (!Array.isArray(arr)) { E(`${p} ${name} must be an array`); return false; }
      if (arr.length < lo || arr.length > hi) E(`${p} ${name} has ${arr.length}, expected ${lo}-${hi}`);
      return true;
    };
    if (!str(V.intro)) E(`${p} missing intro`);
    const json = JSON.stringify(V);
    if (/\bAli\b|Yilmaz|Yılmaz/.test(json)) E(`${p} uses a hard-coded learner name; use {name}`);
    if (range("text", V.text, lim.text)) V.text.forEach((t, i) => {
      if (!str(t.en) || !str(t.tr)) E(`${p} text[${i}] needs en and tr`);
      if (t.who != null && !str(t.who)) E(`${p} text[${i}].who empty`);
      const n = words(t.en);
      if (n > lim.words) E(`${p} text[${i}] has ${n} words (max ${lim.words}): "${t.en}"`);
      if ((t.en.match(/[.!?](\s|$)/g) || []).length > 1 && !/\b(Mr|Mrs|Dr|e\.g|i\.e)\./.test(t.en)) W(`${p} text[${i}] looks like more than one sentence`);
    });
    if (range("vocab", V.vocab, lim.vocab)) V.vocab.forEach((v, i) => {
      if (!str(v.en) || !str(v.tr) || !str(v.ex)) E(`${p} vocab[${i}] needs en, tr, ex`);
      if (["B1", "B2", "C1", "C2"].includes(lv) && !str(v.def)) E(`${p} vocab[${i}] (${v.en}) needs def`);
      const head = norm(String(v.en).replace(/\(.*?\)/g, "").split("/")[0]).split(" ").filter((w) => w.length > 2 && !["the", "and", "someone", "something", "sth", "sb"].includes(w));
      const ex = norm(v.ex);
      if (head.length && !head.some((w) => ex.includes(w.slice(0, Math.max(3, w.length - 2))))) W(`${p} vocab[${i}] example may not use "${v.en}"`);
    });
    const vocabSet = new Set((V.vocab || []).map((v) => norm(v.en)));
    if (vocabSet.size !== (V.vocab || []).length) E(`${p} duplicate vocab items`);
    if (!V.grammar || !str(V.grammar.title) || !str(V.grammar.tr) || !Array.isArray(V.grammar.examples) || V.grammar.examples.length < 2 || V.grammar.examples.length > 4 || !V.grammar.examples.every(str)) E(`${p} grammar needs title, tr, 2-4 examples`);
    if (range("questions", V.questions, lim.q)) {
      V.questions.forEach((q, i) => {
        if (!str(q.q)) E(`${p} questions[${i}] missing q`);
        if (!Array.isArray(q.options) || q.options.length < 3 || q.options.length > 4 || !q.options.every(str)) E(`${p} questions[${i}] needs 3-4 options`);
        else if (!(Number.isInteger(q.a) && q.a >= 0 && q.a < q.options.length)) E(`${p} questions[${i}] bad answer index`);
        if (q.options && new Set(q.options.map(norm)).size !== q.options.length) E(`${p} questions[${i}] duplicate options`);
      });
      const pos = new Set(V.questions.map((q) => q.a));
      if (V.questions.length >= 3 && pos.size === 1) W(`${p} all correct answers are at the same position`);
    }
    if (range("gaps", V.gaps, lim.gaps)) V.gaps.forEach((g, i) => {
      if (!str(g.s) || (g.s.match(/___/g) || []).length !== 1) E(`${p} gaps[${i}] needs exactly one ___`);
      if (!str(g.a) || !str(g.hint)) E(`${p} gaps[${i}] needs a and hint`);
    });
    if (range("order", V.order, lim.order)) V.order.forEach((o, i) => {
      if (!str(o.a)) { E(`${p} order[${i}] missing a`); return; }
      const n = words(o.a);
      if (n < 4 || n > 12) E(`${p} order[${i}] has ${n} words (4-12): "${o.a}"`);
      if (/,/.test(o.a)) E(`${p} order[${i}] must not contain commas`);
    });
    if (range("translate", V.translate, lim.tr)) V.translate.forEach((t, i) => {
      if (!str(t.tr) || !str(t.en)) E(`${p} translate[${i}] needs tr and en`);
      if (!Array.isArray(t.keys) || t.keys.length < 1 || t.keys.length > 3) E(`${p} translate[${i}] needs 1-3 keys`);
      else t.keys.forEach((k) => { if (!norm(t.en).includes(norm(k))) E(`${p} translate[${i}] key "${k}" not in en "${t.en}"`); });
    });
    const R = V.roleplay;
    if (!R || !str(R.persona) || !str(R.personaTr) || !str(R.scene)) E(`${p} roleplay needs persona, personaTr, scene`);
    else if (range("roleplay.turns", R.turns, lim.turns)) R.turns.forEach((t, i) => {
      if (!str(t.ai) || !str(t.aiTr) || !str(t.hint)) E(`${p} turns[${i}] needs ai, aiTr, hint`);
      if (!Array.isArray(t.keys) || t.keys.length < 2 || t.keys.length > 4 || !t.keys.every(str)) E(`${p} turns[${i}] needs 2-4 keys`);
      else if (!t.keys.some((k) => norm(t.hint).includes(norm(k)))) E(`${p} turns[${i}] no key appears in hint`);
    });
  }
  const extra = Object.keys(L.levels).filter((k) => !LEVELS.includes(k));
  if (extra.length) E(`unknown levels: ${extra.join(", ")}`);
  return { errors, warnings };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const dir = path.join(ROOT, "content/src");
  const files = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => path.join(dir, f));
  let bad = 0, warnCount = 0;
  for (const f of files) {
    let L;
    try { L = JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { console.log(`✗ ${f}: invalid JSON: ${e.message}`); bad++; continue; }
    const { errors, warnings } = validateLesson(L, f);
    warnCount += warnings.length;
    if (errors.length) { bad++; console.log(`✗ ${path.basename(f)}`); errors.forEach((e) => console.log("   error: " + e)); }
    else console.log(`✓ ${path.basename(f)}`);
    warnings.forEach((w) => console.log("   warn:  " + w));
  }
  console.log(`\n${files.length - bad}/${files.length} valid, ${warnCount} warnings`);
  process.exit(bad ? 1 : 0);
}
