// GitHub Pages cannot send COOP/COEP. /sw.js adds them once it controls the
// document. This reloads a single time so SharedArrayBuffer becomes available
// for the threaded ONNX WASM used by subtitles. The editor itself does not
// wait on isolation: if the reload cannot isolate the page, it stops.
(function () {
  if (window.crossOriginIsolated !== false) return;
  if (!window.isSecureContext || !('serviceWorker' in navigator)) return;

  var storageKey = 'reelcut-coi-reload';

  function readFlag() {
    try {
      return sessionStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function writeFlag(value) {
    try {
      sessionStorage.setItem(storageKey, value);
    } catch (error) {
      // Private mode can block sessionStorage. The reload guard then no-ops.
    }
  }

  if (navigator.serviceWorker.controller) {
    writeFlag('gave-up');
    console.warn(
      'reelcut: this document is controlled by the service worker but is not cross-origin isolated. Cutting and export keep working. Threaded subtitle WASM needs SharedArrayBuffer and will fail.',
    );
    return;
  }

  if (readFlag() === 'gave-up') return;

  var reloading = false;
  function reloadOnce() {
    if (reloading) return;
    reloading = true;
    writeFlag('reloaded');
    window.location.reload();
  }

  navigator.serviceWorker.addEventListener('controllerchange', reloadOnce);

  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (registration) {
    if (registration.active && !navigator.serviceWorker.controller) reloadOnce();
  }).catch(function (error) {
    console.warn('reelcut: service worker registration failed', error);
  });
})();
