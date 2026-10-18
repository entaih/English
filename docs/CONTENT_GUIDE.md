# Content guide: one lesson, six levels

Every lesson exists at all six CEFR levels: A1, A2, B1, B2, C1, C2.
The *situation* stays the same at every level (same people, same facts, same goal).
Only the *language* changes. A learner who switches from B1 to C1 reads the same
story told by a more fluent speaker.

The learner: a Turkish startup founder with dyslexia. Real level is about B1.
Gets bored when text is too hard. Wants to pitch to foreign investors and to live abroad.
UI language is Turkish. All `tr` fields are natural Turkish (not word-by-word).

## File format

One JSON file per lesson: `content/src/<id>.json`

```json
{
  "id": "st-01",
  "topic": "startup",
  "title": "Explaining My Startup to a Potential Partner",
  "titleTr": "Girişimimi Olası Bir Ortağa Anlatmak",
  "levels": {
    "A1": { ...variant... },
    "A2": { ...variant... },
    "B1": { ...variant... },
    "B2": { ...variant... },
    "C1": { ...variant... },
    "C2": { ...variant... }
  }
}
```

A variant:

```json
{
  "intro": "Türkçe tek cümlelik bağlam: bu derste ne yapıyorsun?",
  "text": [
    { "who": "Partner", "en": "One sentence.", "tr": "Bir cümle." },
    { "who": "Me", "en": "...", "tr": "..." }
  ],
  "vocab": [
    { "en": "aim to", "tr": "amaçlamak", "ex": "We aim to make hearing tests accessible.", "def": "to plan or try to achieve something" }
  ],
  "grammar": {
    "title": "Present simple: what we do",
    "tr": "Kısa Türkçe açıklama (1-3 cümle). Kural + ne zaman kullanılır.",
    "examples": ["We build a device.", "It tests hearing."]
  },
  "questions": [
    { "q": "What does the company build?", "options": ["A hearing aid", "A hearing test device", "An app"], "a": 1 }
  ],
  "gaps": [
    { "s": "We build a ___ that tests hearing.", "a": "device", "hint": "cihaz" }
  ],
  "order": [
    { "a": "We are a small team of six people." }
  ],
  "translate": [
    { "tr": "Biz küçük bir ekibiz.", "en": "We are a small team.", "keys": ["small team"] }
  ],
  "roleplay": {
    "persona": "Potential partner",
    "personaTr": "Olası iş ortağı",
    "scene": "Türkçe sahne açıklaması.",
    "turns": [
      { "ai": "What does your company do?", "aiTr": "Şirketiniz ne yapıyor?", "hint": "We build a device that tests hearing.", "keys": ["device", "hearing"] }
    ]
  }
}
```

Rules for fields:

- `who` is optional. Use `"Me"` for the learner. Other speakers get a short English role or first name ("Investor", "Sarah").
- Put **exactly one sentence** in each `text[].en`. Dyslexic readers need short chunks, even at C2.
- Use `{name}` wherever the learner's own first name appears ("My name is {name}."). Never invent a name for the learner.
- `vocab[].ex` must use the vocab item (an inflected form is fine). Prefer chunks and collocations ("raise a round", "meet a deadline") over single words.
- `vocab[].def` is a short plain-English definition. Required from B1 up, optional below.
- `questions[].a` is the zero-based index of the correct option. Vary the position of the correct answer.
- `gaps[].s` contains `___` exactly once. `a` is a single word or short phrase that fits. `hint` is Turkish.
- `order[].a` is a sentence of 4 to 12 words, taken from or close to the text. No commas inside.
- `translate[].keys` are 1 to 3 short English chunks that **must appear in `en`**. They are what we check in the learner's answer, so pick the important words, not "the".
- `roleplay.turns[].hint` is a model answer the learner can copy. At least one of its `keys` must appear in the hint. `keys` are 2 to 4 chunks; any one of them counts as a hit.
- `roleplay.turns[].ai` is what the other person says. Its difficulty matches the level too.

## Level targets

