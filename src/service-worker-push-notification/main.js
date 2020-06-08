// see: https://developers.google.com/web/fundamentals/codelabs/push-notifications

const applicationServerPublicKey = 'BPxx5zYNPeychehN_mxAODQ2Qo-5mymZp1UY1aFVLdZCf86MqIYvVNhdOaxe-H9jKj3YTd9_zXrDY0Tdj269gNA';
let serviceWorkerRegistration;
let isSubscribed;

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service worker and push are supported in this browser');

  navigator.serviceWorker.register('service-worker.js')
    .then(reg => {
      console.log('Service worker is registered');
      serviceWorkerRegistration = reg;

      reg.sync.register('test', { minInterval: 1000 });
      reg.periodicSync.register('test', { minInterval: 1000 })
        .catch(err => console.error(`Error registering periodicSync: ${err}`));

      // initializeUi();
    })
    .catch(error => console.error(`Service worker error: ${error}`));
} else {
  console.warn('Push messaging is not supported');
}

const toggleSubscribeButton = document.querySelector('#toggleSubscribe');
const initializeUi = () => {
  toggleSubscribeButton.addEventListener('click', () => {
    toggleSubscribeButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  // set initial subscription value
  serviceWorkerRegistration.pushManager.getSubscription()
    .then(sub => {
      isSubscribed = !(sub === null);

      updateSubscriptionOnServer(sub);

      if(isSubscribed)
        console.log('User is subscribed.');
      else
        console.log('User isn\'t subscribed');

      updateButton();
    });
};

const unsubscribeUser = () => {
  serviceWorkerRegistration.pushManager.getSubscription()
    .then(sub => {
      if(sub)
        return sub.unsubscribe()
    })
    .catch(err => console.error(`Error unsubscribing: ${err}`))
    .then(() => {
      updateSubscriptionOnServer(null);

      console.log('User is unsubscribed.');
      isSubscribed = false;
      updateButton();
    });
};

const subscribeUser = () => {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  serviceWorkerRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then(sub => {
      console.log('User is subscribed.');

      updateSubscriptionOnServer(sub);

      isSubscribed = true;
      updateButton();
    })
    .catch(err => {
      console.log(`Failed to subscribe the user: ${err}`);
      updateButton();
    })
};

const updateSubscriptionOnServer = subscription => {
  // TODO;

  console.log(JSON.stringify(subscription));
};

const updateButton = () => {
  if(Notification.permission === 'denied') {
    toggleSubscribeButton.textContent = 'Push messaging blocked.';
    toggleSubscribeButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  toggleSubscribeButton.textContent = `${isSubscribed ? 'Disable' : 'Enable'} push messaging`;
  toggleSubscribeButton.disabled = false;
};

const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
