// Minimaler Service Worker – macht die Admin-PWA installierbar.
// Kein Offline-Cache in Phase 1, nur ein Passthrough-Fetch-Handler
// (von Chrome für die Installierbarkeits-Prüfung vorausgesetzt).
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
