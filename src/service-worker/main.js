if ('serviceWorker' in navigator) {
  console.log('Registering a service worker....');
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => {
      console.log('Service worker registered');
    })
    .catch(err => console.error(`Error registering service worker: ${err}`))
}
