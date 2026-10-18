/* Çevrimdışı çalışma: uygulama kabuğu önbelleğe alınır, sonraki açılışlar internetsiz çalışır. */
const VERSION = "aihear-en-v1.1.0";
const SHELL = [
  "./", "./index.html", "./manifest.json", "./css/app.css", "./js/app.js",
  "./js/data/topics.js", "./js/data/01-startup.js", "./js/data/02-aihear.js", "./js/data/03-tech.js",
  "./js/data/04-invest.js", "./js/data/05-comms.js", "./js/data/06-science.js", "./js/data/07-life.js",
  "./icons/icon-192.png", "./icons/icon-512.png"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (url.hostname === "api.anthropic.com") return;
  // Yazı tipleri: önce önbellek, yoksa ağ ve sakla
  if (url.hostname.includes("fonts.g")) {
    e.respondWith(caches.open(VERSION + "-fonts").then(async (c) => { const hit = await c.match(e.request); if (hit) return hit; try { const r = await fetch(e.request); if (r.ok) c.put(e.request, r.clone()); return r; } catch (err) { return hit || Response.error(); } }));
    return;
  }
  if (url.origin !== location.origin) return;
  // Uygulama dosyaları: önce ağ (güncel kalsın), olmazsa önbellek
  e.respondWith(fetch(e.request).then((r) => { if (r.ok) caches.open(VERSION).then((c) => c.put(e.request, r.clone())); return r; }).catch(() => caches.match(e.request).then((hit) => hit || caches.match("./index.html"))));
});
