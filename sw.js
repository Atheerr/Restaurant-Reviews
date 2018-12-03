var m_c = "my_cache";
var all = [
  './',
  'index.html',
  'restaurant.html',
  'css/Resetstyle.css',
  'css/styles_Atheer.css',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'restaurant.html?id=1',
  'restaurant.html?id=2',
  'restaurant.html?id=3',
  'restaurant.html?id=4',
  'restaurant.html?id=5',
  'restaurant.html?id=6',
  'restaurant.html?id=7',
  'restaurant.html?id=8',
  'restaurant.html?id=9',
  'restaurant.html?id=10',
];

// self.addEventListener('install', function(event) {
//    event.waitUntil(
//     caches.open(m_c)
//       .then(function(cache) {
//         return cache.addAll(all);
//       })
//   );
// });

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(m_c).then(function(cache) {
      cache.addAll(all);
      return cache.addAll(all);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheNames) {
          if ( m_c !== cacheNames) {
            return caches.delete(cacheNames);
           console.log('activate');

          }
        })
      );
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(m_c).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
//self.addEventListener('fetch', function(event) {
// event.respondWith(
//    caches.match(event.request).then(function(response) {
//        return response || fetch(event.request);
//        if (response) {
//          return response;
//        }
//        return fetch(event.request);
//      }
//    )
//  );
// });

//https://codelabs.developers.google.com/codelabs/offline/#0
//https://developers.google.com/web/fundamentals/primers/service-workers/#if_installation_fails_were_not_so_good_at_telling_you_about_it
