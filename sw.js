/* Çevrimdışı çalışma. Uygulama kabuğu ve tüm seviye içerikleri kurulumda önbelleğe alınır.
   Yeni sürüm hazır olduğunda sayfa kullanıcıya sorar; onaylarsa "skipWaiting" mesajı gelir. */
const VERSION = "aihear-en-2.1.0";
const FONT_CACHE = "aihear-en-fonts";
const SHELL = [
  "./", "./index.html", "./privacy.html", "./manifest.json", "./css/app.css", "./js/app.js",
  "./content/catalog.js", "./content/placement.js", "./content/story.js",
  "./content/levels/A1.js", "./content/levels/A2.js", "./content/levels/B1.js",
  "./content/levels/B2.js", "./content/levels/C1.js", "./content/levels/C2.js",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"
];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL))); });
self.addEventListener("message", (e) => { if (e.data === "skipWaiting") self.skipWaiting(); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== FONT_CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONT_CACHE).then(async (c) => {
      const hit = await c.match(req);
      const net = fetch(req).then((r) => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // Önce önbellek (hızlı açılış), arka planda tazele. Sayfa gezintisi çevrimdışıysa index.html.
  e.respondWith(caches.open(VERSION).then(async (c) => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then((r) => { if (r.ok && r.type === "basic") c.put(req, r.clone()); return r; });
    if (hit) { net.catch(() => {}); return hit; }
    try { return await net; }
    catch (err) { return (req.mode === "navigate" && (await c.match("./index.html"))) || Response.error(); }
  }));
});
