// Service Worker for PROJECT OMEGA Portfolio
const CACHE_NAME = 'omega-portfolio-v11';
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
'/images/variable-analysis.png',
'/images/freecad-tensigrity.png',
];

self.addEventListener('install',e=>{
e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));
self.skipWaiting();
});

self.addEventListener('activate',e=>{
e.waitUntil(caches.keys().then(keys=>
Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
);
self.clients.claim();
});

self.addEventListener('fetch',e=>{
const cached=caches.match(e.request);
const fetched=fetch(e.request).then(r=>{
const clone=r.clone();
caches.open(CACHE_NAME).then(c=>c.put(e.request,clone));
return r;
}).catch(()=>cached);
e.respondWith(cached || fetched);
});
