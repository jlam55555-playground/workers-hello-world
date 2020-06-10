const version = 5;

self.addEventListener('install', event => {
  console.log('Install event at ' + new Date().toLocaleDateString());
  console.log(`Installation v${version}`);
  self.skipWaiting();
  // self.skipWaiting();
  // event.waitUntil(self.skipWaiting());
  // const p = new Promise(resolve => resolve());
  // event.waitUntil(p);
});

self.addEventListener('activate', event => {
  console.log('Activate event at ' + new Date().toLocaleDateString());
  console.log(`Activation v${version}`);
  // const p = new Promise(resolve => resolve());
  // event.waitUntil(p);
});

self.addEventListener('fetch', event => {
  // if we know we're offline
  if (!navigator.onLine) {
    event.respondWith(new Response('<h1>Offline :( </h1>', {
      headers: {
        'Content-Type': 'text/html'
      }
    }));
  } else {
    console.log(event.request.url);
    event.respondWith(fetch(event.request));
  }
});
