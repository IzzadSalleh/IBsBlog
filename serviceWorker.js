const staticIBblog = "ib-blog-site-v1";

const assets = [
    "/",
    "/index.html",
    "/post.html",
    "/about.html",
    "/vendor/bootstrap/css/bootstrap.min.css",
    "/vendor/fontawesome-free/css/all.min.css",
    "https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic",
    "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800",
    "/css/clean-blog.min.css",
    "/vendor/bootstrap/js/bootstrap.bundle.min.js",
    "/js/clean-blog.min.js",
    "/img/home-bg.png",
    "/img/post-bg.png",
    "/img/about-bg.png",
    "/img/hvita.png",
    "/img/oxara.png",
    "/img/skoga.png",
  ];


self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(staticIBblog).then(cache => {
        cache.addAll(assets)
      })
    )
  });

  self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  });