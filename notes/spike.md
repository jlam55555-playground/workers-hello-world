# Spike: sending an alarm to the user
All of the below solutions are available for sending an asynchronous notification to the user (at least on desktop implementations of Google Chrome). It's conceivable that we architect some combination of the below, not only use one option.

### Option 1: Chrome extension
(See [List of JS APIs for Browser Extensions][1])

Relevant:
- Alarms API: set a timer to execute some code at some point in the future
- Notifications API: send the user a notification
- Background scripts or service workers to perform the alarm, even when browser is not running

Benefits:
- Relatively similar implementations across browsers if we wanted to port this to Firefox or Opera as well (see [this][3]) (probably not relevant to us if we deploy it in a uniform manner)
- Can create an launch button that easy to access in the browser, to launch a modal/popover.
- Same Notifications API as with the service workers.

Hurdles:
- Harder to deploy
- APIs not available in a normal web application

Resources:
- [Getting started with Chrome extensions][7]
- [Alarms API documentation][8]
- [MDN specification for alarms API][9]
- [Using service workers in Chrome extensions][16]
- [`background` permission to run extension in background][20]

### Option 2: Service workers and Push Notifications
Introduction to "Workers": (see [Introduction to Push Notifications][2]):
- Separate process for extra work (like a worker thread), separate from main application thread
- Web workers (dedicated and shared) require a running instance of the website, but service workers do not
- Service workers have the ability to run offline, and also are able to intercept and modify any requests going in and out of the web application; however, they are often asleep, and need to be woken up by specific handlers (e.g., from the website directly, from push notifications (this option), or by sync events (next option))

Relevant:
- Uses Push API (Web Push) and Notifications API, both available to service workers

Benefits:
- Doesn't require a Chrome extension, available from a normal web application
- Available on mobile platforms as well, and good support across browsers (see [this][4] and [this][5] for support information)
- Already widely in use for push notifications (e.g., Facebook notifications)

Hurdles:
- Requires a connection to the internet (to the push notification server) and a backend (to send notifications to the push notification server). (If we'll need a backend eventually this should be not be a problem for long term development.)
- Not entirely sure about the implementation of Web Push -- may be hurdles if long polling requests are involved and the network administrator blocks it (which may be the case at ESI)

Resources:
- [Tutorial for Push notifications][6]
- [Google Cloud Messenging (the push server)][17]
- [Push notification and service worker tutorial/lab][18] (this is used in this repo)
- [Intro to Web Push and Notifications][19]

### Option 3: Service workers and Periodic Sync Events
Service workers can be set up to perform "sync" events at certain intervals (e.g., to retrieve information about from a server, such as to cache a news feed at regular intervals, so that when the user opens the web application it can load from that cache for a faster load). We can exploit this for an alarm like capability.

Benefits:
- Doesn't require a connection to the Internet or a backend

Hurdles:
- Hacky; not its intended use
- May not work well with the sleep capabilities of devices; see [this][10]
- Very new -- requires Chrome 80+ (80 is the current version)
- Requires installation as a PWA for permissions to work

Resources:
- ["Richer offline experiences with the Periodic BackgroundSync API"][12]
- [MDN documentation for periodicSync API][13]
- [Explainers for background sync and periodicSync][14]
- [periodicSync demos][15]

### Option 4: Native alternatives
In all three of the above options, we attempt to use Google Chrome as a desktop-like application outside of web browsing (like an alarm), which it was never really intended to do. Also, some of these methods (e.g., Chrome extensions) are rigid to using the desktop, but it may be better to have cross-platform tools (e.g., apps for a personal phone). Using programming environments for the OS may be better suited to this: easier (or at least more standard) to deploy, more performant, less hacky, more accurate (timing), ability to wake from sleep mode, etc.

Some platforms that could work are:
- [Ionic Framework][11]: builds a native mobile app from a web app
- Java(FX): cross-desktop platform
- [Electron][21]: turn a web-app into a standalone desktop app

[1]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs
[2]: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
[3]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension
[4]: https://caniuse.com/#feat=serviceworkers
[5]: https://jakearchibald.github.io/isserviceworkerready/
[6]: https://github.com/GoogleChromeLabs/web-push-codelab
[7]: https://developer.chrome.com/extensions/getstarted
[8]: https://developer.chrome.com/apps/alarms
[9]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms
[10]: https://stackoverflow.com/a/39211376/2397327
[11]: https://ionicframework.com/
[12]: https://web.dev/periodic-background-sync/
[13]: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/periodicSync
[14]: https://github.com/WICG/background-sync/tree/master/explainers
[15]: https://www.chromestatus.com/feature/5689383275462656#:~:text=Periodic%20Background%20Sync%20is%20an,periodic%20intervals%20with%20network%20connectivity.&text=At%20present%2C%20sites%20can%20achieve,up%20a%20server%20for%20that.
[16]: https://developer.chrome.com/extensions/migrating_to_service_workers?fbclid=IwAR1NG1gkx01-UEMLcYRSDB66Cp2Hv-ZBulFb7p09rPWf4Mk1ZXhEgr69Xb8
[17]: https://en.wikipedia.org/wiki/Google_Cloud_Messaging
[18]: https://developers.google.com/web/fundamentals/codelabs/push-notifications
[19]: https://youtu.be/ggUY0Q4f5ok
[20]: https://stackoverflow.com/a/35587771/2397327
[21]: https://www.electronjs.org/
