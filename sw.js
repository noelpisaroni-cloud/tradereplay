// TradeReplay als App (Home-Bildschirm): startet auch ohne Internet.
// - App-Seite: zuerst aus dem Netz (damit Updates ankommen), ohne Netz aus dem Speicher
// - Kursdaten, Chart-Bibliothek, Symbole: einmal geladen, dann aus dem Speicher (ohne Netz sofort da)
const VERSION = 'tr-v1';
const SHELL = 'tr-shell-' + VERSION, DATA = 'tr-data-v1';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'lib/lightweight-charts-4.1.3.js', 'sym_EURUSD.js', 'sym_PAXGUSDT.js'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const shell = await caches.open(SHELL), data = await caches.open(DATA);
    // einzeln, damit eine fehlende Datei nicht die ganze Installation abbricht
    await Promise.all(CORE.map(async u => { try{ const r = await fetch(u, { cache:'reload' }); if(r.ok) await (/\.(js|png)$/.test(u) && u !== 'sw.js' ? data : shell).put(u, r); }catch(err){} }));
    self.skipWaiting();
  })());
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for(const k of await caches.keys()) if(k.startsWith('tr-shell-') && k !== SHELL) await caches.delete(k);
    await self.clients.claim();
  })());
});

const withTimeout = (p, ms) => new Promise((res, rej) => { const t = setTimeout(() => rej(new Error('timeout')), ms); p.then(v => { clearTimeout(t); res(v); }, err => { clearTimeout(t); rej(err); }); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;
  const path = url.pathname.split('/').pop() || 'index.html';
  if(req.mode === 'navigate' || path === 'index.html' || path === 'manifest.webmanifest'){
    // Seite: Netz zuerst (max. 6 s), sonst gespeicherte Fassung
    e.respondWith((async () => {
      const shell = await caches.open(SHELL);
      try{
        const r = await withTimeout(fetch(req), 6000);
        if(r && r.ok) await shell.put(path === 'manifest.webmanifest' ? 'manifest.webmanifest' : 'index.html', r.clone());
        return r;
      }catch(err){
        return (await shell.match(path === 'manifest.webmanifest' ? 'manifest.webmanifest' : 'index.html')) || (await shell.match('./')) || Response.error();
      }
    })());
    return;
  }
  if(/\.(js|png)$/.test(path) && path !== 'sw.js'){
    // Daten/Bibliothek: aus dem Speicher; sym_*.js (neuere Daten) im Hintergrund auffrischen
    e.respondWith((async () => {
      const data = await caches.open(DATA), key = path === 'lightweight-charts-4.1.3.js' ? 'lib/' + path : path;
      const hit = await data.match(key);
      const refresh = fetch(new Request(url.pathname, { cache:'no-cache' })).then(async r => { if(r && r.ok) await data.put(key, r.clone()); return r; });
      if(hit){ if(/^sym_/.test(path)) e.waitUntil(refresh.catch(() => {})); return hit; }
      try{ return await refresh; }catch(err){ return Response.error(); }
    })());
  }
});
