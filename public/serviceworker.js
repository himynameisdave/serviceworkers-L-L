
// all urls will be added to cache
function cacheAssets( assets ) {
  return new Promise( function (resolve, reject) {
    // open cache
    caches.open('assets')
      .then(cache => {
        // the API does all the magic for us
        cache.addAll(assets)
          .then(() => {
            console.log('all assets added to cache')
            resolve()
          })
          .catch(err => {
            console.log('error when syncing assets', err)
            reject()
          })
      }).catch(err => {
        console.log('error when opening cache', err)
        reject()
      })
  });
}

var assets = [
  './static/css/main.59ea01ab.css',
  './static/js/main.2b741599.js'
]; // list of urls to be cached

// cache responses of provided urls
cacheAssets(assets)
  .then(() => {
      console.log('All assets cached')
  });


// this is the service worker which intercepts all http requests
self.addEventListener('fetch', function fetcher (event) {
  var request = event.request;

  // contentful asset detected
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // return from cache, otherwise fetch from network
      return response || fetch(request);
    })
  );
});
