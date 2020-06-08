self.addEventListener('install', event => {
  console.log('[Service Worker] Installed.');
});

self.addEventListener('push', event => {
  console.log('[Service Worker] Push received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}".`);

  const title = 'Push test';
  const options = {
    body: `Push message: "${event.data.text()}"`
    // TODO: add icon and badge
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  console.log(`[Service Worker] Notification click received.`);

  event.notification.close();

  event.waitUntil(clients.openWindow('http://localhost:5000/service-worker-push-notification'));
});

self.addEventListener('periodicsync', event => {
  console.log(event);
});

self.addEventListener('sync', event => {
  console.log(event);
  event.waitUntil(self.registration.showNotification('received sync event'));
});
