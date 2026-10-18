/* AIHEAR English — girişimciler için kişisel İngilizce.
   Vanilla JS, derleme adımı yok. İlerleme cihazda (localStorage) tutulur.
   İçerik: content/catalog.js (liste) + content/levels/<SEVİYE>.js (isteğe bağlı yüklenir). */
(function () {
  "use strict";

  /* ================= Yardımcılar ================= */
  // DOM append/prepend/replaceChildren turn null into the text "null". Optional children
  // are common in this file, so filter them out once, here.
  [Element.prototype, DocumentFragment.prototype].forEach((proto) => ["append", "prepend", "replaceChildren"].forEach((m) => {
    const orig = proto[m];
    proto[m] = function (...kids) { return orig.apply(this, kids.flat(Infinity).filter((k) => k != null && k !== false)); };
  }));
  // Text areas grow with their content (less scrolling inside a small box).
  document.addEventListener("input", (e) => { const t = e.target; if (t && t.tagName === "TEXTAREA" && !t.readOnly) { t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight + 4, 260) + "px"; } });
  const $ = (sel, root) => (root || document).querySelector(sel);
  const el = (tag, attrs, ...children) => {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v === false || v == null) continue;
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else if (k === "style") n.setAttribute("style", v);
      else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
      else if (v === true) n.setAttribute(k, "");
      else n.setAttribute(k, v);
    }
    for (const c of children.flat(Infinity)) {
      if (c == null || c === false) continue;
      n.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(String(c)) : c);
    }
    return n;
  };
  const DAY = 86400000;
  const dateKey = (t) => { const d = new Date(t == null ? Date.now() : t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const norm = (s) => (s || "").toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // Optimal string alignment distance: a swap of two neighbouring letters counts as one
  // mistake (the most common dyslexic typo, e.g. "rpototype").
  const lev = (a, b) => {
    if (a === b) return 0;
    if (Math.abs(a.length - b.length) > 2) return 9;
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i].concat(Array(b.length).fill(0)));
    for (let j = 0; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
      const c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[a.length][b.length];
  };
  const tolerance = (w) => (w.length >= 8 ? 2 : w.length >= 4 ? 1 : 0);
  const close = (a, b) => lev(a, b) <= tolerance(b);
  // Metin, anahtar ifadeyi (küçük yazım hatalarına izin vererek) içeriyor mu?
  const hasKey = (text, key) => {
    const T = norm(text), K = norm(key);
    if (!K) return false;
    if ((" " + T + " ").includes(" " + K + " ") || T.includes(K)) return true;
    const tw = T.split(" "), kw = K.split(" ");
    return kw.every((k) => tw.some((t) => close(t, k)));
  };
  const haptic = () => { try { if (state.settings.haptics && navigator.vibrate) navigator.vibrate(12); } catch (e) { /* yok say */ } };

  const ICONS = {
    home: '<path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/>',
    book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>',
    cards: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 6V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"/>',
    chart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    speaker: '<path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 17v4"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    back: '<path d="M15 18l-6-6 6-6"/>',
    next: '<path d="M9 6l6 6-6 6"/>',
    eye: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V18h6v-1.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/>',
    send: '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
    focus: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
    list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    up: '<path d="M12 19V5"/><path d="M5 12l7-7 7 7"/>',
    down: '<path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    swap: '<path d="M7 4L3 8l4 4"/><path d="M3 8h14"/><path d="M17 20l4-4-4-4"/><path d="M21 16H7"/>',
    reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    x: '<path d="M18 6L6 18"/><path d="M6 6l12 12"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
    trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3"/><path d="M7 5H4v2a3 3 0 0 0 3 3"/>'
  };
  const icon = (name, cls) => { const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("fill", "none"); s.setAttribute("stroke", "currentColor"); s.setAttribute("stroke-width", "2"); s.setAttribute("stroke-linecap", "round"); s.setAttribute("stroke-linejoin", "round"); s.setAttribute("aria-hidden", "true"); if (cls) s.setAttribute("class", cls); s.innerHTML = ICONS[name] || ""; return s; };

  /* ================= Seviyeler ================= */
  const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const LEVEL_INFO = {
    A1: { name: "Başlangıç", desc: "Kendini tanıtır, çok kısa ve basit cümleler kurarsın.", rate: 0.72, minutes: 6 },
    A2: { name: "Temel", desc: "İş ve günlük hayatta kısa konuşmalar yaparsın.", rate: 0.8, minutes: 8 },
    B1: { name: "Orta", desc: "Şirketini anlatır, toplantıda derdini anlatırsın.", rate: 0.88, minutes: 10 },
    B2: { name: "Orta üstü", desc: "Yatırımcıyla akıcı konuşur, fikrini savunursun.", rate: 0.95, minutes: 12 },
    C1: { name: "İleri", desc: "Nüanslı, ikna edici ve profesyonel konuşursun.", rate: 1.0, minutes: 14 },
    C2: { name: "Uzman", desc: "Neredeyse ana dil gibi: ton, üslup, ince anlamlar.", rate: 1.02, minutes: 15 }
  };
  const levelIdx = (L) => LEVELS.indexOf(L);
  const levelUp = (L) => LEVELS[Math.min(LEVELS.length - 1, levelIdx(L) + 1)];
  const levelDown = (L) => LEVELS[Math.max(0, levelIdx(L) - 1)];

  /* ================= Veri ================= */
  const CATALOG = window.CATALOG || { topics: [], order: [], lessons: {} };
  const PLACEMENT = window.PLACEMENT || [];
  const ORDER = CATALOG.order.filter((id) => CATALOG.lessons[id]);
  const meta = (id) => CATALOG.lessons[id];
  const topic = (id) => CATALOG.topics.find((t) => t.id === id) || { id, name: id, short: id, color: "#64748b" };
  const loading = {};
  const loadLevel = (L) => {
    if (window.LEVEL_DATA && window.LEVEL_DATA[L]) return Promise.resolve();
    if (loading[L]) return loading[L];
    loading[L] = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "content/levels/" + L + ".js";
      s.onload = () => (window.LEVEL_DATA && window.LEVEL_DATA[L] ? resolve() : reject(new Error("empty")));
      s.onerror = () => { delete loading[L]; reject(new Error("load")); };
      document.head.appendChild(s);
    });
    return loading[L];
  };
  const learnerName = () => (state.settings.name || "").trim() || "Deniz";
  const variant = (id, L) => {
    const v = window.LEVEL_DATA && window.LEVEL_DATA[L] && window.LEVEL_DATA[L][id];
    if (!v) return null;
    const safe = learnerName().replace(/["\\\u0000-\u001f]/g, "");
    return JSON.parse(JSON.stringify(v).replace(/\{name\}/g, safe));
  };

  /* ================= Durum ================= */
  const KEY = "aihear-english-v1";
  const defaults = () => ({
    v: 3,
    onboarded: false,
    level: "B1",
    settings: {
      name: "", goal: 20,
      font: "lexend", size: "m", space: "normal", paper: "cool", theme: "auto",
      accent: "GB", rate: 0, autoSpeak: true, showTr: false, karaoke: true, choices: "auto", haptics: true,
      apiKey: "", aiMode: false
    },
    done: {},
    srs: {},
    streak: { last: "", count: 0, best: 0 },
    xp: 0,
    activity: {},
    placement: null
  });
  let state = defaults();
  const OLD_LEVELS = { "st-01": "A2", "st-02": "A2", "ai-01": "A2", "ai-02": "A2", "te-01": "A2", "co-01": "A2", "li-01": "A2" };
  const load = () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      const d = defaults();
      state = Object.assign(d, s);
      state.settings = Object.assign(d.settings, s.settings || {});
      state.streak = Object.assign(d.streak, s.streak || {});
      state.activity = s.activity || {};
      if (!s.v || s.v < 3) {
        // Eski tek seviyeli sürümden geçiş
        const done = {};
        Object.keys(s.done || {}).forEach((id) => { if (id.includes("@")) done[id] = s.done[id]; else if (s.done[id] && s.done[id].complete) done[id + "@" + (OLD_LEVELS[id] || "B1")] = { complete: true, pct: 0.8, date: s.done[id].date || dateKey(), steps: { 1: true, 2: true, 3: true, 4: true, 5: true } }; });
        state.done = done;
        if (!["cool", "cream", "mint", "white"].includes(state.settings.paper)) state.settings.paper = "cool";
        if (typeof state.settings.rate !== "number" || !s.v) state.settings.rate = 0;
        state.onboarded = Object.keys(done).length > 0 || !!state.settings.name;
        state.v = 3;
      }
      if (!LEVELS.includes(state.level)) state.level = "B1";
    } catch (e) { /* özel pencere ya da bozuk veri: varsayılanlarla devam */ }
  };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* depolama kapalı */ } };
  const addXp = (n) => {
    if (!n) return;
    const t = dateKey();
    state.xp += n;
    state.activity[t] = (state.activity[t] || 0) + n;
    if (state.streak.last !== t) {
      const y = dateKey(Date.now() - DAY);
      state.streak.count = state.streak.last === y ? state.streak.count + 1 : 1;
      state.streak.last = t;
      state.streak.best = Math.max(state.streak.best || 0, state.streak.count);
    }
    save();
    updateGoalChip();
  };
  const streakNow = () => { const t = dateKey(), y = dateKey(Date.now() - DAY); return state.streak.last === t || state.streak.last === y ? state.streak.count : 0; };
  const doneKey = (id, L) => id + "@" + L;
  const isDone = (id, L) => !!(state.done[doneKey(id, L)] && state.done[doneKey(id, L)].complete);
  const doneAt = (L) => ORDER.filter((id) => isDone(id, L)).length;
  const doneAny = (id) => LEVELS.some((L) => isDone(id, L));
  const lessonsDone = () => Object.values(state.done).filter((d) => d.complete).length;
  const nextLesson = (L, after) => {
    const start = after ? ORDER.indexOf(after) + 1 : 0;
    for (let i = 0; i < ORDER.length; i++) { const id = ORDER[(start + i) % ORDER.length]; if (!isDone(id, L)) return id; }
    return null;
  };

  /* ================= Ayarlar ================= */
  const applySettings = () => {
    const s = state.settings, r = document.documentElement;
    r.setAttribute("data-font", s.font);
    r.setAttribute("data-size", s.size);
    r.setAttribute("data-space", s.space);
    r.setAttribute("data-paper", s.paper);
    if (s.theme === "auto") r.removeAttribute("data-theme"); else r.setAttribute("data-theme", s.theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", getComputedStyle(r).getPropertyValue("--paper").trim() || "#f2f4f8");
  };
  const speechRate = (L) => state.settings.rate || LEVEL_INFO[L || state.level].rate;

  /* ================= Ses: okuma (TTS) ================= */
  const TTS = {
    voice: null, token: 0,
    ok: () => "speechSynthesis" in window,
    pick() {
      if (!this.ok()) return null;
      const vs = speechSynthesis.getVoices();
      const want = state.settings.accent === "US" ? /en[-_]US/i : /en[-_]GB/i;
      const good = /Google|Samantha|Daniel|Karen|Serena|Arthur|Martha|Microsoft (Aria|Libby|Sonia|Ryan|Jenny|Guy)|Natural|Premium|Enhanced/i;
      const inLang = vs.filter((v) => want.test(v.lang));
      this.voice = inLang.find((v) => good.test(v.name)) || inLang[0] || vs.find((v) => /^en/i.test(v.lang)) || null;
      return this.voice;
    },
    stop() { this.token++; if (this.ok()) speechSynthesis.cancel(); },
    speak(text, opts) {
      opts = opts || {};
      const my = ++this.token;
      return new Promise((resolve) => {
        if (!this.ok()) { if (!opts.silent) toast("Bu tarayıcıda sesli okuma yok."); resolve(); return; }
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        if (!this.voice) this.pick();
        if (this.voice) u.voice = this.voice;
        u.lang = state.settings.accent === "US" ? "en-US" : "en-GB";
        u.rate = opts.rate || speechRate(opts.level);
        let finished = false;
        const done = () => { if (finished) return; finished = true; resolve(my === this.token); };
        u.onend = done; u.onerror = done;
        if (opts.onWord) u.onboundary = (e) => { if (my === this.token && (e.name === "word" || e.name == null)) opts.onWord(e.charIndex); };
        speechSynthesis.speak(u);
        setTimeout(done, Math.max(5000, text.length * 160 / u.rate));
      });
    }
  };
  if (TTS.ok()) { TTS.pick(); speechSynthesis.onvoiceschanged = () => TTS.pick(); }

  /* ================= Ses: dinleme (STT) ================= */
  const STT = {
    ok: () => !!(window.SpeechRecognition || window.webkitSpeechRecognition),
    listen(onText, onEnd) {
      const R = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!R) { toast("Bu tarayıcı konuşmayı tanımıyor. Yazarak devam et."); onEnd && onEnd(); return null; }
      const rec = new R();
      rec.lang = state.settings.accent === "US" ? "en-US" : "en-GB";
      rec.interimResults = true;
      let finalText = "";
      rec.onresult = (e) => { let interim = ""; for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) finalText += t; else interim += t; } onText((finalText + interim).trim()); };
      rec.onerror = (e) => { if (e.error === "not-allowed") toast("Mikrofon izni verilmedi."); };
      rec.onend = () => { onEnd && onEnd(); };
      try { rec.start(); } catch (e) { onEnd && onEnd(); return null; }
      return rec;
    }
  };
  const micButton = (target, label) => {
    let rec = null;
    const b = el("button", { class: "iconbtn", type: "button", "aria-label": label || "Konuşarak cevap ver", onclick: () => {
      if (rec) { rec.stop(); return; }
      TTS.stop();
      b.classList.add("active");
      rec = STT.listen((t) => { target.value = t; target.dispatchEvent(new Event("input")); }, () => { b.classList.remove("active"); rec = null; });
    } }, icon("mic"));
    if (!STT.ok()) b.hidden = true;
    return b;
  };

  /* ================= Aralıklı tekrar (SM-2 benzeri) ================= */
  const SRS = {
    add(word, info) {
      if (state.srs[word]) return false;
      state.srs[word] = Object.assign({ ease: 2.5, interval: 0, due: Date.now(), reps: 0, lapses: 0, added: Date.now() }, info);
      return true;
    },
    rate(word, q) { // 1 zor, 2 orta, 3 kolay
      const w = state.srs[word]; if (!w) return;
      if (q === 1) { w.reps = 0; w.lapses++; w.interval = 0; w.ease = Math.max(1.3, w.ease - 0.2); w.due = Date.now() + 10 * 60000; }
      else {
        w.reps++;
        if (w.reps === 1) w.interval = q === 3 ? 3 : 1;
        else if (w.reps === 2) w.interval = q === 3 ? 7 : 3;
        else w.interval = Math.round(w.interval * (q === 3 ? w.ease + 0.3 : w.ease));
        w.ease = Math.min(3.0, w.ease + (q === 3 ? 0.1 : -0.05));
        w.due = Date.now() + w.interval * DAY;
      }
      save();
    },
    known(word) { const w = state.srs[word]; return !!w && w.interval >= 7; },
    due() { const now = Date.now(); return Object.keys(state.srs).filter((k) => state.srs[k].due <= now); },
    status(word) { const w = state.srs[word]; if (!w) return "new"; if (w.interval >= 7) return "known"; return "learning"; }
  };

  /* ================= Bildirim, sayfa altı panel ================= */
  let toastTimer = null;
  const toast = (msg, opts) => {
    opts = opts || {};
    let t = $("#toast");
    if (!t) { t = el("div", { id: "toast", class: "toast", role: "status", "aria-live": "polite" }); document.body.appendChild(t); }
    t.replaceChildren(el("span", null, msg), opts.action ? el("button", { class: "toast-action", onclick: () => { t.hidden = true; opts.onAction(); } }, opts.action) : null);
    t.hidden = false;
    clearTimeout(toastTimer);
    if (!opts.sticky) toastTimer = setTimeout(() => { t.hidden = true; }, opts.ms || 2800);
  };
  const sheet = (title, content) => {
    const close = () => { wrap.remove(); document.removeEventListener("keydown", onKey); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    const panel = el("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": title },
      el("div", { class: "sheet-head" }, el("h2", null, title), el("button", { class: "iconbtn plain", "aria-label": "Kapat", onclick: () => close() }, icon("x"))),
      content);
    const wrap = el("div", { class: "sheet-wrap", onclick: (e) => { if (e.target === wrap) close(); } }, panel);
    document.body.appendChild(wrap);
    document.addEventListener("keydown", onKey);
    setTimeout(() => { const f = panel.querySelector("button:not(.plain), input"); if (f) f.focus(); }, 30);
    return close;
  };

  /* ================= Yönlendirme ================= */
  const main = $("#main"), titleEl = $("#title"), backBtn = $("#back"), levelChip = $("#levelchip"), goalChip = $("#goalchip"), nav = $(".bottomnav");
  const routes = {};
  let route = { name: "home", args: [] };
  const go = (hash) => { if (location.hash === "#" + hash) render(); else location.hash = hash; };
  const NO_CHROME = ["welcome", "placement"];
  const BACK_TO = { lesson: "lessons", review: "words", about: "settings" };
  const render = async () => {
    TTS.stop();
    document.querySelectorAll(".sheet-wrap").forEach((n) => n.remove());
    const parts = (location.hash || "#home").slice(1).split("/");
    let name = routes[parts[0]] ? parts[0] : "home";
    if (!state.onboarded && !NO_CHROME.includes(name)) { location.replace("#welcome"); return; }
    route = { name, args: parts.slice(1) };
    document.body.classList.toggle("bare", NO_CHROME.includes(name));
    nav.querySelectorAll("button").forEach((b) => { const on = b.dataset.route === name || (BACK_TO[name] && b.dataset.route === BACK_TO[name]); if (on) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
    backBtn.hidden = !BACK_TO[name];
    backBtn.onclick = () => go(BACK_TO[name]);
    updateLevelChip();
    updateGoalChip();
    main.replaceChildren();
    window.scrollTo(0, 0);
    try { await routes[name](...route.args); }
    catch (e) {
      console.error(e);
      main.replaceChildren(el("div", { class: "card center" }, el("h2", null, "Bir şey ters gitti"), el("p", { class: "muted" }, "İçerik yüklenemedi. İnternet bağlantını kontrol edip tekrar dene."), el("button", { class: "btn", onclick: () => render() }, "Tekrar dene")));
    }
    main.focus({ preventScroll: true });
  };
  window.addEventListener("hashchange", render);
  nav.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => go(b.dataset.route)));
  const setTitle = (t) => { titleEl.textContent = t; document.title = t === "AIHEAR English" ? t : t + " · AIHEAR English"; };
  const currentLevelForChip = () => (route.name === "lesson" && LEVELS.includes(route.args[1]) ? route.args[1] : state.level);
  function updateLevelChip() { levelChip.textContent = currentLevelForChip(); levelChip.setAttribute("aria-label", "Seviye: " + currentLevelForChip() + ". Değiştir"); }
  function updateGoalChip() {
    const today = state.activity[dateKey()] || 0, goal = state.settings.goal;
    goalChip.replaceChildren(icon("flame"), el("span", null, String(streakNow())));
    goalChip.classList.toggle("hit", today >= goal);
    goalChip.setAttribute("aria-label", streakNow() + " gün seri. Bugün " + today + "/" + goal + " puan");
  }
  goalChip.addEventListener("click", () => go("progress"));
  levelChip.addEventListener("click", () => openLevelSheet());

  function openLevelSheet() {
    const cur = currentLevelForChip();
    const list = el("div", { class: "levels" }, LEVELS.map((L) => el("button", { class: "level-opt", "aria-pressed": String(L === cur), onclick: () => { close(); setLevel(L); } },
      el("span", { class: "lv" }, L),
      el("span", { class: "lt" }, el("b", null, LEVEL_INFO[L].name), el("span", null, LEVEL_INFO[L].desc)),
      el("span", { class: "lc" }, doneAt(L) + "/" + ORDER.length))));
    const close = sheet("Seviye seç", el("div", { class: "stack" },
      el("p", { class: "muted small" }, route.name === "lesson" ? "Bu ders seçtiğin seviyede yeniden açılır. Aynı hikâye, farklı İngilizce." : "Tüm dersler seçtiğin seviyede gösterilir. İstediğin zaman değiştirebilirsin."),
      list,
      el("button", { class: "btn ghost wide", onclick: () => { close(); go("placement"); } }, icon("target"), "Seviye testini yap")));
  }
  function setLevel(L) {
    if (!LEVELS.includes(L)) return;
    state.level = L; save();
    loadLevel(L).catch(() => {});
    if (route.name === "lesson") go("lesson/" + route.args[0] + "/" + L);
    else render();
    toast("Seviye: " + L + " · " + LEVEL_INFO[L].name);
  }

  /* ================= Karşılama ve seviye testi ================= */
  routes.welcome = (step) => {
    setTitle("AIHEAR English");
    const steps = ["hello", "name", "level", "goal"];
    const at = steps.includes(step) ? step : "hello";
    const dots = el("div", { class: "dots", "aria-hidden": "true" }, steps.map((s) => el("i", { class: s === at ? "on" : "" })));
    const wrap = el("section", { class: "onboard" });
    main.append(wrap);
    if (at === "hello") {
      wrap.append(
        el("div", { class: "ob-art", "aria-hidden": "true" }, el("span", { class: "logo-xl", html: '<svg viewBox="0 0 64 64"><defs><linearGradient id="og" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b5bfd"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs><rect width="64" height="64" rx="18" fill="url(#og)"/><g stroke="#fff" stroke-width="5" stroke-linecap="round"><path d="M16 27v10"/><path d="M24 19v26"/><path d="M32 24v16"/><path d="M40 29v6"/><path d="M48 26v12"/></g></svg>' })),
        el("h1", { class: "ob-title" }, "İngilizceyi kendi işinle öğren."),
        el("p", { class: "ob-sub" }, "Yatırımcı sunumu, ürün demosu, yurt dışında hayat. Her ders A1'den C2'ye altı seviyede, disleksi dostu bir arayüzle."),
        el("ul", { class: "ob-list" },
          el("li", null, icon("book"), "32 ders, 9 konu, her biri 6 seviyede"),
          el("li", null, icon("speaker"), "Her cümle sesli, okurken kelime kelime vurgulu"),
          el("li", null, icon("cards"), "Unutmaya yaklaştığın kelimeler tekrar gelir")),
        el("button", { class: "btn wide", onclick: () => go("welcome/name") }, "Başlayalım", icon("next")),
        dots);
    } else if (at === "name") {
      const inp = el("input", { class: "text big", id: "ob-name", type: "text", autocomplete: "given-name", placeholder: "Adın", value: state.settings.name, maxlength: "30" });
      const next = () => { state.settings.name = inp.value.replace(/[^\p{L}\p{M} '-]/gu, "").trim(); save(); go("welcome/level"); };
      inp.addEventListener("keydown", (e) => { if (e.key === "Enter") next(); });
      wrap.append(el("h1", { class: "ob-title" }, "Sana nasıl hitap edelim?"), el("p", { class: "ob-sub" }, "Adın derslerde senin repliklerinde geçer: “Hi, I'm …”"), el("label", { class: "sr-only", for: "ob-name" }, "Adın"), inp, el("button", { class: "btn wide", onclick: next }, "Devam", icon("next")), el("button", { class: "btn ghost wide", onclick: () => go("welcome/level") }, "Atla"), dots);
      setTimeout(() => inp.focus(), 50);
    } else if (at === "level") {
      wrap.append(el("h1", { class: "ob-title" }, "İngilizce seviyen ne?"), el("p", { class: "ob-sub" }, "Emin değilsen 2 dakikalık testi yap. Seviyeni sonra her an değiştirebilirsin."),
        el("button", { class: "btn wide", onclick: () => go("placement/welcome") }, icon("target"), "Seviye testini yap"),
        el("div", { class: "levels" }, LEVELS.map((L) => el("button", { class: "level-opt", "aria-pressed": String(L === state.level), onclick: () => { state.level = L; save(); go("welcome/goal"); } },
          el("span", { class: "lv" }, L), el("span", { class: "lt" }, el("b", null, LEVEL_INFO[L].name), el("span", null, LEVEL_INFO[L].desc))))),
        dots);
    } else {
      const opts = [[10, "Rahat", "Günde ~5 dakika"], [20, "Düzenli", "Günde ~10 dakika"], [40, "Yoğun", "Günde ~20 dakika"]];
      wrap.append(el("h1", { class: "ob-title" }, "Günlük hedefin?"), el("p", { class: "ob-sub" }, "Kısa ve her gün, uzun ve ara sıra çalışmaktan daha etkilidir."),
        el("div", { class: "levels" }, opts.map(([v, t, d]) => el("button", { class: "level-opt", "aria-pressed": String(state.settings.goal === v), onclick: () => { state.settings.goal = v; state.onboarded = true; save(); loadLevel(state.level).catch(() => {}); go("home"); } },
          el("span", { class: "lv" }, String(v)), el("span", { class: "lt" }, el("b", null, t), el("span", null, d + " · " + v + " puan"))))),
        dots);
    }
  };

  routes.placement = (from) => {
    setTitle("Seviye testi");
    let li = 0, qi = 0, correctInLevel = 0, passed = -1, answered = 0;
    const total = PLACEMENT.reduce((n, g) => n + g.items.length, 0);
    const wrap = el("section", { class: "stack" });
    main.append(wrap);
    const finish = () => {
      const rec = LEVELS[Math.max(0, passed)];
      state.placement = { level: rec, date: dateKey() }; save();
      wrap.replaceChildren(el("div", { class: "card center result" },
        el("p", { class: "eyebrow" }, "Önerilen seviye"),
        el("div", { class: "lv-big" }, rec),
        el("h2", null, LEVEL_INFO[rec].name),
        el("p", { class: "muted" }, LEVEL_INFO[rec].desc),
        el("p", { class: "small muted" }, "Rahat okuyabileceğin seviyeyi öneriyoruz. Zor gelirse bir alta, kolay gelirse bir üste geçersin."),
        el("button", { class: "btn wide", onclick: () => { state.level = rec; save(); go(from === "welcome" ? "welcome/goal" : "home"); } }, rec + " ile başla"),
        el("button", { class: "btn ghost wide", onclick: () => go(from === "welcome" ? "welcome/level" : "home") }, "Kendim seçeyim")));
    };
    const show = () => {
      const group = PLACEMENT[li], item = group.items[qi];
      const opts = el("div", { class: "options" });
      wrap.replaceChildren(
        el("div", { class: "row between small muted" }, el("span", null, "Soru " + (answered + 1)), el("span", null, "Emin değilsen atla, sorun değil.")),
        el("div", { class: "progressbar" }, el("i", { style: "width:" + Math.round((answered / total) * 100) + "%" })),
        el("div", { class: "card" }, el("h2", { class: "q" }, item.q), opts,
          el("button", { class: "btn ghost small", onclick: () => answer(-1) }, "Bilmiyorum")));
      item.options.forEach((o, i) => opts.append(el("button", { class: "option", onclick: () => answer(i) }, o)));
    };
    const answer = (i) => {
      const group = PLACEMENT[li];
      if (i === group.items[qi].a) correctInLevel++;
      answered++; qi++;
      if (qi >= group.items.length) {
        if (correctInLevel >= 2) passed = li; else { finish(); return; }
        li++; qi = 0; correctInLevel = 0;
        if (li >= PLACEMENT.length) { finish(); return; }
      }
      show();
    };
    show();
  };

  /* ================= Ana sayfa ================= */
  const ring = (value, max, size) => {
    const r = 26, c = 2 * Math.PI * r, p = Math.min(1, value / max);
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 64 64"); s.setAttribute("width", size); s.setAttribute("height", size); s.setAttribute("class", "ring"); s.setAttribute("aria-hidden", "true");
    s.innerHTML = '<circle cx="32" cy="32" r="' + r + '" class="ring-bg"/><circle cx="32" cy="32" r="' + r + '" class="ring-fg" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - p)).toFixed(1) + '" transform="rotate(-90 32 32)"/>';
    return s;
  };
  const lessonSuggestion = () => {
    const recent = Object.entries(state.done).filter(([k, d]) => d.complete && k.endsWith("@" + state.level) && d.pct != null).sort((a, b) => (b[1].ts || 0) - (a[1].ts || 0)).slice(0, 3);
    if (recent.length >= 3 && recent.every(([, d]) => d.pct >= 0.9) && state.level !== "C2") return "up";
    if (recent.length >= 2 && recent.slice(0, 2).every(([, d]) => d.pct < 0.5) && state.level !== "A1") return "down";
    return null;
  };
  routes.home = () => {
    setTitle("AIHEAR English");
    const L = state.level, done = doneAt(L), nextId = nextLesson(L) || ORDER[0], m = meta(nextId), t = topic(m.topic);
    const due = SRS.due().length, today = state.activity[dateKey()] || 0, goal = state.settings.goal;
    const h = new Date().getHours();
    const greet = (h < 5 ? "İyi geceler" : h < 12 ? "Günaydın" : h < 18 ? "İyi günler" : "İyi akşamlar") + (state.settings.name ? ", " + state.settings.name : "") + ".";
    const sug = lessonSuggestion();
    main.append(
      el("section", { class: "hero" }, el("p", { class: "eyebrow" }, new Date().toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" })), el("h1", null, greet)),
      el("section", { class: "card goal" },
        el("div", { class: "goal-ring" }, ring(today, goal, 72), el("span", { class: "goal-num" }, String(Math.min(today, 999)))),
        el("div", { class: "goal-text" },
          el("b", null, today >= goal ? "Bugünkü hedef tamam" : "Bugün " + (goal - today) + " puan kaldı"),
          el("span", { class: "muted small" }, "Hedef " + goal + " puan · " + streakNow() + " gün seri"),
          el("button", { class: "linkbtn", onclick: () => go("progress") }, "İlerlemeni gör"))),
      sug ? el("section", { class: "card nudge" }, el("div", { class: "row" }, icon(sug === "up" ? "up" : "down", "nudge-ic"), el("b", null, sug === "up" ? "Bu seviye sana kolay gelmeye başladı." : "Son dersler zorlamış olabilir.")),
        el("p", { class: "muted small" }, sug === "up" ? "Son üç dersi %90'ın üstünde bitirdin. " + levelUp(L) + " seviyesini denemeye ne dersin?" : levelDown(L) + " seviyesinde aynı dersleri daha rahat okuyabilirsin. Sıkılmak yerine akışta kalmak daha verimli."),
        el("div", { class: "row" }, el("button", { class: "btn small", onclick: () => setLevel(sug === "up" ? levelUp(L) : levelDown(L)) }, (sug === "up" ? levelUp(L) : levelDown(L)) + " seviyesine geç"))) : null,
      el("section", { class: "card primary" },
        el("div", { class: "row between" }, el("p", { class: "eyebrow" }, done === ORDER.length ? "Bu seviye bitti, tekrar et" : "Sıradaki ders"), el("span", { class: "pill" }, L + " · ~" + LEVEL_INFO[L].minutes + " dk")),
        el("h2", null, m.title),
        el("p", { class: "muted" }, m.titleTr),
        el("div", { class: "row" }, el("span", { class: "pill" }, t.short)),
        el("button", { class: "btn wide", onclick: () => go("lesson/" + nextId + "/" + L) }, "Derse başla", icon("next"))),
      el("section", { class: "grid2" },
        el("button", { class: "tile", onclick: () => go(due ? "review" : "words") },
          el("span", { class: "tile-ic" }, icon("cards")), el("b", null, due ? due + " kelime" : "Kelimeler"), el("span", { class: "muted small" }, due ? "tekrar bekliyor" : Object.keys(state.srs).length + " kelime listende")),
        el("button", { class: "tile", onclick: () => openLevelSheet() },
          el("span", { class: "tile-ic" }, el("b", { class: "lvmini" }, L)), el("b", null, LEVEL_INFO[L].name), el("span", { class: "muted small" }, done + "/" + ORDER.length + " ders bitti"))),
      el("section", { class: "card flat" },
        el("div", { class: "row between" }, el("p", { class: "eyebrow" }, L + " seviyesinde ilerleme"), el("span", { class: "small muted tnum" }, Math.round((done / ORDER.length) * 100) + "%")),
        el("div", { class: "progressbar" }, el("i", { style: "width:" + Math.round((done / ORDER.length) * 100) + "%" })),
        el("div", { class: "topics" }, CATALOG.topics.map((tp) => {
          const ids = ORDER.filter((id) => meta(id).topic === tp.id); const d = ids.filter((id) => isDone(id, L)).length;
          return el("button", { class: "topic-row", onclick: () => { listFilter = tp.id; go("lessons"); } }, el("i", { class: "dot", style: "background:" + tp.color }), el("span", { class: "tname" }, tp.name), el("span", { class: "muted tnum" }, d + "/" + ids.length));
        })))
    );
  };

  /* ================= Ders listesi ================= */
  let listFilter = "all";
  routes.lessons = () => {
    setTitle("Dersler");
    const L = state.level;
    const tabs = el("div", { class: "segbar", role: "tablist", "aria-label": "Seviye" }, LEVELS.map((x) => el("button", { role: "tab", "aria-selected": String(x === L), onclick: () => setLevel(x) }, x)));
    const chips = el("div", { class: "chips", role: "group", "aria-label": "Konu" });
    const mk = (id, label) => el("button", { class: "chip", "aria-pressed": String(listFilter === id), onclick: () => { listFilter = id; render(); } }, label);
    chips.append(mk("all", "Tümü"), ...CATALOG.topics.map((t) => mk(t.id, t.short)));
    const list = el("div", { class: "stack" });
    ORDER.forEach((id, i) => {
      const m = meta(id); if (listFilter !== "all" && m.topic !== listFilter) return;
      const t = topic(m.topic), d = isDone(id, L);
      list.append(el("button", { class: "lesson-item" + (d ? " done" : ""), onclick: () => go("lesson/" + id + "/" + L) },
        el("span", { class: "num", style: "background:" + t.color }, d ? icon("check") : String(i + 1)),
        el("span", { class: "t" }, el("b", null, m.title), el("span", null, m.titleTr),
          el("span", { class: "meta" }, t.short + " · ~" + LEVEL_INFO[L].minutes + " dk",
            el("span", { class: "lvdots", "aria-label": "Bitirilen seviyeler" }, LEVELS.map((x) => el("i", { class: isDone(id, x) ? "on" : "", title: x }))))),
        icon("next", "chev")));
    });
    main.append(
      el("div", { class: "stack tight" }, tabs, el("p", { class: "small muted" }, L + " · " + LEVEL_INFO[L].name + ": " + LEVEL_INFO[L].desc)),
      chips, list);
  };

  /* ================= Ders ================= */
  const vocabPatterns = (vocab) => vocab.map((v) => {
    const base = String(v.en).replace(/\(.*?\)/g, " ").split("/")[0].replace(/\b(sb|sth|someone|something|one's)\b/gi, " ").replace(/[^A-Za-z' -]/g, " ").trim();
    const words = base.split(/\s+/).filter(Boolean);
    if (!words.length) return null;
    const re = words.map((w) => { const stem = w.length > 4 ? w.replace(/(ies|es|s|ed|ing|e|y)$/i, "") : w; return stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[a-z']*"; }).join("[\\s-]+");
    try { return { v, re: new RegExp("\\b" + re, "gi") }; } catch (e) { return null; }
  }).filter(Boolean);
  // Cümleyi kelime kutularına böl, ders kelimelerini işaretle (okurken vurgulama için)
  const wordSpans = (text, pats, onGloss) => {
    const ranges = [];
    pats.forEach((p) => { p.re.lastIndex = 0; let m; while ((m = p.re.exec(text))) { ranges.push([m.index, m.index + m[0].length, p.v]); if (!m[0].length) p.re.lastIndex++; } });
    const frag = el("span", { class: "en" });
    const spans = [];
    // Words only: punctuation stays outside the boxes so highlights end at the letter.
    const re = /[A-Za-z0-9\u00C0-\u024F€$£%]+(?:['’\-.,][A-Za-z0-9\u00C0-\u024F]+)*/g; let m, last = 0;
    while ((m = re.exec(text))) {
      if (m.index > last) frag.append(text.slice(last, m.index));
      const start = m.index, end = start + m[0].length;
      const hit = ranges.find((r) => start < r[1] && end > r[0]);
      const s = el("span", { class: "w" + (hit ? " hl" : "") }, m[0]);
      s.dataset.s = start; s.dataset.e = end;
      if (hit && onGloss) { s.setAttribute("role", "button"); s.setAttribute("tabindex", "0"); s.addEventListener("click", (e) => { e.stopPropagation(); onGloss(hit[2]); }); }
      frag.append(s); spans.push(s); last = end;
    }
    if (last < text.length) frag.append(text.slice(last));
    return { node: frag, spans };
  };
  const karaoke = (spans) => (idx) => { spans.forEach((s) => s.classList.toggle("now", idx >= +s.dataset.s && idx < +s.dataset.e)); };
  const clearKaraoke = (spans) => spans.forEach((s) => s.classList.remove("now"));

  routes.lesson = async (id, lv) => {
    const m = meta(id);
    if (!m) { go("lessons"); return; }
    const L = LEVELS.includes(lv) ? lv : state.level;
    setTitle(m.title);
    main.append(el("div", { class: "card center" }, el("div", { class: "spinner", "aria-hidden": "true" }), el("p", { class: "muted" }, "Ders hazırlanıyor…")));
    await loadLevel(L);
    if (route.name !== "lesson" || route.args[0] !== id) return;
    main.replaceChildren();
    const V = variant(id, L);
    const t = topic(m.topic);
    const key = doneKey(id, L);
    const prog = state.done[key] || (state.done[key] = { steps: {}, complete: false });
    prog.steps = prog.steps || {};
    const score = { quiz: 0, quizTotal: V.questions.length, use: 0, useTotal: V.gaps.length + V.order.length + V.translate.length, talk: 0, talkTotal: V.roleplay.turns.length };
    let step = 1;
    const pats = vocabPatterns(V.vocab);
    const gloss = (v) => { TTS.speak(v.en, { level: L, silent: true }); toast(v.en + " · " + v.tr); };

    const header = el("header", { class: "lesson-head" },
      el("div", { class: "row" },
        el("span", { class: "pill topic", style: "background:" + t.color }, t.short),
        el("button", { class: "pill level as-btn", onclick: () => openLevelSheet(), "aria-label": "Seviye " + L + ". Değiştir" }, L + " · " + LEVEL_INFO[L].name),
        el("span", { class: "pill" }, "~" + LEVEL_INFO[L].minutes + " dk")),
      el("h1", null, m.title), el("p", { class: "muted" }, m.titleTr));
    const names = ["Metin", "Kelimeler", "Anlama", "Kullanım", "Konuşma"];
    const steps = el("nav", { class: "steps", "aria-label": "Ders adımları" }, names.map((n, i) => el("button", { class: prog.steps[i + 1] ? "ok" : "", onclick: () => goStep(i + 1) }, el("b", null, prog.steps[i + 1] ? "✓" : String(i + 1)), el("span", null, n))));
    const body = el("div", { class: "stack", id: "stepbody" });
    main.append(header, steps, body);

    const markStep = (n) => { if (!prog.steps[n]) { prog.steps[n] = true; save(); } const b = steps.children[n - 1]; b.classList.add("ok"); b.firstChild.textContent = "✓"; };
    const goStep = (n) => { step = n; TTS.stop(); [...steps.children].forEach((b, i) => { if (i + 1 === step) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); }); body.replaceChildren(); ({ 1: stepText, 2: stepVocab, 3: stepQuiz, 4: stepUse, 5: stepTalk })[n](); const y = steps.getBoundingClientRect().top + window.scrollY - 72; if (window.scrollY > y) window.scrollTo({ top: y, behavior: "smooth" }); };
    const nextBtn = (label, n, after) => el("button", { class: "btn wide", onclick: () => { markStep(n); if (after) after(); goStep(n + 1); } }, label, icon("next"));
    const whoLabel = (w) => (w === "Me" ? (state.settings.name || "Sen") : w);

    // 1) Metin
    function stepText() {
      let showTr = state.settings.showTr, focus = false, fi = 0, playing = false;
      const cards = V.text.map((s, i) => {
        const ws = wordSpans(s.en, pats, gloss);
        const tr = el("p", { class: "tr", hidden: !showTr }, s.tr);
        const card = el("article", { class: "sentence" },
          el("div", { class: "body", onclick: () => { tr.hidden = !tr.hidden; } }, s.who ? el("div", { class: "who" }, whoLabel(s.who)) : null, ws.node, tr),
          el("button", { class: "iconbtn", "aria-label": "Cümleyi dinle", onclick: () => playOne(i) }, icon("speaker")));
        card._spans = ws.spans; card._tr = tr;
        return card;
      });
      const list = el("div", { class: "stack" }, cards);
      async function playOne(i, node) {
        const c = node || cards[i];
        cards.forEach((x) => x.classList.remove("speaking"));
        c.classList.add("speaking");
        const spans = c._spans;
        const ok = await TTS.speak(V.text[i].en, { level: L, onWord: state.settings.karaoke ? karaoke(spans) : null });
        clearKaraoke(spans); c.classList.remove("speaking");
        return ok;
      }
      const allBtn = el("button", { class: "btn secondary small", onclick: async () => {
        if (playing) { playing = false; TTS.stop(); return; }
        playing = true; allBtn.replaceChildren(icon("stop"), "Durdur");
        if (focus) { for (; fi < V.text.length && playing; fi++) { drawFocus(); if (!(await playOne(fi, focusCard))) break; if (fi < V.text.length - 1) await new Promise((r) => setTimeout(r, 350)); } fi = Math.min(fi, V.text.length - 1); drawFocus(); }
        else for (let i = 0; i < cards.length && playing; i++) { cards[i].scrollIntoView({ block: "center", behavior: "smooth" }); if (!(await playOne(i))) break; }
        playing = false; allBtn.replaceChildren(icon("speaker"), "Hepsini dinle");
      } }, icon("speaker"), "Hepsini dinle");
      const trBtn = el("button", { class: "btn ghost small", "aria-pressed": String(showTr), onclick: () => { showTr = !showTr; trBtn.setAttribute("aria-pressed", String(showTr)); cards.forEach((c) => { c._tr.hidden = !showTr; }); if (focus) drawFocus(); } }, icon("eye"), "Türkçe");
      const focusBtn = el("button", { class: "btn ghost small", "aria-pressed": "false", onclick: () => { focus = !focus; focusBtn.setAttribute("aria-pressed", String(focus)); focusBtn.replaceChildren(icon(focus ? "list" : "focus"), focus ? "Liste" : "Odak"); TTS.stop(); playing = false; allBtn.replaceChildren(icon("speaker"), "Hepsini dinle"); list.hidden = focus; focusWrap.hidden = !focus; if (focus) drawFocus(); } }, icon("focus"), "Odak");
      let focusCard = null;
      const focusWrap = el("div", { class: "focus", hidden: true });
      function drawFocus() {
        const s = V.text[fi];
        const ws = wordSpans(s.en, pats, gloss);
        const tr = el("p", { class: "tr", hidden: !showTr }, s.tr);
        focusCard = el("article", { class: "sentence big" }, el("div", { class: "body", onclick: () => { tr.hidden = !tr.hidden; } }, s.who ? el("div", { class: "who" }, whoLabel(s.who)) : null, ws.node, tr));
        focusCard._spans = ws.spans;
        focusWrap.replaceChildren(
          el("div", { class: "row between small muted" }, el("span", null, "Cümle " + (fi + 1) + " / " + V.text.length), el("span", null, "Dokun: Türkçesi")),
          el("div", { class: "progressbar thin" }, el("i", { style: "width:" + Math.round(((fi + 1) / V.text.length) * 100) + "%" })),
          focusCard,
          el("div", { class: "focus-nav" },
            el("button", { class: "btn ghost", disabled: fi === 0, onclick: () => { TTS.stop(); fi--; drawFocus(); if (state.settings.autoSpeak) playOne(fi, focusCard); } }, icon("back"), "Önceki"),
            el("button", { class: "iconbtn big", "aria-label": "Dinle", onclick: () => playOne(fi, focusCard) }, icon("speaker")),
            el("button", { class: "btn ghost", disabled: fi === V.text.length - 1, onclick: () => { TTS.stop(); fi++; drawFocus(); if (state.settings.autoSpeak) playOne(fi, focusCard); } }, "Sonraki", icon("next"))));
      }
      const easier = L !== "A1" ? el("button", { class: "btn ghost small", onclick: () => go("lesson/" + id + "/" + levelDown(L)) }, icon("down"), "Daha kolay: " + levelDown(L)) : null;
      const harder = L !== "C2" ? el("button", { class: "btn ghost small", onclick: () => go("lesson/" + id + "/" + levelUp(L)) }, icon("up"), "Daha zor: " + levelUp(L)) : null;
      body.append(
        el("p", { class: "intro" }, V.intro),
        el("div", { class: "toolbar" }, allBtn, trBtn, focusBtn),
        el("p", { class: "small muted" }, "Cümleye dokun: Türkçesi açılır. Renkli kelimeye dokun: anlamı ve okunuşu."),
        list, focusWrap,
        el("div", { class: "card flat diff" }, el("p", { class: "small" }, el("b", null, "Zorluk uygun mu? "), "Aynı metni başka seviyede oku."), el("div", { class: "row" }, easier, harder)),
        nextBtn("Kelimelere geç", 1, () => addXp(prog.steps[1] ? 0 : 5)));
    }

    // 2) Kelimeler + dil yapısı
    function stepVocab() {
      body.append(el("p", { class: "intro" }, "Bu metnin kalıpları. Hepsi kelime listene eklenir; bildiklerini işaretle, daha seyrek gelir."));
      V.vocab.forEach((v) => {
        const st = SRS.status(v.en);
        const knowBtn = el("button", { class: "btn ghost small", disabled: st === "known", onclick: () => { SRS.add(v.en, { tr: v.tr, ex: v.ex, def: v.def, lesson: id, level: L }); const w = state.srs[v.en]; w.reps = 2; w.interval = 7; w.due = Date.now() + 7 * DAY; save(); knowBtn.textContent = "Biliyorsun"; knowBtn.disabled = true; haptic(); } }, st === "known" ? "Biliyorsun" : "Biliyorum");
        body.append(el("article", { class: "vocab" },
          el("div", { class: "stack tight" },
            st !== "new" ? el("span", { class: "seen " + st }, st === "known" ? "Biliyorsun" : "Daha önce gördün") : null,
            el("div", { class: "en" }, v.en), el("div", { class: "tr" }, v.tr),
            v.def ? el("div", { class: "def" }, v.def) : null,
            el("div", { class: "ex" }, "“" + v.ex + "”"),
            el("div", { class: "row" }, knowBtn)),
          el("button", { class: "iconbtn", "aria-label": v.en + " dinle", onclick: () => TTS.speak(v.en + ". " + v.ex, { level: L }) }, icon("speaker"))));
      });
      const g = V.grammar;
      body.append(el("section", { class: "card grammar" },
        el("p", { class: "eyebrow" }, "Dil yapısı"),
        el("h3", null, g.title), el("p", null, g.tr),
        el("ul", { class: "examples" }, g.examples.map((x) => el("li", null, el("button", { class: "iconbtn small", "aria-label": "Dinle", onclick: () => TTS.speak(x, { level: L }) }, icon("speaker")), el("span", null, x))))));
      body.append(nextBtn("Kelimeleri ekle ve devam et", 2, () => { let added = 0; V.vocab.forEach((v) => { if (SRS.add(v.en, { tr: v.tr, ex: v.ex, def: v.def, lesson: id, level: L })) added++; }); save(); addXp(prog.steps[2] ? 0 : 5); if (added) toast(added + " kelime listene eklendi"); }));
    }

    // 3) Anlama
    function stepQuiz() {
      let answered = 0; score.quiz = 0;
      const result = el("div", { class: "stack", "aria-live": "polite" });
      body.append(el("p", { class: "intro" }, "Metni hatırla ve doğru cevabı seç. Emin değilsen metne dönebilirsin."));
      V.questions.forEach((q, qi) => {
        const opts = el("div", { class: "options" });
        const fb = el("div", { "aria-live": "polite" });
        body.append(el("article", { class: "card" },
          el("div", { class: "qhead" }, el("h3", null, (qi + 1) + ". " + q.q), el("button", { class: "iconbtn", "aria-label": "Soruyu dinle", onclick: () => TTS.speak(q.q, { level: L }) }, icon("speaker"))), opts, fb));
        q.options.forEach((o, oi) => opts.append(el("button", { class: "option", onclick: (e) => {
          [...opts.children].forEach((x) => { x.disabled = true; });
          answered++;
          if (oi === q.a) { e.currentTarget.classList.add("correct"); score.quiz++; haptic(); fb.replaceChildren(el("div", { class: "feedback good" }, "Doğru!")); }
          else { e.currentTarget.classList.add("wrong"); opts.children[q.a].classList.add("correct"); fb.replaceChildren(el("div", { class: "feedback bad" }, "Doğru cevap: " + q.options[q.a])); }
          if (answered === V.questions.length) finish();
        } }, o)));
      });
      body.append(result);
      function finish() {
        const n = V.questions.length;
        if (!prog.steps[3]) addXp(score.quiz * 3);
        result.append(el("div", { class: "card center" }, el("div", { class: "score-big" }, score.quiz + "/" + n),
          el("p", { class: "muted" }, score.quiz === n ? "Mükemmel, metni tamamen anlamışsın." : score.quiz >= n / 2 ? "İyi. Yanlışlara metinde bir kez daha bak." : "Bu metin zor gelmiş olabilir. İstersen " + levelDown(L) + " seviyesinde oku."),
          nextBtn("Kullanıma geç", 3)));
        result.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // 4) Aktif kullanım
    function stepUse() {
      score.use = 0;
      const showChoices = state.settings.choices === "on" || (state.settings.choices === "auto" && levelIdx(L) <= 2);
      const credit = () => { score.use++; haptic(); };
      body.append(el("p", { class: "intro" }, "Üç alıştırma: boşluk doldur, cümle kur, Türkçeden İngilizceye çevir. Küçük yazım hataları sorun değil."));
      // A · boşluk
      const pool = V.vocab.map((v) => v.en.replace(/\(.*?\)/g, "").split("/")[0].trim());
      const gapSec = el("section", { class: "card" }, el("p", { class: "eyebrow" }, "A · Boşluğu doldur"));
      V.gaps.forEach((g, gi) => {
        const inp = el("input", { class: "gap-input", id: "gap-" + gi, type: "text", autocapitalize: "off", autocomplete: "off", spellcheck: "false", placeholder: "İpucu: " + g.hint, "aria-label": "Boşluk " + (gi + 1) });
        const fb = el("div", { "aria-live": "polite" });
        let solved = false, tries = 0;
        const check = (val) => {
          if (solved) return;
          const v = norm(val != null ? val : inp.value), a = norm(g.a);
          if (!v) return;
          tries++;
          if (v === a || close(v, a)) {
            solved = true; inp.value = g.a; inp.disabled = true; btn.disabled = true; choices.querySelectorAll("button").forEach((b) => { b.disabled = true; if (norm(b.textContent) === a) b.classList.add("correct"); });
            if (tries === 1) credit();
            fb.replaceChildren(el("div", { class: "feedback good" }, v === a ? "Doğru: " + g.a : "Neredeyse! Doğru yazılışı: " + g.a));
            TTS.speak(g.s.replace("___", g.a), { level: L, silent: true });
          } else fb.replaceChildren(el("div", { class: "feedback bad" }, tries >= 2 ? "Cevap: " + g.a + ". Yazıp devam et." : "Tekrar dene. " + g.a.length + " harf, “" + g.a[0] + "” ile başlıyor."));
        };
        const btn = el("button", { class: "btn small secondary", onclick: () => check() }, "Kontrol");
        inp.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
        const distract = shuffle(pool.concat(V.gaps.map((x) => x.a)).filter((w) => norm(w) !== norm(g.a) && Math.abs(w.split(" ").length - g.a.split(" ").length) <= 1)).filter((w, i, arr) => arr.findIndex((x) => norm(x) === norm(w)) === i).slice(0, 2);
        const choices = el("div", { class: "choice-row", hidden: !showChoices }, shuffle([g.a].concat(distract)).map((w) => el("button", { class: "choice", onclick: (e) => { inp.value = w; check(w); if (!solved) e.currentTarget.classList.add("wrong"); } }, w)));
        const toggle = el("button", { class: "linkbtn", hidden: showChoices, onclick: () => { choices.hidden = false; toggle.hidden = true; } }, "Seçenekleri göster");
        gapSec.append(el("div", { class: "stack tight gap" }, el("p", { class: "gap-sentence", html: g.s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])).replace("___", "<b>_____</b>") }), choices, el("div", { class: "row nowrap" }, inp, btn), toggle, fb));
      });
      body.append(gapSec);
      // B · sıralama
      const orderSec = el("section", { class: "card" }, el("p", { class: "eyebrow" }, "B · Kelimeleri sıraya koy"), el("p", { class: "small muted" }, "Kelimelere sırayla dokun. Yanlış koyduğuna dokunursan geri gelir."));
      V.order.forEach((o) => {
        const words = o.a.replace(/[.?!]/g, "").split(/\s+/);
        const built = el("div", { class: "built", "aria-label": "Kurduğun cümle" });
        const bank = el("div", { class: "wordbank" });
        const fb = el("div", { "aria-live": "polite" });
        let chosen = [], done = false, wrongOnce = false;
        const bankBtns = shuffle(words.map((text, idx) => ({ text, idx }))).map((w) => {
          const b = el("button", { class: "word", onclick: () => { if (done || chosen.length >= words.length) return; b.classList.add("used"); b.disabled = true; chosen.push({ text: w.text, b }); redraw(); } }, w.text);
          return b;
        });
        bank.append(...bankBtns);
        const redraw = () => {
          built.replaceChildren(...chosen.map((c, i) => el("button", { class: "word", disabled: done, onclick: () => { chosen.splice(i, 1); c.b.classList.remove("used"); c.b.disabled = false; built.classList.remove("no"); redraw(); } }, c.text)));
          if (chosen.length === words.length) {
            if (norm(chosen.map((c) => c.text).join(" ")) === norm(words.join(" "))) { done = true; built.classList.add("ok"); if (!wrongOnce) credit(); fb.replaceChildren(el("div", { class: "feedback good" }, "Doğru: " + o.a)); TTS.speak(o.a, { level: L, silent: true }); built.querySelectorAll("button").forEach((b) => { b.disabled = true; }); }
            else { wrongOnce = true; built.classList.add("no"); fb.replaceChildren(el("div", { class: "feedback bad" }, "Sıra tutmadı. İpucu: cümle “" + words[0] + "” ile başlıyor.")); }
          } else fb.replaceChildren();
        };
        orderSec.append(el("div", { class: "stack tight order" }, built, bank, fb));
      });
      body.append(orderSec);
      // C · çeviri
      const trSec = el("section", { class: "card" }, el("p", { class: "eyebrow" }, "C · Türkçeden İngilizceye"), el("p", { class: "small muted" }, "Birebir aynı olması gerekmez. Önemli kelimeleri kullandıysan kabul edilir. Mikrofonla da cevap verebilirsin."));
      V.translate.forEach((ti, i) => {
        const ta = el("textarea", { class: "answer", id: "tr-" + i, rows: "2", placeholder: "İngilizce yaz…", "aria-label": "Çeviri " + (i + 1) });
        const fb = el("div", { "aria-live": "polite" });
        let credited = false;
        const check = () => {
          if (!norm(ta.value)) return;
          const miss = ti.keys.filter((k) => !hasKey(ta.value, k));
          if (!miss.length) { if (!credited) { credited = true; credit(); } fb.replaceChildren(el("div", { class: "feedback good" }, "Çok iyi. Örnek cevap: " + ti.en)); }
          else fb.replaceChildren(el("div", { class: "feedback info" }, "Yaklaştın. Şunları da kullan: " + miss.join(", ") + ". Örnek: " + ti.en));
          TTS.speak(ti.en, { level: L, silent: true });
        };
        trSec.append(el("div", { class: "stack tight" }, el("p", { class: "gap-sentence" }, ti.tr), el("div", { class: "row nowrap top" }, ta, micButton(ta)), el("button", { class: "btn small secondary", id: "tr-check-" + i, onclick: check }, "Kontrol et"), fb));
      });
      body.append(trSec);
      body.append(nextBtn("Konuşmaya geç", 4, () => { if (!prog.steps[4]) addXp(score.use * 2); }));
    }

    // 5) Konuşma simülasyonu
    function stepTalk() {
      const rp = V.roleplay;
      score.talk = 0;
      const useAI = state.settings.aiMode && state.settings.apiKey;
      const chat = el("div", { class: "chat", "aria-live": "polite" });
      const ta = el("textarea", { class: "answer", id: "talk-input", rows: "2", placeholder: "İngilizce cevap yaz ya da mikrofona bas…", "aria-label": "Cevabın" });
      const hint = el("div", { class: "hintbox", hidden: true });
      const sendBtn = el("button", { class: "btn send", "aria-label": "Gönder", onclick: () => submit() }, icon("send"));
      const composer = el("div", { class: "composer-wrap" }, hint,
        el("div", { class: "composer" }, micButton(ta), ta, sendBtn),
        el("div", { class: "row between" }, el("button", { class: "btn ghost small", onclick: () => { hint.hidden = !hint.hidden; } }, icon("bulb"), "Örnek cevap"), el("span", { class: "small muted" }, STT.ok() ? "Mikrofon ile konuşabilirsin" : "Yazarak cevap ver")));
      body.append(el("div", { class: "card flat scene" }, el("p", { class: "eyebrow" }, "Rol: " + rp.personaTr), el("p", null, rp.scene), el("p", { class: "small muted" }, useAI ? "Canlı yapay zekâ açık: karşındaki kişi cevabına göre konuşur." : "Dersin kalıplarını kullanmaya çalış. Takılırsan “Örnek cevap”a bak.")), chat, composer);
      let turn = 0, busy = false;
      const history = [];
      const say = async (text, tr) => {
        const trEl = tr ? el("div", { class: "tr", hidden: true }, tr) : null;
        const b = el("div", { class: "bubble ai" }, el("div", { class: "who" }, rp.persona), el("div", null, text), trEl,
          el("div", { class: "tools" }, el("button", { onclick: () => TTS.speak(text, { level: L }) }, icon("speaker"), "Dinle"), trEl ? el("button", { onclick: () => { trEl.hidden = !trEl.hidden; } }, "Türkçe") : null));
        chat.append(b); b.scrollIntoView({ behavior: "smooth", block: "nearest" });
        if (state.settings.autoSpeak) await TTS.speak(text, { level: L, silent: true });
      };
      const me = (text) => chat.append(el("div", { class: "bubble me" }, el("div", { class: "who" }, state.settings.name || "Sen"), el("div", null, text)));
      const tip = (text, kind) => { const b = el("div", { class: "bubble tip " + (kind || "") }, text); chat.append(b); b.scrollIntoView({ behavior: "smooth", block: "nearest" }); };
      const showTurn = async () => { const tt = rp.turns[turn]; hint.textContent = "Örnek: " + tt.hint; hint.hidden = true; await say(tt.ai, tt.aiTr); };
      const finish = async (closing) => {
        composer.hidden = true;
        if (closing) await say(closing);
        complete();
      };
      async function submit() {
        const text = ta.value.trim();
        if (!text || busy) return;
        busy = true; ta.value = ""; ta.style.height = ""; me(text); TTS.stop();
        history.push({ role: "user", content: text });
        const tt = rp.turns[turn];
        const hits = tt.keys.filter((k) => hasKey(text, k));
        if (hits.length) { score.talk++; haptic(); }
        if (useAI) {
          sendBtn.disabled = true;
          const typing = el("div", { class: "bubble ai typing", "aria-label": "Yazıyor" }, el("i"), el("i"), el("i"));
          chat.append(typing);
          try {
            const r = await askClaude(m, V, L, history, turn);
            typing.remove();
            history.push({ role: "assistant", content: r.raw });
            if (r.tip) tip(r.tip, hits.length ? "" : "warn");
            turn++;
            if (turn >= rp.turns.length || r.done) await finish(r.reply);
            else { await say(r.reply); hint.textContent = "Örnek: " + rp.turns[turn].hint; hint.hidden = true; }
          } catch (e) { typing.remove(); tip("Yapay zekâ cevap veremedi (" + e.message + "). Hazır senaryoyla devam ediyoruz.", "warn"); history.pop(); await scripted(hits, tt); }
          sendBtn.disabled = false;
        } else await scripted(hits, tt);
        busy = false;
        if (!composer.hidden) ta.focus({ preventScroll: true });
      }
      async function scripted(hits, tt) {
        if (hits.length) tip("Güzel! “" + hits[0] + "” kalıbını kullandın.");
        else tip("Anlaşılır bir cevap. Daha doğal hali: “" + tt.hint + "”", "warn");
        turn++;
        if (turn >= rp.turns.length) await finish(CLOSINGS[L]);
        else await showTurn();
      }
      ta.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } });
      showTurn();

      function complete() {
        markStep(5);
        const got = score.quiz + score.use + score.talk, max = score.quizTotal + score.useTotal + score.talkTotal;
        const pct = max ? got / max : 1;
        const first = !prog.complete;
        prog.complete = true; prog.pct = Math.max(prog.pct || 0, pct); prog.date = dateKey(); prog.ts = Date.now(); save();
        addXp(score.talk * 4 + (first ? 10 : 2));
        const nx = nextLesson(L, id);
        const up = pct >= 0.9 && L !== "C2", down = pct < 0.5 && L !== "A1";
        chat.append(el("div", { class: "card center done-card" },
          el("div", { class: "badge-big" }, icon("trophy")),
          el("p", { class: "eyebrow" }, "Ders tamamlandı"),
          el("div", { class: "score-big" }, Math.round(pct * 100) + "%"),
          el("p", { class: "muted" }, "Anlama " + score.quiz + "/" + score.quizTotal + " · Kullanım " + score.use + "/" + score.useTotal + " · Konuşma " + score.talk + "/" + score.talkTotal),
          up ? el("p", { class: "small" }, "Bu seviye rahat geliyor. Aynı dersi " + levelUp(L) + " seviyesinde denemek ister misin?") : down ? el("p", { class: "small" }, "Zorlandıysan sorun değil. " + levelDown(L) + " seviyesinde aynı hikâye daha akıcı okunur.") : null,
          el("div", { class: "stack tight", style: "width:100%" },
            nx ? el("button", { class: "btn wide", onclick: () => go("lesson/" + nx + "/" + L) }, "Sıradaki ders", icon("next")) : el("button", { class: "btn wide", onclick: () => go("home") }, "Ana sayfa"),
            up ? el("button", { class: "btn secondary wide", onclick: () => go("lesson/" + id + "/" + levelUp(L)) }, icon("up"), levelUp(L) + " seviyesinde oku") : null,
            down ? el("button", { class: "btn secondary wide", onclick: () => go("lesson/" + id + "/" + levelDown(L)) }, icon("down"), levelDown(L) + " seviyesinde oku") : null,
            el("button", { class: "btn ghost wide", onclick: () => goStep(5) }, "Tekrar konuş"))));
        chat.lastChild.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    goStep(1);
  };
  const CLOSINGS = {
    A1: "Thank you! Nice to talk to you. Goodbye!",
    A2: "Thank you, that was very clear. Let's keep in touch!",
    B1: "Thanks, that was really helpful. Let's stay in touch.",
    B2: "That's really useful, thank you. Let's follow up next week.",
    C1: "That's given me a lot to think about. Let's pick this up again soon.",
    C2: "Thank you, that was remarkably clear. I'll be in touch shortly."
  };

  /* ================= Canlı yapay zekâ (isteğe bağlı) ================= */
  const AI_LEVEL = {
    A1: "Use CEFR A1 English: very short sentences (max 8 words), present simple, the most common words only.",
    A2: "Use CEFR A2 English: short sentences (max 12 words), simple past and future, everyday words.",
    B1: "Use CEFR B1 English: clear sentences, common business collocations, no rare idioms.",
    B2: "Use CEFR B2 English: natural business English, some collocations and hedging.",
    C1: "Use CEFR C1 English: fluent, nuanced, idiomatic professional English.",
    C2: "Use CEFR C2 English: sophisticated, native-like, with subtle nuance and the odd idiom."
  };
  async function askClaude(m, V, L, history, turn) {
    const rp = V.roleplay;
    const system = [
      "You are role-playing as: " + rp.persona + ". Scene (in Turkish): " + rp.scene,
      "The learner is a Turkish founder of AIHEAR (an autonomous AI audiometer startup) practising English. They have dyslexia, so keep replies short: at most 2 sentences.",
      AI_LEVEL[L],
      "Stay in character. Keep the conversation going for about " + rp.turns.length + " exchanges in total, then close politely.",
      "Target phrases for this lesson: " + V.vocab.map((v) => v.en).join("; ") + ".",
      "Questions you planned to ask, in order: " + rp.turns.map((t, i) => (i + 1) + ") " + t.ai).join(" ") + " The learner has just answered question " + (turn + 1) + ".",
      "Reply in exactly this format and nothing else:",
      "REPLY: <your in-character English reply, ending with the next question unless the conversation is over>",
      "TIP: <one short Turkish sentence: praise a good phrase, or show a more natural English version of what they said>",
      "DONE: <yes if the conversation should end now, otherwise no>"
    ].join("\n");
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": state.settings.apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true", "anthropic-beta": "server-side-fallback-2026-07-01" },
      body: JSON.stringify({ model: "claude-opus-5-5", max_tokens: 600, system, messages: history, fallbacks: "default", output_config: { effort: "low" } })
    });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error((err.error && err.error.message) || "HTTP " + res.status); }
    const data = await res.json();
    if (data.stop_reason === "refusal") throw new Error("istek reddedildi");
    const raw = (data.content || []).filter((c) => c.type === "text").map((c) => c.text).join("\n").trim();
    const get = (k) => { const mm = raw.match(new RegExp("^\\s*" + k + ":\\s*([\\s\\S]*?)(?=^\\s*(REPLY|TIP|DONE):|$(?![\\s\\S]))", "mi")); return mm ? mm[1].trim() : ""; };
    return { raw, reply: get("REPLY") || raw, tip: get("TIP"), done: /^y/i.test(get("DONE")) };
  }

  /* ================= Kelimeler ================= */
  let wordsFilter = "all", wordsQuery = "";
  routes.words = () => {
    setTitle("Kelimeler");
    const all = Object.keys(state.srs);
    const due = SRS.due().length, known = all.filter((w) => SRS.known(w)).length;
    main.append(
      el("section", { class: "stats" },
        el("div", { class: "stat" }, el("b", null, String(all.length)), el("span", null, "toplam")),
        el("div", { class: "stat" }, el("b", null, String(all.length - known)), el("span", null, "öğreniliyor")),
        el("div", { class: "stat" }, el("b", null, String(known)), el("span", null, "biliyorsun"))),
      el("button", { class: "btn wide", disabled: !all.length, onclick: () => go("review") }, icon("cards"), due ? "Tekrara başla · " + due + " kelime" : "Serbest tekrar"));
    if (!all.length) { main.append(el("div", { class: "card center" }, el("h2", null, "Listen henüz boş"), el("p", { class: "muted" }, "Bir dersin “Kelimeler” adımını bitirdiğinde kelimeler buraya eklenir."), el("button", { class: "btn secondary", onclick: () => go("lessons") }, "Derslere git"))); return; }
    const search = el("input", { class: "text", id: "word-search", type: "search", placeholder: "Kelime ara (İngilizce ya da Türkçe)", value: wordsQuery, "aria-label": "Kelime ara" });
    const chips = el("div", { class: "chips" }, [["all", "Tümü"], ["due", "Tekrar zamanı"], ["learning", "Öğreniliyor"], ["known", "Biliyorum"]].map(([k, t]) => el("button", { class: "chip", "aria-pressed": String(wordsFilter === k), onclick: () => { wordsFilter = k; render(); } }, t)));
    const list = el("div", { class: "wordlist" });
    const draw = () => {
      const q = norm(wordsQuery), now = Date.now();
      const rows = all.filter((w) => {
        const d = state.srs[w];
        if (wordsFilter === "due" && d.due > now) return false;
        if (wordsFilter === "known" && !SRS.known(w)) return false;
        if (wordsFilter === "learning" && SRS.known(w)) return false;
        return !q || norm(w).includes(q) || (d.tr || "").toLowerCase().includes(wordsQuery.toLowerCase());
      }).sort((a, b) => state.srs[a].due - state.srs[b].due);
      list.replaceChildren(...rows.slice(0, 300).map((w) => {
        const d = state.srs[w], st = SRS.status(w);
        return el("div", { class: "wordrow" },
          el("button", { class: "iconbtn small", "aria-label": w + " dinle", onclick: () => TTS.speak(w + ". " + (d.ex || "")) }, icon("speaker")),
          el("div", { class: "wr-t" }, el("b", null, w), el("span", null, d.tr)),
          el("span", { class: "pill " + (st === "known" ? "done" : "") }, (d.level ? d.level + " · " : "") + (st === "known" ? "biliyorsun" : d.due <= now ? "tekrar" : Math.max(1, Math.round((d.due - now) / DAY)) + " gün")));
      }));
      if (!rows.length) list.append(el("p", { class: "muted center" }, "Bu filtreyle kelime yok."));
    };
    search.addEventListener("input", () => { wordsQuery = search.value; draw(); });
    main.append(search, chips, list);
    draw();
  };

  routes.review = () => {
    setTitle("Kelime tekrarı");
    let queue = shuffle(SRS.due()).slice(0, 30);
    if (!queue.length) queue = shuffle(Object.keys(state.srs)).slice(0, 15);
    if (!queue.length) { go("words"); return; }
    let reverse = false, i = 0, correct = 0;
    const total = queue.length;
    const bar = el("div", { class: "progressbar" }, el("i", { style: "width:0%" }));
    const dirBtn = el("button", { class: "btn ghost small", onclick: () => { reverse = !reverse; dirBtn.lastChild.textContent = reverse ? "Türkçe → İngilizce" : "İngilizce → Türkçe"; show(); } }, icon("swap"), el("span", null, "İngilizce → Türkçe"));
    const wrap = el("div", { class: "stack" });
    main.append(el("div", { class: "row between" }, el("span", { class: "small muted" }, "Hatırla, kartı çevir, dürüstçe değerlendir."), dirBtn), bar, wrap);
    const show = () => {
      bar.firstChild.style.width = Math.round((i / total) * 100) + "%";
      if (i >= total) {
        addXp(correct * 2);
        wrap.replaceChildren(el("div", { class: "card center" }, el("div", { class: "score-big" }, correct + "/" + total), el("p", { class: "muted" }, "kelimeyi hatırladın. “Zor” dediklerin 10 dakika sonra yeniden gelir."), el("button", { class: "btn", onclick: () => go("home") }, "Ana sayfa"), el("button", { class: "btn ghost", onclick: () => go("words") }, "Kelime listesi")));
        return;
      }
      const w = queue[i], d = state.srs[w];
      const front = reverse ? d.tr : w;
      const card = el("div", { class: "flash" },
        el("span", { class: "small muted" }, (i + 1) + " / " + total),
        el("div", { class: "front" }, front),
        reverse ? null : el("button", { class: "iconbtn", "aria-label": "Dinle", onclick: () => TTS.speak(w + ". " + (d.ex || "")) }, icon("speaker")));
      const back = el("div", { class: "stack tight center", hidden: true },
        el("div", { class: "back" }, reverse ? w : d.tr),
        d.def ? el("div", { class: "def" }, d.def) : null,
        el("div", { class: "ex" }, d.ex ? "“" + d.ex + "”" : ""));
      card.append(back);
      const rate = el("div", { class: "rate", hidden: true },
        el("button", { class: "hard", onclick: () => { SRS.rate(w, 1); i++; show(); } }, "Zor", el("small", null, "unuttum")),
        el("button", { class: "mid", onclick: () => { SRS.rate(w, 2); correct++; i++; show(); } }, "Orta", el("small", null, "zorlandım")),
        el("button", { class: "easy", onclick: () => { SRS.rate(w, 3); correct++; haptic(); i++; show(); } }, "Kolay", el("small", null, "biliyorum")));
      const flip = el("button", { class: "btn wide secondary", onclick: () => { back.hidden = false; flip.hidden = true; rate.hidden = false; if (reverse || state.settings.autoSpeak) TTS.speak(w, { silent: true }); } }, "Kartı çevir");
      wrap.replaceChildren(card, flip, rate);
      if (!reverse && state.settings.autoSpeak) TTS.speak(w, { silent: true });
    };
    show();
  };

  /* ================= İlerleme ================= */
  const BADGES = [
    { id: "first", t: "İlk adım", d: "İlk dersini bitir", ok: () => lessonsDone() >= 1 },
    { id: "five", t: "Isınma turu", d: "5 ders bitir", ok: () => lessonsDone() >= 5 },
    { id: "twenty", t: "Maratoncu", d: "20 ders bitir", ok: () => lessonsDone() >= 20 },
    { id: "s3", t: "Ritim", d: "3 gün üst üste çalış", ok: () => (state.streak.best || 0) >= 3 },
    { id: "s7", t: "Bir hafta", d: "7 gün üst üste çalış", ok: () => (state.streak.best || 0) >= 7 },
    { id: "w50", t: "Kelime avcısı", d: "50 kelime öğren", ok: () => Object.keys(state.srs).filter((w) => SRS.known(w)).length >= 50 },
    { id: "pitch", t: "Sahneye hazır", d: "Pitch dersini bitir", ok: () => doneAny("in-01") },
    { id: "abroad", t: "Valiz hazır", d: "Yurt dışı derslerinin hepsini bitir", ok: () => ["ab-01", "ab-02", "ab-03", "ab-04"].every(doneAny) },
    { id: "c1", t: "Üst lig", d: "C1 ya da C2'de bir ders bitir", ok: () => ORDER.some((id) => isDone(id, "C1") || isDone(id, "C2")) }
  ];
  routes.progress = () => {
    setTitle("İlerleme");
    const known = Object.keys(state.srs).filter((w) => SRS.known(w)).length;
    const days = Array.from({ length: 14 }, (_, k) => { const t = Date.now() - (13 - k) * DAY; return { k: dateKey(t), d: new Date(t), v: state.activity[dateKey(t)] || 0 }; });
    const max = Math.max(state.settings.goal, ...days.map((x) => x.v)) * 1.15;
    const W = 336, H = 150, pad = 4, padR = 18, bw = (W - pad - padR) / 14;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + (H + 22)); svg.setAttribute("class", "chart"); svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Son 14 günün puanları. Bugün " + days[13].v + " puan.");
    const y = (v) => H - (v / max) * (H - 10);
    let inner = '<line x1="' + pad + '" x2="' + (W - padR) + '" y1="' + y(state.settings.goal).toFixed(1) + '" y2="' + y(state.settings.goal).toFixed(1) + '" class="goal-line"/>';
    inner += '<text x="' + (pad + 2) + '" y="' + (y(state.settings.goal) - 5).toFixed(1) + '" class="axis goal-label" text-anchor="start">hedef ' + state.settings.goal + '</text>';
    days.forEach((x, k) => {
      const h = Math.max(x.v ? 3 : 0, H - y(x.v)), bx = pad + k * bw + 3;
      inner += '<rect x="' + bx.toFixed(1) + '" y="' + (H - h).toFixed(1) + '" width="' + (bw - 6).toFixed(1) + '" height="' + h.toFixed(1) + '" rx="4" class="' + (x.v >= state.settings.goal ? "bar hit" : "bar") + '"><title>' + x.k + ": " + x.v + ' puan</title></rect>';
      if (k % 2 === 1 && k < 13) inner += '<text x="' + (bx + (bw - 6) / 2).toFixed(1) + '" y="' + (H + 16) + '" class="axis" text-anchor="middle">' + x.d.getDate() + "</text>";
      if (k === 13) inner += '<text x="' + (W - 1) + '" y="' + (H + 16) + '" class="axis" text-anchor="end">bugün</text>';
    });
    inner += '<line x1="' + pad + '" x2="' + (W - padR) + '" y1="' + H + '" y2="' + H + '" class="baseline"/>';
    svg.innerHTML = inner;
    main.append(
      el("section", { class: "stats four" },
        el("div", { class: "stat" }, el("b", null, String(streakNow())), el("span", null, "gün seri")),
        el("div", { class: "stat" }, el("b", null, String(state.streak.best || 0)), el("span", null, "rekor")),
        el("div", { class: "stat" }, el("b", null, String(lessonsDone())), el("span", null, "ders")),
        el("div", { class: "stat" }, el("b", null, String(Object.keys(state.srs).length)), el("span", null, "kelime"))),
      el("section", { class: "card" }, el("div", { class: "row between" }, el("p", { class: "eyebrow" }, "Son 14 gün"), el("span", { class: "small muted tnum" }, state.xp + " toplam puan")), el("div", { class: "chart-wrap" }, svg)),
      el("section", { class: "card" }, el("p", { class: "eyebrow" }, "Seviyelere göre dersler"),
        el("div", { class: "levelbars" }, LEVELS.map((L) => { const d = doneAt(L); return el("button", { class: "levelbar" + (L === state.level ? " cur" : ""), onclick: () => setLevel(L) }, el("span", { class: "lv" }, L), el("span", { class: "progressbar" }, el("i", { style: "width:" + Math.round((d / ORDER.length) * 100) + "%" })), el("span", { class: "tnum small muted" }, d + "/" + ORDER.length)); }))),
      el("section", { class: "card" }, el("p", { class: "eyebrow" }, "Rozetler"),
        el("div", { class: "badges" }, BADGES.map((b) => { const ok = b.ok(); return el("div", { class: "badge" + (ok ? " on" : "") }, el("span", { class: "b-ic" }, icon(ok ? "star" : "target")), el("b", null, b.t), el("span", null, b.d)); }))));
  };

  /* ================= Ayarlar ================= */
  routes.settings = () => {
    setTitle("Ayarlar");
    const s = state.settings;
    const seg = (key, opts, after, obj) => {
      obj = obj || s;
      const g = el("div", { class: "seg", role: "group" });
      opts.forEach(([v, label]) => g.append(el("button", { "aria-pressed": String(obj[key] === v), onclick: () => { obj[key] = v; save(); applySettings(); [...g.children].forEach((b, i) => b.setAttribute("aria-pressed", String(opts[i][0] === v))); if (after) after(v); } }, label)));
      return g;
    };
    const row = (label, help, control) => el("div", { class: "setting" }, el("div", { class: "s-label" }, el("b", null, label), help ? el("span", { class: "small muted" }, help) : null), control);
    const sw = (label, key, help) => { const id = "sw-" + key; return el("label", { class: "setting switch", for: id }, el("div", { class: "s-label" }, el("b", null, label), help ? el("span", { class: "small muted" }, help) : null), el("input", { type: "checkbox", id, role: "switch", checked: !!s[key], onchange: (e) => { s[key] = e.target.checked; save(); } })); };
    const rateOut = el("span", { class: "tnum small muted" });
    const showRate = () => { rateOut.textContent = s.rate ? s.rate.toFixed(2) + "×" : "Seviyeye göre (" + LEVEL_INFO[state.level].rate + "×)"; };
    showRate();
    const rate = el("input", { type: "range", id: "rate", min: "0.6", max: "1.2", step: "0.05", value: String(s.rate || LEVEL_INFO[state.level].rate), "aria-label": "Okuma hızı", oninput: (e) => { s.rate = parseFloat(e.target.value); showRate(); save(); } });
    const nameInp = el("input", { class: "text", id: "set-name", type: "text", value: s.name, placeholder: "Adın", maxlength: "30", onchange: (e) => { s.name = e.target.value.replace(/[^\p{L}\p{M} '-]/gu, "").trim(); e.target.value = s.name; save(); } });
    const keyInp = el("input", { class: "text", id: "set-key", type: "password", value: s.apiKey, placeholder: "sk-ant-…", autocomplete: "off", spellcheck: "false", onchange: (e) => { s.apiKey = e.target.value.trim(); save(); } });
    main.append(
      el("section", { class: "card" }, el("p", { class: "eyebrow" }, "Seviye ve hedef"),
        row("Seviye", LEVEL_INFO[state.level].name + ": " + LEVEL_INFO[state.level].desc, seg("level", LEVELS.map((L) => [L, L]), (L) => { setLevel(L); }, state)),
        row("Günlük hedef", null, seg("goal", [[10, "10 · Rahat"], [20, "20 · Düzenli"], [40, "40 · Yoğun"]], () => updateGoalChip())),
        el("div", { class: "setting" }, el("button", { class: "btn ghost small", onclick: () => go("placement") }, icon("target"), "Seviye testini yap"))),
      el("section", { class: "card" }, el("p", { class: "eyebrow" }, "Okuma rahatlığı"),
        row("Yazı tipi", "Lexend ve Atkinson Hyperlegible disleksi için okunabilirliği artırır.", seg("font", [["lexend", "Lexend"], ["atkinson", "Atkinson"], ["system", "Sistem"]])),
        row("Yazı boyutu", null, seg("size", [["s", "Küçük"], ["m", "Normal"], ["l", "Büyük"], ["xl", "Çok büyük"]])),
        row("Satır ve harf aralığı", "Harfler karışıyorsa “Geniş”i dene.", seg("space", [["tight", "Dar"], ["normal", "Normal"], ["wide", "Geniş"]])),
        row("Zemin rengi", "Bembeyaz zemin yorar; açık gri ya da krem genelde daha rahattır.", seg("paper", [["cool", "Açık gri"], ["cream", "Krem"], ["mint", "Nane"], ["white", "Beyaz"]])),
        row("Tema", null, seg("theme", [["auto", "Otomatik"], ["light", "Açık"], ["dark", "Koyu"]])),
        sw("Okurken kelimeyi vurgula", "karaoke", "Sesli okumada o anki kelime renklenir (tarayıcı destekliyorsa)."),
        row("Boşluk doldurmada seçenekler", "Yazmak yorucuysa seçenekleri hep göster.", seg("choices", [["auto", "Seviyeye göre"], ["on", "Hep göster"], ["off", "Gösterme"]]))),
      el("section", { class: "card" }, el("p", { class: "eyebrow" }, "Ses"),
        row("Aksan", null, seg("accent", [["GB", "İngiliz"], ["US", "Amerikan"]], () => { TTS.pick(); })),
        row("Okuma hızı", null, el("div", { class: "stack tight" }, rate, el("div", { class: "row between" }, rateOut, el("div", { class: "row" }, el("button", { class: "btn ghost small", onclick: () => { s.rate = 0; rate.value = String(LEVEL_INFO[state.level].rate); showRate(); save(); } }, "Seviyeye göre"), el("button", { class: "btn secondary small", onclick: () => TTS.speak("We are developing an AI-assisted audiometer that makes hearing tests more accessible.") }, icon("speaker"), "Dene"))))),
        sw("Otomatik sesli oku", "autoSpeak", "Konuşmada ve kelime tekrarında."),
        sw("Türkçe çeviri açık başlasın", "showTr", "Kapalıyken cümleye dokunarak açarsın."),
        sw("Titreşim", "haptics", "Doğru cevapta kısa titreşim (Android).")),
      el("section", { class: "card" }, el("p", { class: "eyebrow" }, "Kişisel"), row("Adın", "Derslerde senin repliklerinde kullanılır.", nameInp)),
      el("section", { class: "card" }, el("p", { class: "eyebrow" }, "Canlı yapay zekâ (isteğe bağlı)"),
        el("p", { class: "small muted" }, "Anahtar olmadan her şey çalışır. Bir Anthropic API anahtarı girersen konuşma adımındaki kişi senin cevabına göre, seçtiğin seviyede canlı konuşur ve cümleni düzeltir. Anahtar yalnızca bu cihazda saklanır ve sadece Anthropic'e gönderilir."),
        row("Anthropic API anahtarı", null, keyInp),
        sw("Konuşmada canlı yapay zekâ kullan", "aiMode")),
      el("section", { class: "card" }, el("p", { class: "eyebrow" }, "Veri"),
        el("p", { class: "small muted" }, "İlerlemen yalnızca bu cihazda saklanır. Başka cihaza taşımak için dışa aktar, orada içe aktar."),
        el("div", { class: "row" }, el("button", { class: "btn small secondary", onclick: exportData }, "Dışa aktar"), el("button", { class: "btn small secondary", onclick: importData }, "İçe aktar"), el("button", { class: "btn small ghost danger", onclick: resetData }, "Sıfırla"))),
      el("button", { class: "btn ghost wide", onclick: () => go("about") }, icon("info"), "Hakkında ve gizlilik"));
  };
  function exportData() {
    const text = JSON.stringify(state);
    const box = el("textarea", { class: "answer mono", readonly: true, rows: "4", "aria-label": "Yedek metni" }, text);
    const close = sheet("Yedek", el("div", { class: "stack" }, el("p", { class: "small muted" }, "Bu metni bir nota yapıştırıp sakla. API anahtarın da içinde olduğu için kimseyle paylaşma."), box, el("button", { class: "btn wide", onclick: () => { box.select(); if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => { toast("Panoya kopyalandı"); close(); }).catch(() => toast("Metni seçip kopyala")); } }, "Kopyala")));
  }
  function importData() {
    const ta = el("textarea", { class: "answer mono", rows: "5", placeholder: "Yedek metnini buraya yapıştır", "aria-label": "Yedek metni" });
    const close = sheet("İçe aktar", el("div", { class: "stack" }, ta, el("button", { class: "btn wide", onclick: () => {
      try { const s = JSON.parse(ta.value); if (!s || typeof s !== "object" || !s.settings) throw new Error(); localStorage.setItem(KEY, JSON.stringify(s)); load(); save(); applySettings(); close(); toast("İlerleme yüklendi"); render(); }
      catch (e) { toast("Bu metin okunamadı. Tamamını kopyaladığından emin ol."); }
    } }, "Yükle")));
  }
  function resetData() {
    const close = sheet("Her şeyi sıfırla", el("div", { class: "stack" }, el("p", null, "Tüm dersler, kelimeler, seri ve ayarlar bu cihazdan silinecek. Bu geri alınamaz."),
      el("button", { class: "btn wide danger", onclick: () => { state = defaults(); save(); applySettings(); close(); toast("Sıfırlandı"); go("welcome"); } }, "Evet, sil"),
      el("button", { class: "btn ghost wide", onclick: () => close() }, "Vazgeç")));
  }

  routes.about = () => {
    setTitle("Hakkında");
    const n = ORDER.length;
    main.append(
      el("section", { class: "card" }, el("h2", null, "AIHEAR English"), el("p", { class: "muted" }, "Girişimciler için, gerçek iş durumlarıyla İngilizce. Disleksi dostu tasarlandı."),
        el("ul", { class: "plain" },
          el("li", null, n + " ders, " + CATALOG.topics.length + " konu, her ders 6 seviyede (" + n * 6 + " metin)."),
          el("li", null, "Her derste 5 adım: metin, kelimeler ve dil yapısı, anlama, kullanım, konuşma."),
          el("li", null, "Kelimeler aralıklı tekrar sistemiyle takip edilir."),
          el("li", null, "İnternetsiz çalışır; telefona uygulama gibi kurulabilir."))),
      el("section", { class: "card" }, el("h3", null, "Seviyeler nasıl çalışır?"), el("p", { class: "muted" }, "Her ders aynı hikâyeyi altı farklı İngilizce düzeyinde anlatır. Bir metin zor gelirse “Daha kolay” ile bir alt seviyeye geçersin; hikâye aynı kalır, dil sadeleşir. Kolay gelirse bir üst seviyeye geçip aynı fikri daha zengin ifadelerle okursun."),
        el("div", { class: "levels compact" }, LEVELS.map((L) => el("div", { class: "level-opt static" }, el("span", { class: "lv" }, L), el("span", { class: "lt" }, el("b", null, LEVEL_INFO[L].name), el("span", null, LEVEL_INFO[L].desc)))))),
      el("section", { class: "card" }, el("h3", null, "Gizlilik"), el("p", { class: "muted" }, "Hesap yok, sunucu yok, izleme yok. İlerlemen ve ayarların yalnızca bu cihazdaki tarayıcı deposunda tutulur. Canlı yapay zekâyı açarsan konuşma mesajların yalnızca girdiğin anahtarla doğrudan Anthropic'e gönderilir. Mikrofon kullanırsan konuşma tanıma tarayıcının kendi hizmetiyle yapılır."),
        el("a", { class: "btn ghost small", href: "privacy.html", target: "_blank", rel: "noopener" }, "Gizlilik politikasının tamamı")),
      el("p", { class: "small muted center" }, "Sürüm " + VERSION));
  };
  const VERSION = "2.0.0";

  /* ================= Hizmet çalışanı güncellemesi ================= */
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then((reg) => {
        const prompt = (w) => toast("Yeni sürüm hazır.", { action: "Yenile", sticky: true, onAction: () => w.postMessage("skipWaiting") });
        if (reg.waiting && navigator.serviceWorker.controller) prompt(reg.waiting);
        reg.addEventListener("updatefound", () => { const w = reg.installing; if (!w) return; w.addEventListener("statechange", () => { if (w.state === "installed" && navigator.serviceWorker.controller) prompt(w); }); });
      }).catch(() => {});
      let reloaded = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => { if (!reloaded) { reloaded = true; location.reload(); } });
    });
  }

  /* ================= Başlat ================= */
  load();
  applySettings();
  if (!location.hash) history.replaceState(null, "", state.onboarded ? "#home" : "#welcome");
  render();
  const idle = window.requestIdleCallback || ((f) => setTimeout(f, 800));
  idle(() => loadLevel(state.level).catch(() => {}));
  window.AIHEAR = { get state() { return state; }, SRS, TTS, loadLevel, version: VERSION };
})();
