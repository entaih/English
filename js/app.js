/* AIHEAR English — kişisel İngilizce öğrenme uygulaması
   Vanilla JS, bağımlılık yok. Tüm ilerleme localStorage içinde tutulur. */
(function () {
  "use strict";

  // ---------- Yardımcılar ----------
  const $ = (sel, root) => (root || document).querySelector(sel);
  const el = (tag, attrs, ...children) => {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
      else if (v === false || v == null) continue;
      else if (v === true) n.setAttribute(k, "");
      else n.setAttribute(k, v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return n;
  };
  const todayKey = () => new Date().toISOString().slice(0, 10);
  const DAY = 86400000;
  const norm = (s) => (s || "").toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const ICON = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 6V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 17v4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V18h6v-1.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>',
    logo: '<svg viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="16" fill="#1d6b8a"/><g stroke="#fff" stroke-width="5" stroke-linecap="round"><path d="M14 32v0"/><path d="M22 26v12"/><path d="M30 18v28"/><path d="M38 23v18"/><path d="M46 28v8"/></g></svg>'
  };
  const svg = (name) => { const s = el("span", { html: ICON[name] }); return s.firstChild; };

  // ---------- Veri ----------
  const LESSONS = window.LESSONS || [];
  const TOPICS = window.TOPICS || [];
  const CURRICULUM = (window.CURRICULUM || []).filter((id) => LESSONS.some((l) => l.id === id));
  const lessonById = (id) => LESSONS.find((l) => l.id === id);
  const topicById = (id) => TOPICS.find((t) => t.id === id) || { name: id, short: id, color: "#666" };
  const orderedLessons = () => CURRICULUM.map(lessonById);

  // ---------- Depo ----------
  const KEY = "aihear-english-v1";
  const defaults = () => ({
    settings: { font: "lexend", size: "m", space: "normal", paper: "ivory", theme: "auto", rate: 0.85, autoSpeak: true, showTr: true, apiKey: "", aiMode: false, name: "" },
    done: {},        // lessonId -> { date, score, steps: {1..5: true} }
    srs: {},         // word -> { tr, ex, lesson, ease, interval, due, reps, lapses, added }
    streak: { last: "", count: 0 },
    xp: 0
  });
  let state = defaults();
  const load = () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const s = JSON.parse(raw); state = Object.assign(defaults(), s); state.settings = Object.assign(defaults().settings, s.settings || {}); }
    } catch (e) { /* özel pencere ya da engellenmiş depo: hafızada devam */ }
  };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* yok say */ } };
  const touchStreak = () => {
    const t = todayKey();
    if (state.streak.last === t) return;
    const y = new Date(Date.now() - DAY).toISOString().slice(0, 10);
    state.streak.count = state.streak.last === y ? state.streak.count + 1 : 1;
    state.streak.last = t; save();
  };
  const addXp = (n) => { state.xp += n; touchStreak(); save(); };

  // ---------- Ayarları uygula ----------
  const applySettings = () => {
    const s = state.settings, r = document.documentElement;
    r.setAttribute("data-font", s.font);
    r.setAttribute("data-size", s.size);
    r.setAttribute("data-space", s.space);
    r.setAttribute("data-paper", s.paper);
    if (s.theme === "auto") r.removeAttribute("data-theme"); else r.setAttribute("data-theme", s.theme);
  };

  // ---------- Sesli okuma (TTS) ----------
  const TTS = {
    voice: null, current: null,
    ok: () => "speechSynthesis" in window,
    pickVoice() {
      if (!this.ok()) return null;
      const vs = speechSynthesis.getVoices();
      const en = vs.filter((v) => /^en(-|_)?(GB|US)?/i.test(v.lang));
      const pref = en.find((v) => /Google UK English Female|Samantha|Daniel|Karen|Moira|Serena|Microsoft (Aria|Libby|Sonia)/i.test(v.name)) || en.find((v) => /en-GB/i.test(v.lang)) || en[0];
      this.voice = pref || null; return this.voice;
    },
    stop() { if (this.ok()) speechSynthesis.cancel(); if (this.current && this.current.onend) { const c = this.current; this.current = null; c.onend({ cancelled: true }); } },
    speak(text, opts) {
      opts = opts || {};
      return new Promise((resolve) => {
        if (!this.ok()) { toast("Bu tarayıcıda sesli okuma yok."); resolve(); return; }
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        if (!this.voice) this.pickVoice();
        if (this.voice) u.voice = this.voice;
        u.lang = "en-GB"; u.rate = opts.rate || state.settings.rate; u.pitch = 1;
        let finished = false;
        const done = () => { if (finished) return; finished = true; this.current = null; resolve(); };
        u.onend = done; u.onerror = done;
        this.current = { onend: done };
        speechSynthesis.speak(u);
        // iOS bazen onend atmaz: güvenlik için zaman aşımı
        setTimeout(done, Math.max(4000, text.length * 120));
      });
    }
  };
  if (TTS.ok()) { TTS.pickVoice(); speechSynthesis.onvoiceschanged = () => TTS.pickVoice(); }

  // ---------- Konuşma tanıma (STT) ----------
  const STT = {
    ok: () => !!(window.SpeechRecognition || window.webkitSpeechRecognition),
    listen(onResult, onEnd) {
      const R = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!R) return null;
      const rec = new R(); rec.lang = "en-US"; rec.interimResults = true; rec.maxAlternatives = 1;
      let finalText = "";
      rec.onresult = (e) => { let interim = ""; for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) finalText += t; else interim += t; } onResult(finalText + interim, false); };
      rec.onerror = () => onEnd && onEnd();
      rec.onend = () => { onResult(finalText, true); onEnd && onEnd(); };
      try { rec.start(); } catch (e) { return null; }
      return rec;
    }
  };

  // ---------- Aralıklı tekrar (SRS, basitleştirilmiş SM-2) ----------
  const SRS = {
    add(word, meta) {
      if (state.srs[word]) return;
      state.srs[word] = Object.assign({ ease: 2.5, interval: 0, due: Date.now(), reps: 0, lapses: 0, added: Date.now() }, meta);
      save();
    },
    rate(word, q) { // q: 1 zor, 2 orta, 3 kolay
      const w = state.srs[word]; if (!w) return;
      if (q === 1) { w.reps = 0; w.lapses++; w.interval = 0; w.ease = Math.max(1.3, w.ease - 0.2); w.due = Date.now() + 10 * 60000; }
      else {
        w.reps++;
        if (w.reps === 1) w.interval = q === 3 ? 3 : 1;
        else if (w.reps === 2) w.interval = q === 3 ? 7 : 3;
        else w.interval = Math.round(w.interval * (q === 3 ? w.ease + 0.3 : w.ease));
        w.ease = Math.min(3.0, w.ease + (q === 3 ? 0.1 : 0));
        w.due = Date.now() + w.interval * DAY;
      }
      save();
    },
    due() { const now = Date.now(); return Object.keys(state.srs).filter((k) => state.srs[k].due <= now); },
    known(word) { const w = state.srs[word]; return w && w.interval >= 7; }
  };

  // ---------- Toast ----------
  let toastTimer = null;
  const toast = (msg) => {
    let t = $("#toast"); if (!t) { t = el("div", { id: "toast", class: "toast", role: "status" }); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
  };

  // ---------- Yönlendirme ----------
  const main = $("#main"), title = $("#title"), backBtn = $("#back");
  const routes = {};
  let currentRoute = "home";
  const go = (hash) => { location.hash = hash; };
  const render = () => {
    TTS.stop();
    const h = (location.hash || "#home").slice(1);
    const [name, arg, arg2] = h.split("/");
    currentRoute = routes[name] ? name : "home";
    main.innerHTML = "";
    main.scrollTop = 0; window.scrollTo(0, 0);
    document.querySelectorAll(".bottomnav button").forEach((b) => { if (b.dataset.route === currentRoute || (currentRoute === "lesson" && b.dataset.route === "lessons")) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
    backBtn.hidden = currentRoute !== "lesson";
    routes[currentRoute](arg, arg2);
  };
  window.addEventListener("hashchange", render);
  backBtn.addEventListener("click", () => go("lessons"));
  document.querySelectorAll(".bottomnav button").forEach((b) => b.addEventListener("click", () => go(b.dataset.route)));

  // ---------- Ana sayfa ----------
  routes.home = () => {
    title.textContent = "AIHEAR English";
    const ordered = orderedLessons();
    const doneCount = ordered.filter((l) => state.done[l.id] && state.done[l.id].complete).length;
    const next = ordered.find((l) => !(state.done[l.id] && state.done[l.id].complete)) || ordered[0];
    const due = SRS.due();
    const hour = new Date().getHours();
    const greet = hour < 12 ? "Günaydın" : hour < 18 ? "İyi günler" : "İyi akşamlar";
    const name = state.settings.name ? ", " + state.settings.name : "";

    main.append(
      el("section", { class: "hero" },
        el("p", { class: "eyebrow" }, "Girişimciler için İngilizce"),
        el("h1", null, greet + name + "."),
        el("p", { class: "muted" }, "Kısa metinler, kendi işinden cümleler, her gün 10 dakika.")
      ),
      el("section", { class: "stats" },
        el("div", { class: "stat" }, el("b", null, String(state.streak.count)), el("span", null, "gün seri")),
        el("div", { class: "stat" }, el("b", null, doneCount + "/" + ordered.length), el("span", null, "ders bitti")),
        el("div", { class: "stat" }, el("b", null, String(Object.keys(state.srs).length)), el("span", null, "kelime"))
      ),
      el("section", { class: "card" },
        el("p", { class: "eyebrow" }, doneCount === ordered.length ? "Tekrar et" : "Bugünün dersi"),
        el("div", { class: "row" }, el("span", { class: "pill topic", style: "background:" + topicById(next.topic).color }, topicById(next.topic).short), el("span", { class: "pill level" }, next.level), el("span", { class: "pill" }, "~" + next.minutes + " dk")),
        el("h2", null, next.title),
        el("p", { class: "muted" }, next.titleTr),
        el("button", { class: "btn wide", onclick: () => go("lesson/" + next.id) }, "Derse başla", svg("next"))
      ),
      el("section", { class: "card" },
        el("div", { class: "row between" }, el("p", { class: "eyebrow" }, "Kelime tekrarı"), el("span", { class: "pill " + (due.length ? "" : "done") }, due.length ? due.length + " kelime hazır" : "Hepsi tamam")),
        el("p", { class: "muted small" }, due.length ? "Unutmaya yaklaştığın kelimeler bekliyor. Birkaç dakika yeter." : "Şu an tekrar bekleyen kelime yok. Yeni derste yeni kelimeler gelecek."),
        el("button", { class: "btn secondary wide", onclick: () => go("review"), disabled: !due.length }, "Tekrara başla", svg("cards"))
      ),
      el("section", { class: "card flat" },
        el("p", { class: "eyebrow" }, "Müfredat ilerlemesi"),
        el("div", { class: "progressbar" }, el("i", { style: "width:" + Math.round((doneCount / ordered.length) * 100) + "%" })),
        el("div", { class: "stack" }, TOPICS.map((t) => {
          const ls = LESSONS.filter((l) => l.topic === t.id); const d = ls.filter((l) => state.done[l.id] && state.done[l.id].complete).length;
          return el("div", { class: "row between small" }, el("span", { class: "row" }, el("i", { style: "display:inline-block;width:12px;height:12px;border-radius:3px;background:" + t.color }), t.name), el("span", { class: "muted", style: "font-variant-numeric:tabular-nums" }, d + "/" + ls.length));
        }))
      ),
      el("p", { class: "muted small center" }, "Toplam " + state.xp + " puan topladın.")
    );
  };

  // ---------- Ders listesi ----------
  let listFilter = "all";
  routes.lessons = () => {
    title.textContent = "Dersler";
    const chips = el("div", { class: "chips", role: "group", "aria-label": "Konu filtresi" });
    const mk = (id, label) => el("button", { class: "chip", "aria-pressed": String(listFilter === id), onclick: () => { listFilter = id; render(); } }, label);
    chips.append(mk("all", "Tümü"), ...TOPICS.map((t) => mk(t.id, t.short)));
    main.append(chips);
    const list = el("div", { class: "stack" });
    orderedLessons().forEach((l, i) => {
      if (listFilter !== "all" && l.topic !== listFilter) return;
      const t = topicById(l.topic), d = state.done[l.id];
      list.append(el("button", { class: "lesson-item", onclick: () => go("lesson/" + l.id) },
        el("span", { class: "num", style: "background:" + t.color }, String(i + 1)),
        el("span", { class: "t" }, el("b", null, l.title), el("span", null, l.titleTr), el("span", null, t.short + " · " + l.level + " · ~" + l.minutes + " dk")),
        d && d.complete ? svg("check") : el("span", { class: "muted", style: "font-size:.8em" }, d ? "devam" : "")
      ));
    });
    main.append(list);
  };

  // ---------- Ders ----------
  let lessonStep = 1;
  routes.lesson = (id, stepArg) => {
    const L = lessonById(id); if (!L) { go("lessons"); return; }
    const prog = state.done[id] || (state.done[id] = { steps: {}, score: 0, complete: false });
    lessonStep = Math.min(5, Math.max(1, parseInt(stepArg || "0", 10) || lessonStep || 1));
    if (!stepArg) lessonStep = 1;
    title.textContent = L.title;
    const t = topicById(L.topic);
    const header = el("div", { class: "stack" },
      el("div", { class: "row" }, el("span", { class: "pill topic", style: "background:" + t.color }, t.short), el("span", { class: "pill level" }, L.level), el("span", { class: "pill" }, "~" + L.minutes + " dk")),
      el("h1", null, L.title), el("p", { class: "muted" }, L.titleTr)
    );
    const names = ["Metin", "Kelimeler", "Anlama", "Kullanım", "Konuşma"];
    const steps = el("nav", { class: "steps", "aria-label": "Ders adımları" }, names.map((n, i) => el("button", { class: prog.steps[i + 1] ? "ok" : "", "aria-current": lessonStep === i + 1 ? "step" : null, onclick: () => { lessonStep = i + 1; renderStep(); } }, el("b", null, String(i + 1)), n)));
    const body = el("div", { class: "stack", id: "stepbody" });
    main.append(header, steps, body);

    const markStep = (n) => { prog.steps[n] = true; save(); steps.children[n - 1].classList.add("ok"); };
    const nextBtn = (label) => el("button", { class: "btn wide", onclick: () => { markStep(lessonStep); if (lessonStep < 5) { lessonStep++; renderStep(); } } }, label || "Devam", svg("next"));

    function renderStep() {
      TTS.stop();
      [...steps.children].forEach((b, i) => { if (i + 1 === lessonStep) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
      body.innerHTML = "";
      window.scrollTo({ top: Math.max(0, steps.offsetTop - 70), behavior: "smooth" });
      ({ 1: stepText, 2: stepVocab, 3: stepQuiz, 4: stepUse, 5: stepTalk })[lessonStep]();
    }

    // 1) Metin
    function stepText() {
      let showTr = state.settings.showTr;
      const vocabWords = L.vocab.map((v) => v.en.replace(/\s*\(.*?\)/, "").split(" / ")[0]).filter((w) => w.length > 3 && !/[.?!]/.test(w));
      const highlight = (s) => { let h = escapeHtml(s); vocabWords.forEach((w) => { const re = new RegExp("(^|[^a-zA-Z])(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/s$/, "s?") + ")(?=[^a-zA-Z]|$)", "i"); h = h.replace(re, "$1<mark>$2</mark>"); }); return h; };
      const cards = L.text.map((s, i) => {
        const c = el("article", { class: "sentence" },
          el("div", { class: "body", onclick: () => { const tr = c.querySelector(".tr"); tr.hidden = !tr.hidden; } },
            s.who ? el("div", { class: "who" }, s.who === "Me" ? "Ben" : s.who) : null,
            el("div", { class: "en", html: highlight(s.en) }),
            el("div", { class: "tr", hidden: !showTr }, s.tr)
          ),
          el("button", { class: "iconbtn", "aria-label": "Cümleyi dinle", onclick: () => playOne(i) }, svg("speaker"))
        );
        return c;
      });
      let playing = false;
      async function playOne(i) { cards.forEach((c) => c.classList.remove("speaking")); cards[i].classList.add("speaking"); await TTS.speak(L.text[i].en); cards[i].classList.remove("speaking"); }
      async function playAll() {
        if (playing) { playing = false; TTS.stop(); allBtn.replaceChildren(svg("speaker"), "Hepsini dinle"); return; }
        playing = true; allBtn.replaceChildren(svg("stop"), "Durdur");
        for (let i = 0; i < cards.length && playing; i++) { cards[i].scrollIntoView({ block: "center", behavior: "smooth" }); await playOne(i); }
        playing = false; allBtn.replaceChildren(svg("speaker"), "Hepsini dinle");
      }
      const allBtn = el("button", { class: "btn secondary", onclick: playAll }, svg("speaker"), "Hepsini dinle");
      const trBtn = el("button", { class: "btn ghost", "aria-pressed": String(showTr), onclick: () => { showTr = !showTr; trBtn.setAttribute("aria-pressed", String(showTr)); cards.forEach((c) => { c.querySelector(".tr").hidden = !showTr; }); } }, svg("eye"), "Türkçe");
      body.append(
        el("p", { class: "muted" }, L.intro),
        el("div", { class: "row" }, allBtn, trBtn),
        el("p", { class: "small muted" }, "Cümleye dokununca Türkçesi açılır/kapanır. Sarı işaretli kelimeler bu dersin kelimeleri."),
        ...cards,
        nextBtn("Kelimelere geç")
      );
    }

    // 2) Kelimeler
    function stepVocab() {
      const known = L.vocab.filter((v) => state.srs[v.en] && state.srs[v.en].reps > 0).length;
      body.append(el("p", { class: "muted" }, "Bu dersin kalıpları. Hepsi tekrar listene eklenir; bildiklerini “Biliyorum” ile işaretle, daha seyrek gelir."),
        known ? el("p", { class: "small", style: "color:var(--warn)" }, known + " kelimeyi daha önce görmüştün; tekrar burada.") : null);
      L.vocab.forEach((v) => {
        const seen = state.srs[v.en];
        const card = el("article", { class: "vocab" },
          el("div", { class: "stack", style: "gap:4px" },
            seen ? el("span", { class: "seen" }, seen.interval >= 7 ? "Biliyorsun" : "Daha önce gördün") : null,
            el("div", { class: "en" }, v.en), el("div", { class: "tr" }, v.tr), el("div", { class: "ex" }, v.ex),
            el("div", { class: "row", style: "margin-top:6px" },
              el("button", { class: "btn ghost small", onclick: (e) => { SRS.add(v.en, { tr: v.tr, ex: v.ex, lesson: L.id }); SRS.rate(v.en, 3); SRS.rate(v.en, 3); e.currentTarget.textContent = "İşaretlendi"; e.currentTarget.disabled = true; } }, "Biliyorum")
            )
          ),
          el("button", { class: "iconbtn", "aria-label": "Dinle", onclick: () => TTS.speak(v.en + ". " + v.ex) }, svg("speaker"))
        );
        body.append(card);
      });
      body.append(el("button", { class: "btn wide", onclick: () => { L.vocab.forEach((v) => SRS.add(v.en, { tr: v.tr, ex: v.ex, lesson: L.id })); markStep(2); addXp(5); lessonStep = 3; renderStep(); } }, "Kelimeleri ekle ve devam et", svg("next")));
    }

    // 3) Anlama
    function stepQuiz() {
      let correct = 0, answered = 0;
      const total = L.questions.length;
      const result = el("div", { class: "stack" });
      body.append(el("p", { class: "muted" }, "Metni hatırla ve doğru cevabı seç. Soruyu dinlemek için hoparlöre dokun."));
      L.questions.forEach((q, qi) => {
        const opts = el("div", { class: "options" });
        const card = el("article", { class: "card" }, el("div", { class: "row between" }, el("h3", null, (qi + 1) + ". " + q.q), el("button", { class: "iconbtn", "aria-label": "Soruyu dinle", onclick: () => TTS.speak(q.q) }, svg("speaker"))), opts);
        q.options.forEach((o, oi) => {
          const b = el("button", { class: "option", onclick: () => {
            [...opts.children].forEach((x) => { x.disabled = true; });
            answered++;
            if (oi === q.a) { b.classList.add("correct"); correct++; card.append(el("div", { class: "feedback good" }, "Doğru!")); }
            else { b.classList.add("wrong"); opts.children[q.a].classList.add("correct"); card.append(el("div", { class: "feedback bad" }, "Doğru cevap: " + q.options[q.a])); }
            if (answered === total) finish();
          } }, o);
          opts.append(b);
        });
        body.append(card);
      });
      body.append(result);
      function finish() {
        prog.quiz = correct; save(); addXp(correct * 3);
        result.append(el("div", { class: "card center" }, el("div", { class: "score-big" }, correct + "/" + total), el("p", { class: "muted" }, correct === total ? "Mükemmel, metni tamamen anlamışsın." : correct >= total / 2 ? "İyi. Yanlışları bir kez daha oku." : "Metne dönüp bir kez daha dinlemek iyi olur."), nextBtn("Kullanıma geç")));
        result.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // 4) Aktif kullanım
    function stepUse() {
      let score = 0;
      body.append(el("p", { class: "muted" }, "Üç küçük alıştırma: boşluk doldur, cümle kur, Türkçeden İngilizceye çevir."));
      // Boşluk doldurma
      const gapSec = el("section", { class: "card" }, el("p", { class: "eyebrow" }, "A · Boşluğu doldur"));
      L.gaps.forEach((g) => {
        const inp = el("input", { class: "gap-input", type: "text", autocapitalize: "off", autocomplete: "off", spellcheck: "false", placeholder: "İpucu: " + g.hint });
        const fb = el("div");
        const check = () => {
          if (norm(inp.value) === norm(g.a)) { fb.replaceChildren(el("div", { class: "feedback good" }, "Doğru: " + g.a)); inp.disabled = true; btn.disabled = true; score++; }
          else fb.replaceChildren(el("div", { class: "feedback bad" }, "Tekrar dene. İpucu: " + g.hint + " · " + g.a.length + " harf, " + g.a[0] + " ile başlıyor."));
        };
        const btn = el("button", { class: "btn small secondary", onclick: check }, "Kontrol et");
        inp.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
        gapSec.append(el("div", { class: "stack" }, el("p", { class: "gap-sentence", html: escapeHtml(g.s).replace("___", "<b>_____</b>") }), el("div", { class: "row" }, el("div", { style: "flex:1;min-width:160px" }, inp), btn), fb));
      });
      body.append(gapSec);
      // Cümle kurma
      const orderSec = el("section", { class: "card" }, el("p", { class: "eyebrow" }, "B · Kelimeleri sıraya koy"), el("p", { class: "small muted" }, "Kelimelere dokunarak cümleyi kur. Yanlış bir kelimeye dokunursan geri alabilirsin."));
      L.order.forEach((o) => {
        const words = o.a.replace(/[.?!,]/g, "").split(" ");
        const built = el("div", { class: "built", "aria-label": "Kurduğun cümle" });
        const bank = el("div", { class: "wordbank" });
        const fb = el("div");
        let chosen = [];
        const redraw = () => {
          built.innerHTML = ""; chosen.forEach((w, i) => built.append(el("button", { class: "word", onclick: () => { chosen.splice(i, 1); bank.children[w.idx].classList.remove("used"); built.classList.remove("ok", "no"); redraw(); } }, w.text)));
          if (chosen.length === words.length) {
            if (norm(chosen.map((w) => w.text).join(" ")) === norm(words.join(" "))) { built.classList.add("ok"); fb.replaceChildren(el("div", { class: "feedback good" }, "Doğru: " + o.a)); score++; TTS.speak(o.a); }
            else { built.classList.add("no"); fb.replaceChildren(el("div", { class: "feedback bad" }, "Sıra yanlış. Bir kelimeye dokunup geri al.")); }
          }
        };
        shuffle(words.map((text, idx) => ({ text, idx }))).forEach((w, bi) => {
          const b = el("button", { class: "word", onclick: () => { if (chosen.length >= words.length) return; b.classList.add("used"); chosen.push({ text: w.text, idx: bi }); redraw(); } }, w.text);
          bank.append(b);
        });
        orderSec.append(el("div", { class: "stack" }, built, bank, fb));
      });
      body.append(orderSec);
      // Çeviri
      const trSec = el("section", { class: "card" }, el("p", { class: "eyebrow" }, "C · Türkçeden İngilizceye"), el("p", { class: "small muted" }, "Birebir aynı olması gerekmez. Anahtar kelimeleri kullandıysan kabul edilir."));
      L.translate.forEach((tItem) => {
        const ta = el("textarea", { class: "answer", placeholder: "İngilizce yaz...", autocapitalize: "sentences" });
        const fb = el("div");
        const micBtn = STT.ok() ? el("button", { class: "iconbtn", "aria-label": "Konuşarak yaz", onclick: () => { micBtn.classList.add("active"); STT.listen((t) => { ta.value = t; }, () => micBtn.classList.remove("active")); } }, svg("mic")) : null;
        const check = () => {
          const v = norm(ta.value); const hits = tItem.keys.filter((k) => v.includes(norm(k)));
          if (!v) return;
          if (hits.length === tItem.keys.length) { fb.replaceChildren(el("div", { class: "feedback good" }, "Çok iyi. Örnek cevap: " + tItem.en)); score++; }
          else fb.replaceChildren(el("div", { class: "feedback info" }, "Yaklaştın. Şu kelimeleri kullanmayı dene: " + tItem.keys.filter((k) => !hits.includes(k)).join(", ") + ". Örnek: " + tItem.en));
          TTS.speak(tItem.en);
        };
        trSec.append(el("div", { class: "stack" }, el("p", { class: "gap-sentence" }, tItem.tr), el("div", { class: "row" }, el("div", { style: "flex:1;min-width:160px" }, ta), micBtn), el("button", { class: "btn small secondary", onclick: check }, "Kontrol et"), fb));
      });
      body.append(trSec);
      body.append(el("button", { class: "btn wide", onclick: () => { prog.use = score; addXp(score * 2); markStep(4); lessonStep = 5; renderStep(); } }, "Konuşma simülasyonuna geç", svg("next")));
    }

    // 5) Konuşma simülasyonu
    function stepTalk() {
      const rp = L.roleplay;
      const chat = el("div", { class: "chat", "aria-live": "polite" });
      const ta = el("textarea", { class: "answer", placeholder: "İngilizce cevap yaz ya da mikrofona bas...", rows: "2" });
      const hint = el("div", { class: "hintbox", hidden: true });
      const sendBtn = el("button", { class: "btn", "aria-label": "Gönder", onclick: () => submit() }, svg("send"));
      const micBtn = el("button", { class: "iconbtn", "aria-label": "Konuş", disabled: !STT.ok(), onclick: () => { micBtn.classList.add("active"); STT.listen((t) => { ta.value = t; }, () => micBtn.classList.remove("active")); } }, svg("mic"));
      const hintBtn = el("button", { class: "btn ghost small", onclick: () => { hint.hidden = !hint.hidden; } }, svg("bulb"), "İpucu");
      const composer = el("div", { class: "stack" }, hint, el("div", { class: "composer" }, micBtn, ta, sendBtn), el("div", { class: "row between" }, hintBtn, el("span", { class: "small muted" }, STT.ok() ? "Mikrofon hazır" : "Bu tarayıcıda mikrofon yok, yazarak devam et")));
      const useAI = state.settings.aiMode && state.settings.apiKey;
      body.append(
        el("div", { class: "card flat" }, el("p", { class: "eyebrow" }, "Rol: " + rp.personaTr), el("p", null, rp.scene), el("p", { class: "small muted" }, useAI ? "Yapay zekâ modu açık: karşındaki karakter canlı cevap verir." : "Karşındaki karakter hazır bir senaryoyu izler. Dersin kalıplarını kullanmaya çalış.")),
        chat, composer
      );
      let turn = 0; const history = [];
      let usedKeys = new Set();
      const aiSay = async (text, tr) => {
        const b = el("div", { class: "bubble ai" }, el("div", { class: "who" }, rp.persona), el("div", null, text), tr ? el("div", { class: "tr", hidden: true }, tr) : null,
          el("div", { class: "tools" }, el("button", { onclick: () => TTS.speak(text) }, "Dinle"), tr ? el("button", { onclick: (e) => { const t = b.querySelector(".tr"); t.hidden = !t.hidden; } }, "Türkçe") : null));
        chat.append(b); b.scrollIntoView({ behavior: "smooth", block: "nearest" });
        if (state.settings.autoSpeak) await TTS.speak(text);
      };
      const meSay = (text) => { chat.append(el("div", { class: "bubble me" }, el("div", { class: "who" }, "Ben"), el("div", null, text))); };
      const tip = (text, warn) => { const b = el("div", { class: "bubble tip" + (warn ? " warn" : "") }, text); chat.append(b); b.scrollIntoView({ behavior: "smooth", block: "nearest" }); };
      const showTurn = async () => {
        const t = rp.turns[turn];
        hint.textContent = "Örnek: " + t.hint; hint.hidden = true;
        await aiSay(t.ai, t.aiTr);
        ta.focus();
      };
      const finishTalk = () => {
        composer.hidden = true;
        const used = usedKeys.size, totalKeys = rp.turns.length;
        prog.complete = true; prog.date = todayKey(); prog.score = (prog.quiz || 0) + (prog.use || 0) + used; markStep(5); addXp(20);
        chat.append(el("div", { class: "card center" }, el("p", { class: "eyebrow" }, "Ders tamamlandı"), el("div", { class: "score-big" }, used + "/" + totalKeys), el("p", { class: "muted" }, "cevapta dersin kalıplarını kullandın. Kelimeler tekrar listende; yarın tekrar sorulacak."),
          el("div", { class: "row", style: "justify-content:center" },
            el("button", { class: "btn secondary", onclick: () => { lessonStep = 5; renderStep(); } }, "Tekrar konuş"),
            el("button", { class: "btn", onclick: () => go("home") }, "Ana sayfa"))));
      };
      async function submit() {
        const text = ta.value.trim(); if (!text) return;
        ta.value = ""; meSay(text); history.push({ role: "user", content: text });
        const t = rp.turns[turn];
        const v = norm(text); const hits = t.keys.filter((k) => v.includes(norm(k)));
        if (hits.length) { usedKeys.add(turn); }
        if (useAI) {
          sendBtn.disabled = true;
          try {
            const r = await askClaude(L, rp, history, turn);
            history.push({ role: "assistant", content: r.raw });
            if (r.tip) tip(r.tip, !hits.length);
            if (turn >= rp.turns.length - 1 || r.done) { if (r.reply) await aiSay(r.reply); finishTalk(); }
            else { turn++; await aiSay(r.reply || rp.turns[turn].ai, r.reply ? null : rp.turns[turn].aiTr); hint.textContent = "Örnek: " + rp.turns[turn].hint; hint.hidden = true; }
          } catch (e) { tip("Yapay zekâ cevap veremedi (" + e.message + "). Hazır senaryoyla devam ediyorum.", true); await scripted(hits, t); }
          sendBtn.disabled = false;
        } else await scripted(hits, t);
      }
      async function scripted(hits, t) {
        if (hits.length) tip("Harika, “" + hits[0] + "” ifadesini kullandın. " + (hits.length > 1 ? "Hatta " + hits.length + " kalıp birden." : ""));
        else tip("Olabilir. Daha doğal bir cevap şöyle olurdu: “" + t.hint + "”", true);
        turn++;
        if (turn >= rp.turns.length) { await aiSay("Thank you, that was very clear. Let's keep in touch!", "Teşekkürler, çok netti. İletişimde kalalım!"); finishTalk(); }
        else await showTurn();
      }
      ta.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } });
      showTurn();
    }

    renderStep();
  };

  // ---------- Claude ile canlı konuşma (isteğe bağlı) ----------
  async function askClaude(L, rp, history, turn) {
    const system = [
      "You are role-playing as: " + rp.persona + ". Scene: " + rp.scene,
      "The learner is a Turkish startup founder (AIHEAR, an autonomous AI audiometer) learning English at A2-B1 level, and has dyslexia. Use short, simple sentences. Maximum 2 sentences per reply. Stay in character and keep the conversation going for about " + rp.turns.length + " exchanges, then close politely.",
      "Target phrases for this lesson: " + L.vocab.map((v) => v.en).join("; ") + ".",
      "Planned questions you may ask, in order: " + rp.turns.map((t, i) => (i + 1) + ") " + t.ai).join(" ") + " You are at exchange " + (turn + 1) + ".",
      "Respond in exactly this format, nothing else:",
      "REPLY: <your in-character English reply>",
      "TIP: <one short sentence in Turkish: praise if the learner used a target phrase, or gently show a more natural version of their sentence in English>",
      "DONE: <yes if the conversation should end now, otherwise no>"
    ].join("\n");
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": state.settings.apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true", "anthropic-beta": "server-side-fallback-2026-07-01" },
      body: JSON.stringify({ model: "claude-opus-5-5", max_tokens: 400, system, messages: history, fallbacks: "default", output_config: { effort: "low" } })
    });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error((err.error && err.error.message) || ("HTTP " + res.status)); }
    const data = await res.json();
    if (data.stop_reason === "refusal") throw new Error("istek reddedildi");
    const raw = (data.content || []).filter((c) => c.type === "text").map((c) => c.text).join("\n");
    const get = (k) => { const m = raw.match(new RegExp("^" + k + ":\\s*(.+)$", "mi")); return m ? m[1].trim() : ""; };
    return { raw, reply: get("REPLY") || raw.trim(), tip: get("TIP"), done: /^y/i.test(get("DONE")) };
  }

  // ---------- Kelime tekrarı ----------
  routes.review = () => {
    title.textContent = "Kelime tekrarı";
    let queue = shuffle(SRS.due());
    const all = Object.keys(state.srs);
    if (!queue.length) {
      main.append(el("div", { class: "card center" }, el("h2", null, all.length ? "Bugünlük tamam" : "Henüz kelime yok"), el("p", { class: "muted" }, all.length ? "Tekrar bekleyen kelime yok. Yeni bir derse başlayabilirsin." : "Bir dersin “Kelimeler” adımını bitirdiğinde kelimeler buraya eklenir."),
        el("button", { class: "btn", onclick: () => go(all.length ? "home" : "lessons") }, all.length ? "Ana sayfa" : "Derslere git"),
        all.length ? el("button", { class: "btn ghost", onclick: () => { queue = shuffle(all).slice(0, 15); start(); } }, "Yine de 15 kelime çalış") : null));
      if (!all.length) return;
    } else start();
    function start() {
      main.innerHTML = "";
      let i = 0, correct = 0; const total = queue.length;
      const prog = el("div", { class: "progressbar" }, el("i", { style: "width:0%" }));
      const wrap = el("div", { class: "stack" });
      main.append(el("p", { class: "muted small" }, "Kelimeyi gör, Türkçesini hatırlamaya çalış, sonra kartı çevir ve kendini değerlendir."), prog, wrap);
      const show = () => {
        wrap.innerHTML = "";
        prog.firstChild.style.width = Math.round((i / total) * 100) + "%";
        if (i >= total) {
          addXp(correct * 2);
          wrap.append(el("div", { class: "card center" }, el("div", { class: "score-big" }, correct + "/" + total), el("p", { class: "muted" }, "kelimeyi hatırladın. Zor dediklerin 10 dakika sonra yeniden gelir."), el("button", { class: "btn", onclick: () => go("home") }, "Ana sayfa")));
          return;
        }
        const w = queue[i], d = state.srs[w];
        const lesson = lessonById(d.lesson);
        const card = el("div", { class: "flash" }, el("div", { class: "front" }, w), el("button", { class: "iconbtn", "aria-label": "Dinle", onclick: () => TTS.speak(w + ". " + (d.ex || "")) }, svg("speaker")), el("p", { class: "small muted" }, lesson ? "Ders: " + lesson.title : ""));
        const flip = el("button", { class: "btn wide secondary", onclick: () => { card.append(el("div", { class: "back" }, d.tr), el("div", { class: "ex" }, d.ex || "")); flip.hidden = true; rate.hidden = false; } }, "Kartı çevir");
        const rate = el("div", { class: "rate", hidden: true },
          el("button", { class: "hard", onclick: () => { SRS.rate(w, 1); i++; show(); } }, "Zor", el("small", null, "unuttum")),
          el("button", { class: "mid", onclick: () => { SRS.rate(w, 2); correct++; i++; show(); } }, "Orta", el("small", null, "zorlandım")),
          el("button", { class: "easy", onclick: () => { SRS.rate(w, 3); correct++; i++; show(); } }, "Kolay", el("small", null, "biliyorum")));
        wrap.append(card, flip, rate);
        if (state.settings.autoSpeak) TTS.speak(w);
      };
      show();
    }
  };

  // ---------- Ayarlar ----------
  routes.settings = () => {
    title.textContent = "Ayarlar";
    const s = state.settings;
    const seg = (key, opts, after) => { const g = el("div", { class: "seg" }); opts.forEach(([v, label]) => g.append(el("button", { "aria-pressed": String(s[key] === v), onclick: () => { s[key] = v; save(); applySettings(); [...g.children].forEach((b) => b.setAttribute("aria-pressed", "false")); g.children[opts.findIndex((o) => o[0] === v)].setAttribute("aria-pressed", "true"); if (after) after(); } }, label))); return g; };
    const setting = (label, help, control) => el("div", { class: "setting" }, el("label", { class: "title" }, label), help ? el("p", { class: "small muted" }, help) : null, control);
    const nameInp = el("input", { class: "text", type: "text", value: s.name, placeholder: "Adın (isteğe bağlı)", onchange: (e) => { s.name = e.target.value.trim(); save(); } });
    const keyInp = el("input", { class: "text", type: "password", value: s.apiKey, placeholder: "sk-ant-...", autocomplete: "off", onchange: (e) => { s.apiKey = e.target.value.trim(); save(); } });
    const aiSwitch = el("div", { class: "switch" }, el("span", null, "Konuşma simülasyonunda canlı yapay zekâ kullan"), el("input", { type: "checkbox", checked: s.aiMode, onchange: (e) => { s.aiMode = e.target.checked; save(); } }));
    const rate = el("input", { type: "range", min: "0.6", max: "1.2", step: "0.05", value: String(s.rate), oninput: (e) => { s.rate = parseFloat(e.target.value); save(); } });
    main.append(
      el("section", { class: "card" },
        el("p", { class: "eyebrow" }, "Okuma rahatlığı"),
        setting("Yazı tipi", "Lexend ve Atkinson Hyperlegible, disleksi için okunabilirliği artıran yazı tipleridir.", seg("font", [["lexend", "Lexend"], ["atkinson", "Atkinson"], ["system", "Sistem"]])),
        setting("Yazı boyutu", null, seg("size", [["s", "Küçük"], ["m", "Normal"], ["l", "Büyük"], ["xl", "Çok büyük"]])),
        setting("Satır ve harf aralığı", "Harfler birbirine karışıyorsa “Geniş” seçeneğini dene.", seg("space", [["tight", "Dar"], ["normal", "Normal"], ["wide", "Geniş"]])),
        setting("Kâğıt rengi", "Bembeyaz zemin disleksiyi zorlar; krem ya da mavi genelde daha rahattır.", seg("paper", [["ivory", "Krem"], ["blue", "Mavi"], ["yellow", "Sarı"], ["white", "Beyaz"]])),
        setting("Tema", null, seg("theme", [["auto", "Otomatik"], ["light", "Açık"], ["dark", "Koyu"]]))
      ),
      el("section", { class: "card" },
        el("p", { class: "eyebrow" }, "Ses"),
        setting("Okuma hızı", "Yavaş başla, anlamaya başlayınca hızlandır.", el("div", { class: "stack" }, rate, el("button", { class: "btn small secondary", onclick: () => TTS.speak("We are developing an AI-assisted audiometer that makes hearing tests more accessible.") }, svg("speaker"), "Dene"))),
        el("div", { class: "setting" }, el("div", { class: "switch" }, el("span", null, "Konuşma ve tekrarda otomatik sesli oku"), el("input", { type: "checkbox", checked: s.autoSpeak, onchange: (e) => { s.autoSpeak = e.target.checked; save(); } }))),
        el("div", { class: "setting" }, el("div", { class: "switch" }, el("span", null, "Metinlerde Türkçe çeviriyi başta açık göster"), el("input", { type: "checkbox", checked: s.showTr, onchange: (e) => { s.showTr = e.target.checked; save(); } })))
      ),
      el("section", { class: "card" },
        el("p", { class: "eyebrow" }, "Kişisel"),
        setting("Adın", "Ana sayfadaki selamlama için.", nameInp)
      ),
      el("section", { class: "card" },
        el("p", { class: "eyebrow" }, "Canlı yapay zekâ (isteğe bağlı)"),
        el("p", { class: "small muted" }, "Anahtar olmadan da her şey çalışır; konuşma simülasyonu hazır senaryoyu izler. Bir Anthropic API anahtarı girersen karşındaki yatırımcı/müşteri canlı cevap verir ve cümlelerini düzeltir. Anahtar yalnızca bu cihazda saklanır."),
        setting("Anthropic API anahtarı", null, keyInp),
        el("div", { class: "setting" }, aiSwitch)
      ),
      el("section", { class: "card" },
        el("p", { class: "eyebrow" }, "Veri"),
        el("p", { class: "small muted" }, "İlerleme bu cihazda saklanır. Yedek almak için dışa aktar; başka cihazda içe aktar."),
        el("div", { class: "row" },
          el("button", { class: "btn small secondary", onclick: exportData }, "Dışa aktar"),
          el("button", { class: "btn small secondary", onclick: importData }, "İçe aktar"),
          el("button", { class: "btn small ghost", onclick: resetData }, "Sıfırla")),
        el("p", { class: "small muted" }, "Sürüm 1.0 · " + LESSONS.length + " ders · " + TOPICS.length + " konu")
      )
    );
  };
  function exportData() {
    const text = JSON.stringify(state);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => toast("İlerleme panoya kopyalandı. Bir nota yapıştırıp sakla.")).catch(() => fallback());
    else fallback();
    function fallback() { const ta = el("textarea", { class: "answer", readonly: true }, text); main.prepend(el("div", { class: "card" }, el("p", { class: "small muted" }, "Aşağıdaki metni kopyalayıp sakla."), ta)); ta.select(); }
  }
  function importData() {
    const ta = el("textarea", { class: "answer", placeholder: "Dışa aktardığın metni buraya yapıştır" });
    const box = el("div", { class: "card" }, ta, el("div", { class: "row" }, el("button", { class: "btn small", onclick: () => { try { const s = JSON.parse(ta.value); if (!s || !s.settings) throw 0; state = Object.assign(defaults(), s); save(); applySettings(); toast("İçe aktarıldı."); render(); } catch (e) { toast("Metin okunamadı."); } } }, "Yükle"), el("button", { class: "btn small ghost", onclick: () => box.remove() }, "Vazgeç")));
    main.prepend(box);
  }
  function resetData() {
    const box = el("div", { class: "card" }, el("p", null, "Tüm ilerleme, kelimeler ve ayarlar silinecek. Emin misin?"), el("div", { class: "row" }, el("button", { class: "btn small", style: "background:var(--bad);border-color:var(--bad)", onclick: () => { state = defaults(); save(); applySettings(); toast("Sıfırlandı."); render(); } }, "Evet, sil"), el("button", { class: "btn small ghost", onclick: () => box.remove() }, "Vazgeç")));
    main.prepend(box);
  }

  // ---------- Başlat ----------
  load(); applySettings(); render();
  window.AIHEAR = { state, SRS, TTS };
})();
