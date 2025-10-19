// ULTRA-FAST Service Worker für Praxis Dr. Kerim
// Aggressive Caching-Strategie für maximale Performance

const CACHE_NAME = 'praxis-kerim-v1.0.0';
const STATIC_CACHE = 'praxis-kerim-static-v1.0.0';
const IMAGE_CACHE = 'praxis-kerim-images-v1.0.0';
const API_CACHE = 'praxis-kerim-api-v1.0.0';

// Kritische Assets für sofortiges Laden
const CRITICAL_ASSETS = [
  '/',
  '/images/slider-poster.png',
  '/images/slider-poster2.png', 
  '/images/slider-poster3.png',
  '/images/logo.png',
  '/images/facebook-circle.png',
  '/images/linkedin-circle.png',
  '/_next/static/css/',
  '/_next/static/js/',
];

// Bilder für Offline-Caching
const IMAGE_ASSETS = [
  '/images/',
  '/_next/image/',
];

// API-Endpunkte
const API_ENDPOINTS = [
  '/api/',
];

// Installation - Cache kritische Assets
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker: Installation gestartet');
  
  event.waitUntil(
    Promise.all([
      // Statische Assets cachen
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('📦 Statische Assets werden gecacht...');
        return cache.addAll(CRITICAL_ASSETS.filter(url => !url.endsWith('/')));
      }),
      
      // Bilder-Cache vorbereiten
      caches.open(IMAGE_CACHE).then((cache) => {
        console.log('🖼️ Bild-Cache vorbereitet');
        return Promise.resolve();
      }),
      
      // API-Cache vorbereiten
      caches.open(API_CACHE).then((cache) => {
        console.log('🔌 API-Cache vorbereitet');
        return Promise.resolve();
      })
    ]).then(() => {
      console.log('✅ Service Worker: Installation abgeschlossen');
      return self.skipWaiting();
    })
  );
});

// Aktivierung - Alte Caches löschen
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Aktivierung gestartet');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== STATIC_CACHE && 
              cacheName !== IMAGE_CACHE && 
              cacheName !== API_CACHE) {
            console.log('🗑️ Alten Cache gelöscht:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Aktivierung abgeschlossen');
      return self.clients.claim();
    })
  );
});

// Fetch-Event - Intelligente Caching-Strategie
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Nur GET-Requests cachen
  if (request.method !== 'GET') {
    return;
  }
  
  // Strategie basierend auf Request-Typ
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
  } else {
    event.respondWith(handlePageRequest(request));
  }
});

// Bild-Requests - Cache First mit Network Fallback
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('🖼️ Bild aus Cache geladen:', request.url);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      console.log('🌐 Bild aus Netzwerk geladen und gecacht:', request.url);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('❌ Bild konnte nicht geladen werden:', request.url);
    return new Response('Bild nicht verfügbar', { status: 404 });
  }
}

// API-Requests - Network First mit Cache Fallback
async function handleAPIRequest(request) {
  const cache = await caches.open(API_CACHE);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      console.log('🔌 API-Response gecacht:', request.url);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('📱 API offline, versuche Cache:', request.url);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('API nicht verfügbar', { status: 503 });
  }
}

// Statische Assets - Cache First
async function handleStaticAsset(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('📦 Statisches Asset aus Cache:', request.url);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      console.log('🌐 Statisches Asset gecacht:', request.url);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('❌ Statisches Asset nicht verfügbar:', request.url);
    return new Response('Asset nicht verfügbar', { status: 404 });
  }
}

// Seiten-Requests - Network First mit Cache Fallback
async function handlePageRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      console.log('🌐 Seite aus Netzwerk geladen:', request.url);
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('📱 Offline, versuche Cache für Seite:', request.url);
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback zur Startseite
    const fallbackResponse = await cache.match('/');
    if (fallbackResponse) {
      return fallbackResponse;
    }
    
    return new Response('Seite nicht verfügbar', { status: 404 });
  }
}

// Helper-Funktionen
function isImageRequest(request) {
  return request.destination === 'image' || 
         request.url.includes('/images/') || 
         request.url.includes('/_next/image/');
}

function isAPIRequest(request) {
  return request.url.includes('/api/');
}

function isStaticAsset(request) {
  return request.destination === 'style' || 
         request.destination === 'script' || 
         request.destination === 'font' ||
         request.url.includes('/_next/static/') ||
         request.url.includes('.css') ||
         request.url.includes('.js') ||
         request.url.includes('.woff') ||
         request.url.includes('.woff2');
}

// Background Sync für Offline-Funktionalität
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background Sync ausgeführt');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Hier können Offline-Aktionen synchronisiert werden
  console.log('📡 Background Sync: Offline-Aktionen werden synchronisiert');
}

// Push-Notifications (für zukünftige Erweiterungen)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    console.log('📱 Push-Notification erhalten:', data);
    
    const options = {
      body: data.body,
      icon: '/images/logo.png',
      badge: '/images/logo.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

console.log('🚀 Praxis Dr. Kerim Service Worker geladen - Ultra-Fast Caching aktiviert!');
