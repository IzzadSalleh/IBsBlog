var APP_PREFIX = 'IBsBlog'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
  '/IBsBlog/',                     // If you have separate JS/CSS files,
  '/IBsBlog/index.html',
  '/IBsBlog/post.html',
  '/IBsBlog/about.html',
  '/IBsBlog/vendor/bootstrap/css/bootstrap.min.css',
  '/IBsBlog/vendor/fontawesome-free/css/all.min.css',
  '/IBsBlog/https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic',
  '/IBsBlog/https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800',
  '/IBsBlog/css/clean-blog.min.css',
  '/IBsBlog/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/IBsBlog/js/clean-blog.min.js',
  '/IBsBlog/img/home-bg.png',
  '/IBsBlog/img/post-bg.png',
  '/IBsBlog/img/about-bg.png',
  '/IBsBlog/img/hvita.png',
  '/IBsBlog/img/oxara.png',
  '/IBsBlog/img/skoga.png',
  '/IBsBlog/img/icons',
            // add path to those files here
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})