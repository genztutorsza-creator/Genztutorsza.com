// coop-sw.js
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(response => {
        const newHeaders = new Headers(response.headers);
        // This forces the browser to apply the header GitHub Pages blocks
        newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
        
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders
        });
      })
    );
  }
});
