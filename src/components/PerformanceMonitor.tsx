"use client";

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Performance-Monitoring für Caching-Effektivität
    if (typeof window !== 'undefined' && 'performance' in window) {
      
      // LCP (Largest Contentful Paint) messen
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        console.log('🚀 LCP Performance:', {
          lcp: lastEntry.startTime,
          element: lastEntry.element?.tagName,
          url: lastEntry.url,
          size: lastEntry.size
        });
        
        // Cache-Hit-Rate messen
        measureCacheHitRate();
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.log('LCP Observer nicht unterstützt');
      }
      
      // FCP (First Contentful Paint) messen
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('⚡ FCP Performance:', {
            fcp: entry.startTime,
            name: entry.name
          });
        });
      });
      
      try {
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (error) {
        console.log('FCP Observer nicht unterstützt');
      }
      
      // Service Worker Status prüfen
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          console.log('✅ Service Worker aktiv:', registration.scope);
          
          // Cache-Status prüfen
          checkCacheStatus();
        });
      }
      
      // Network-Informationen sammeln
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        console.log('🌐 Netzwerk-Info:', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData
        });
      }
    }
  }, []);

  const measureCacheHitRate = () => {
    // Cache-Hit-Rate basierend auf Resource Timing API
    if ('performance' in window && 'getEntriesByType' in performance) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      let cacheHits = 0;
      let totalRequests = 0;
      
      resources.forEach((resource) => {
        totalRequests++;
        
        // Cache-Hit wenn transferSize = 0 (aus Cache geladen)
        if (resource.transferSize === 0) {
          cacheHits++;
        }
      });
      
      if (totalRequests > 0) {
        const hitRate = (cacheHits / totalRequests) * 100;
        console.log('📊 Cache-Hit-Rate:', {
          hits: cacheHits,
          total: totalRequests,
          hitRate: `${hitRate.toFixed(2)}%`
        });
      }
    }
  };

  const checkCacheStatus = async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        console.log('💾 Verfügbare Caches:', cacheNames);
        
        // Cache-Größe schätzen
        for (const cacheName of cacheNames) {
          const cache = await caches.open(cacheName);
          const keys = await cache.keys();
          console.log(`📦 Cache "${cacheName}": ${keys.length} Einträge`);
        }
      } catch (error) {
        console.log('Cache-Status konnte nicht abgerufen werden');
      }
    }
  };

  return null; // Kein UI, nur Monitoring
}
