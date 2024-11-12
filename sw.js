let cache_name = 'hacker-news-clone-v1';
let urls_to_cache = [
  '/',
  '/src/main.js',
  '/public/logo.png',
  '/src/store/pagination.js',
  '/src/assets/main.css',
  '/src/assets/logo.png',
  '/src/router/index.js',
  '/index.html',
  '/apiService.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cache_name).then((cache) => {
      return cache.addAll(urls_to_cache);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cache_name) {
            return caches.delete(name);  // Delete old cache
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((response) => {
    if (response)
      return response;
    else
      return fetch(e.request);
  }));
});