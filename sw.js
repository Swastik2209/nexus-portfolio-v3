// Service Worker for PROJECT OMEGA Portfolio
const CACHE_NAME = 'omega-portfolio-v2';
const ASSETS = [
'/',
'/index.html',
'/photo.jpg',
'/images/lab-report-torricelli.png',
'/images/pendulum-analysis.png',
'/images/indifference-curves.png',
'/images/growth-chart.png',
'/images/unemployment-chart.png',
'/images/force-experiment.jpeg',
'/images/gaussmeter.jpeg',
'/images/variable-analysis.png'
];

self.addEventListener('install', e => {
e.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
);
self.skipWaiting();
});

self.addEventListener('activate', e => {
e.waitUntil(
caches.keys().then(keys => 
Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
)
);
self.clients.claim();
});

self.addEventListener('fetch', e => {
if(e.request.method !== 'GET') return;
e.respondWith(
caches.match(e.request).then(cached => {
const fetchPromise = fetch(e.request).then(network => {
if(network.ok){
const clone = network.clone();
caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
}
return network;
}).catch(() => cached);
return cached || fetchPromise;
})
);
});