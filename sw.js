const CACHE_NAME = "transport-tools-v2.0";
const ASSETS = [
  "./",
  "index.html",
  "resources.html",
  "styles.css?v=2.0",
  "app.js?v=2.0",
  "resources.js?v=2.0",
  "manifest.webmanifest",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
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
