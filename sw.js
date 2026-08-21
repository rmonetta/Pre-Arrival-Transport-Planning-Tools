const CACHE_NAME = "transport-tools-v2.4";
const ASSETS = [
  "./",
  "index.html",
  "resources.html",
  "styles.css?v=2.4",
  "app.js?v=2.4",
  "resources.js?v=2.4",
  "manifest.webmanifest",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/images/hamilton-t1.png",
  "assets/images/bipap-mask.png",
  "assets/images/h900.png",
  "assets/images/adult-cannula.png",
  "assets/images/lifepak-35.png",
  "assets/images/northwell-ems-logo-white.png",
  "assets/guides/hamilton-t1-initial-preop-checks.pdf",
  "assets/guides/hamilton-t1-intubated-patient-setup.pdf",
  "assets/guides/hamilton-t1-bipap-cpap-setup.pdf",
  "assets/guides/hamilton-t1-heated-humidified-bipap-cpap.pdf",
  "assets/guides/heated-humidified-hfnc-setup.pdf",
  "assets/guides/lifepak-35-invasive-monitoring-setup.pdf"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then(cached => cached || caches.match("index.html")))
  );
});
