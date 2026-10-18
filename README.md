# AIHEAR English

İngilizceyi kendi işinle öğren. Girişimciler için, disleksi dostu bir İngilizce uygulaması.
Yatırımcı sunumu, ürün demosu, sertifikasyon, ekip yönetimi ve yurt dışında hayat.
**Her ders A1'den C2'ye altı seviyede yazıldı:** aynı hikâye, senin seviyende.

![Ana sayfa](screenshots/home.png)

## Özellikler

- **32 ders × 6 seviye = 192 metin.** 9 konu: girişimcilik, AIHEAR ve medikal teknoloji, yatırım, yapay zekâ, profesyonel iletişim, yurt dışında yaşam, bilim, gelecek ve etik, seyahat ve verimlilik.
- **Seviye modu (A1–C2).** Üst çubuktaki seviye düğmesiyle tüm uygulama değişir. Bir metin zor gelirse “Daha kolay” ile aynı hikâyeyi bir alt seviyede okursun. Son üç dersi %90'ın üstünde bitirirsen uygulama bir üst seviyeyi önerir.
- **Seviye testi.** 2 dakikalık uyarlanır test, rahat okuyabileceğin seviyeyi önerir.
- **Her derste 5 adım:** metin, kelimeler ve dil yapısı, anlama, kullanım (boşluk doldurma, cümle kurma, çeviri), konuşma simülasyonu.
- **Disleksi için tasarlandı.** Lexend ve Atkinson Hyperlegible yazı tipleri, dört yazı boyutu, geniş satır ve harf aralığı, yumuşak zemin renkleri, her kartta tek cümle, sesli okurken kelime kelime vurgulama, tek cümlelik odak modu, harf yer değiştirmesi gibi yazım hatalarını kabul eden kontrol, yazmak yerine seçerek cevaplama.
- **Aralıklı tekrar.** Kelimeler unutma eğrisine göre geri gelir. İngilizce→Türkçe ve Türkçe→İngilizce kartlar.
- **İlerleme.** Günlük hedef, seri, 14 günlük grafik, seviyelere göre ilerleme, rozetler.
- **İsteğe bağlı canlı yapay zekâ.** Bir Anthropic API anahtarı girersen konuşma adımındaki kişi seçtiğin seviyede canlı konuşur ve cümleni düzeltir.
- **Gizlilik.** Hesap yok, sunucu yok, izleme yok. Her şey cihazda kalır. Bkz. [privacy.html](privacy.html).
- **Çevrimdışı çalışır**, telefona uygulama olarak kurulur (PWA).

## Yayınlama (GitHub Pages)

1. Bu dalı `main` ile birleştir.
2. GitHub'da **Settings → Pages → Source: GitHub Actions** seç.
3. `main`'e her gönderimde `.github/workflows/pages.yml` içeriği doğrular ve yalnızca uygulama dosyalarını yayınlar.
4. Adres: `https://<kullanıcı-adı>.github.io/<depo-adı>/`

Telefona kurulum:

- **iPhone (Safari):** adresi aç → Paylaş → **Ana Ekrana Ekle**.
- **Android (Chrome):** adresi aç → menü → **Uygulamayı yükle**.

Uygulama mağazaları için: yayınlanan adresi [PWABuilder](https://www.pwabuilder.com) ile Google Play (TWA) ve App Store paketine dönüştürebilirsin. Manifest, ikonlar (maskable dahil), ekran görüntüleri ve gizlilik politikası hazır.

## Geliştirme

Derleme adımı yok; düz HTML, CSS ve JavaScript. Node 20+ sadece araçlar ve testler için gerekir.

```bash
npm install                      # Playwright (testler için)
npx playwright install chromium  # bir kez
npm run serve                    # http://localhost:8080
npm run check                    # dersleri doğrula, paketler güncel mi kontrol et
npm test                         # tarayıcıda uçtan uca testler
```

Diğer komutlar:

```bash
npm run build                          # content/src → content/catalog.js + content/levels/*.js
npm run icons                          # ikonları yeniden üret
node tools/screenshots.mjs             # mağaza ekran görüntüleri ve icons/og.png
node tools/build-single.mjs out.html   # tek dosyalık sürüm (tüm seviyeler gömülü)
```

## İçerik

Her ders `content/src/<id>.json` dosyasında, altı seviyesiyle birlikte durur. Yazım kuralları, seviye hedefleri ve tüm derslerde tutarlı kalması gereken bilgiler [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) içinde.

Yeni ders eklemek için:

1. `content/src/<id>.json` dosyasını rehbere göre yaz. Öğrencinin adı için `{name}` kullan.
2. Kimliği `content/curriculum.json` içindeki `order` listesine ekle.
3. `npm run validate` ile hataları düzelt, sonra `npm run build`.

`tools/validate.mjs` her seviye için cümle uzunluğunu, kelime ve soru sayılarını, cevap indekslerini, boşluk ve çeviri anahtarlarını kontrol eder. CI, doğrulama ve testler geçmeden yayınlamaz.

## Dosyalar

```
index.html, privacy.html, manifest.json, sw.js   uygulama kabuğu, gizlilik, PWA
css/app.css                                      tasarım ve okunabilirlik ayarları
js/app.js                                        uygulama (yönlendirme, dersler, tekrar, ses, ayarlar)
content/src/*.json                               ders kaynakları (düzenlenen dosyalar)
content/catalog.js, content/levels/*.js          derlenmiş içerik (elle düzenleme)
content/placement.js                             seviye testi soruları
tools/                                           doğrulama, derleme, ikon ve ekran görüntüsü araçları
tests/e2e.mjs                                    uçtan uca testler
docs/CONTENT_GUIDE.md                            içerik yazım rehberi
```
