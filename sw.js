importScripts('https://cdnjs.cloudflare.com/ajax/libs/localforage/1.9.0/localforage.min.js');

let cache_name = 'hacker-news-clone-v1';
let urls_to_cache = [
  '/',
  '/src/main.js',
  '/public/logo.png',
  '/src/store/pagination.js',
  '/src/store/search.js',
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

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

async function getLocalforageData(key) {
  return await localforage.getItem(key);
}

async function cacheLocalforageData(key, data) {
  await localforage.setItem(key, data);
}

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.pathname.includes('apiService.js')) {
    return;
  }

  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(event.request);
          const clonedResponse = networkResponse.clone();
          const data = await clonedResponse.json();

          let cacheKey;

          if (url.pathname === '/v0/topstories.json') {
            cacheKey = 'top-stories';
          } else if (url.pathname.startsWith('/v0/item/')) {
            const postId = url.pathname.split('/').pop();
            cacheKey = `post-${postId}`;
          } else if (url.pathname.includes('comments')) {
            const postId = url.pathname.split('/').pop();
            cacheKey = `post-comments-${postId}`;
          } else {
            cacheKey = 'api-cache';
          }

          cacheLocalforageData(cacheKey, data);
          return networkResponse;
        } catch (error) {
          console.log('Network request failed, trying to retrieve from cache', error);

          let cacheKey;

          if (url.pathname === '/v0/topstories.json') {
            cacheKey = 'top-stories';
          } else if (url.pathname.startsWith('/v0/item/')) {
            const postId = url.pathname.split('/').pop();
            cacheKey = `post-${postId}`;
          } else if (url.pathname.includes('comments')) {
            const postId = url.pathname.split('/').pop();
            cacheKey = `post-comments-${postId}`;
          } else {
            cacheKey = 'api-cache';
          }

          const cachedData = await getLocalforageData(cacheKey);
          if (cachedData) {
            return new Response(JSON.stringify(cachedData), { headers: { 'Content-Type': 'application/json' } });
          } else {
            return new Response('Offline and no cache available', { status: 503 });
          }
        }
      })()
    );
  }
});