| Level | Text sentences | Max words / sentence | Vocab | Questions | Gaps | Order | Translate | Roleplay turns |
|---|---|---|---|---|---|---|---|---|
| A1 | 6–8 | 10 | 5–6 | 3 | 3 | 2 | 2 | 2–3 |
| A2 | 7–9 | 14 | 6–8 | 4 | 3 | 2 | 2 | 3 |
| B1 | 8–10 | 20 | 8 | 4 | 3 | 2 | 2 | 3–4 |
| B2 | 9–11 | 26 | 8–9 | 4–5 | 3 | 2 | 2 | 3–4 |
| C1 | 10–12 | 32 | 9–10 | 5 | 3–4 | 2 | 2–3 | 4 |
| C2 | 10–12 | 38 | 10 | 5 | 4 | 2 | 3 | 4 |

Language per level:

- **A1** – present simple, *to be*, *have*, *can*, *there is*. The 1000 most common words plus the lesson's few key nouns (device, test, investor). No idioms. Questions are literal.
- **A2** – past simple, *going to*, *want to / need to*, comparatives, *because / so / but*. Everyday business words.
- **B1** – present perfect, first conditional, *should / have to*, linking words (*however, that's why, in the end*). Common collocations.
- **B2** – passive, second conditional, relative clauses, reported speech, hedging (*I'd say, it seems*). Business collocations (*drive growth, close a deal*). At least one inference question.
- **C1** – nuance and register. Cleft sentences, inversion (*Not only…*), participle clauses, precise verbs (*mitigate, leverage, bottleneck*), idiomatic phrases used naturally. Questions about attitude and implication.
- **C2** – near-native: subtle hedging and emphasis, idioms, irony, concise and elegant phrasing, sophisticated discourse markers (*that said, by the same token*). Two questions about implication or tone.

Grammar card: one point that actually appears in the variant's text, appropriate to the level
(A1 *to be*, A2 past simple, B1 present perfect vs past, B2 passive, C1 inversion, C2 nuanced hedging, etc.).
Pick what the text really uses.

Keep the facts identical across levels. A1 may leave details out, but must never contradict them.

## Shared facts (use these, do not contradict)

- **AIHEAR** is a medical technology startup from Turkey. The learner ({name}) is the founder.
- Product: an **autonomous, AI-assisted audiometer**. The patient puts on headphones and presses a button when they hear a sound. The AI adjusts the test in real time and produces an **audiogram**. A test takes **under ten minutes** and needs **no expert in the room**. The AI runs **on the device** (privacy, works offline); software updates are sent about once a month.
- Problem: about **one in five people** (over a billion) has some hearing loss; most are never tested because there are **not enough audiologists**; in small towns people wait **months** for an appointment.
- Team: **six people**: three engineers, one doctor, two business people.
- Prototype: the **third version**; the first was a laptop and headphones.
- Clinical study: **two university hospitals**, **200 participants** aged 18–75, **blind comparison** with a trained audiologist, results **matched in 94%** of cases; the other 6% differed slightly and **did not change the diagnosis**. Published in a medical journal **last spring**.
- Regulation: **Class IIa** device in the EU, needs the **CE mark**; FDA approval for the US later. Target: certification **by the end of next year**. Working with an experienced regulatory consultant. Biggest risk: certification can take longer than planned.
- Business model: device **€4,000** (costs **€1,500** to make, about **60%** gross margin) plus **€99 per month** software fee per clinic (recurring revenue). **Five paying customers** today. Expect profitability in the **third year**. Biggest costs: salaries, certification, marketing.
- Distribution: deal with a distributor at **20% commission** for the first year, reviewed after twelve months; **exclusive rights in Germany** only if they reach a minimum sales target.
- Funding: raising **€500,000** to finish certification and enter the European market. Negotiated valuation: **€2.5 million post-money for 20%**, investor gets a **board seat**. Won a **€250,000 European innovation grant** for research and clinical validation.
- Customers: hospitals, clinics, hearing aid shops. Price objection is answered with savings (no expert needed for every test) and a **one-month free trial**; two-year warranty, remote support.
- Founder habits (energy lesson): sleeps at least seven hours, no email after 10 pm, most important task in the morning, walks 30 minutes a day.

Lessons outside AIHEAR (travel, living abroad, future/ethics) still use the learner as "Me" and may mention that they run a health-tech startup.
