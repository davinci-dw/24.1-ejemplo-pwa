const LISTA = [
    '/',
    '/index.js',
    'main.css'
];

self.addEventListener('install', (e) => {
    console.log("install");
    const cache = caches.open('fitoApp').then((cache) => {
        cache.addAll(LISTA);
    })
    e.waitUntil(cache);
})