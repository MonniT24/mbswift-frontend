const CACHE_NAME =
  "mbswift-cache-v2";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo192.png",
  "/logo512.png",
  "/sounds/new-order.mp3"
];

self.addEventListener(
  "install",
  (event) => {

    event.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache)=>
        cache.addAll(FILES_TO_CACHE)
      )
    );

    self.skipWaiting();
  }
);

self.addEventListener(
  "activate",
  (event) => {

    event.waitUntil(
      caches.keys()
      .then((keys)=>
        Promise.all(
          keys.map((key)=>{

            if(key !== CACHE_NAME){
              return caches.delete(key);
            }

            return null;
          })
        )
      )
    );

    self.clients.claim();
  }
);

self.addEventListener(
  "fetch",
  (event) => {

    if(event.request.method !== "GET"){
      return;
    }

    const requestUrl =
      new URL(event.request.url);

    if(
      requestUrl.pathname.includes("/api/") ||
      requestUrl.pathname.includes("/socket.io/")
    ){
      return;
    }

    event.respondWith(
      fetch(event.request)
      .then((response)=>{

        const responseClone =
          response.clone();

        caches.open(CACHE_NAME)
        .then((cache)=>{
          cache.put(
            event.request,
            responseClone
          );
        });

        return response;
      })
      .catch(()=>
        caches.match(event.request)
        .then((response)=>
          response || caches.match("/index.html")
        )
      )
    );
  }
);