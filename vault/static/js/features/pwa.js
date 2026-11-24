/* Installable app (PWA): adds the manifest and registers sw.js. Works on http://localhost (Live Server) or https. */
document.head.insertAdjacentHTML('beforeend','<link rel="manifest" href="manifest.webmanifest"><meta name="theme-color" content="#8f00ff">');
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});
