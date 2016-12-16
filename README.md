## 🐔🍕🍽 ServiceAwworkers

Just a fun little experiment to learn and teach ServiceWorkers.

### Getting Started

To get up and running, clone this repo and then run `npm start`. This will open a browser tab with the app running in the background.


#### From No-Offline to Offline-First

Checkout the following branches to see the app go from not working online at all to having some functionality offline.

**`git checkout stage-0`**

App does not work without a network connection. In chrome this results in the Chrome dino showing. This is a crappy user experience.

**`git checkout stage-1`**

Registered a serviceworker. Really simple to do, the code that registers it looks something like this:

```js
//  <script /> tag in the HTML:

//  Test if ServiceWorker is supported
if (navigator.serviceWorker) {
  //  Notice the nicely chained promise-like syntax
  navigator.serviceWorker
    //  Point to our serviceworker file
    //  pass it scope (ie: what files it's allowed to watch)
    .register('./serviceworker.js', { scope: './' })
    //  Success
    .then(function(reg) {
      console.info('ServiceWorker registered!');
    })
    //  Fail
    .catch(function(e) {
      console.warn('Error registering serviceworker', e);
    })
}
```

In the **Application** tab under ServiceWorkers in your dev tools, you will see that the serviceworker is indeed registered:

![serviceworker registered](http://i.imgur.com/b2Z1xvz.png)

But if you go offline, nothing happens until we add some code into the actual ServiceWorker itself. For now, let's make it log "ServiceWorkers are rad and so is this presentation" to the console.

```js
//  serviceworker.js
console.log('ServiceWorkers are rad and so is this presentation!');
```


Now open the app again with a network connection and you should see the message.
