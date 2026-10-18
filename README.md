# AIHEAR English

Girişimciler için kişisel İngilizce öğrenme uygulaması. Metinler senin dünyandan: AIHEAR, otonom odyometre, yatırımcı sunumları, ekip yönetimi, sertifikasyon, klinik çalışma, hibe başvurusu. Seviye A2–B1, disleksi dostu arayüz, telefona kurulabilen çevrimdışı uygulama (PWA).

## Telefona kurma

Uygulamanın internette bir adresi olması gerekir. En kolay yol GitHub Pages:

1. Bu depoyu GitHub'da aç → **Settings → Pages**.
2. **Source** olarak **GitHub Actions** seç.
3. `main` dalına gönderilen her değişiklik otomatik yayınlanır (`.github/workflows/pages.yml`).
4. Adres şu şekilde olur: `https://<kullanıcı-adın>.github.io/English/`

Telefonda:

- **iPhone (Safari):** adresi aç → Paylaş → **Ana Ekrana Ekle**.
- **Android (Chrome):** adresi aç → menü (⋮) → **Uygulamayı yükle** / **Ana ekrana ekle**.

İlk açılıştan sonra internet olmadan da çalışır.

Bilgisayarda denemek için:

```bash
cd English
python3 -m http.server 8080
# tarayıcıda http://localhost:8080
```

## Uygulamada neler var

- **26 ders, 7 konu.** Girişimcilik (5), AIHEAR ve medikal teknoloji (5), yapay zekâ ve yazılım (4), yatırım (4), profesyonel iletişim (3), bilim ve araştırma (2), yaşam ve seyahat (3).
- **Her ders 5 adım:** Metin (sesli okuma + cümle cümle Türkçe) → Kelimeler ve kalıplar → Anlama soruları → Kullanım (boşluk doldurma, cümle kurma, çeviri) → Konuşma simülasyonu (yatırımcı, müşteri, ortak rolünde karşı taraf).
- **Aralıklı tekrar.** Kelimeler SM-2 benzeri bir sistemle takip edilir; unutmaya yaklaştığın kelimeler ana sayfada tekrar için bekler. Daha önce gördüğün kelimeler yeni derste işaretlenir.
- **Disleksi dostu.** Lexend / Atkinson Hyperlegible yazı tipleri, büyük boyut seçenekleri, geniş satır ve harf aralığı, krem/mavi/sarı kâğıt rengi, koyu tema, her cümlede sesli okuma, kısa paragraflar, büyük dokunma alanları.
- **Konuşma.** Tarayıcının sesli okuma özelliğiyle İngiliz aksanı; Chrome/Android'de mikrofonla konuşarak cevap verme.
- **İsteğe bağlı canlı yapay zekâ.** Ayarlar'a bir Anthropic API anahtarı girersen konuşma simülasyonundaki karakter canlı cevap verir ve cümlelerini düzeltir. Anahtar yalnızca telefonda saklanır. Anahtar olmadan her şey hazır senaryolarla çalışır.
- **Veri senin cihazında.** Sunucu yok, hesap yok. Ayarlar'dan ilerlemeyi dışa/içe aktarabilirsin.

## Yeni ders ekleme

Dersler `js/data/*.js` dosyalarında düz veri olarak durur. Bir dersin yapısı:

```js
{
  id: "st-06", topic: "startup", level: "B1", minutes: 12,
  title: "...", titleTr: "...", intro: "...",
  text: [ { who: "Me", en: "...", tr: "..." } ],          // who isteğe bağlı
  vocab: [ { en: "aim to", tr: "amaçlamak", ex: "..." } ],
  questions: [ { q: "...", options: ["a","b","c"], a: 1 } ],
  gaps: [ { s: "We ___ to help.", a: "aim", hint: "amaçlamak" } ],
  order: [ { a: "We aim to help people." } ],
  translate: [ { tr: "...", en: "...", keys: ["aim"] } ],
  roleplay: { persona: "Investor", personaTr: "Yatırımcı", scene: "...",
    turns: [ { ai: "...", aiTr: "...", hint: "...", keys: ["aim to"] } ] }
}
```

Yeni dersi `js/data/topics.js` içindeki `CURRICULUM` listesine ekle; sıra oradaki sıradır. Yeni bir dosya açarsan `index.html` ve `sw.js` içine de ekle.

## Dosyalar

```
index.html            uygulama kabuğu
css/app.css           tasarım ve okunabilirlik ayarları
js/app.js             ders akışı, aralıklı tekrar, sesli okuma, konuşma simülasyonu
js/data/              ders içerikleri (konu başına bir dosya)
manifest.json, sw.js  telefona kurulum ve çevrimdışı çalışma
icons/                uygulama ikonları
```
