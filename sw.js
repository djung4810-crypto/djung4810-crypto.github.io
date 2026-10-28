/* GitHub Pages cannot send COOP/COEP. The threaded ONNX WASM
   (ort-wasm-simd-threaded) allocates a shared WebAssembly.Memory even when
   ONNX falls back to one thread, so subtitles need cross-origin isolation.
   Workbox still serves the precache; this only adds the isolation headers. */
(function () {
  var respondWith = FetchEvent.prototype.respondWith;
  function isolate(response) {
    if (!response || response.status === 0) return response;
    if (response.type === 'opaque' || response.type === 'opaqueredirect') return response;
    if (response.status === 204 || response.status === 205 || response.status === 304) return response;
    if (response.status >= 300 && response.status < 400) return response;
    var headers = new Headers(response.headers);
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    if (!headers.has('Cross-Origin-Resource-Policy')) {
      headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers,
    });
  }
  FetchEvent.prototype.respondWith = function (value) {
    var wrapped = Promise.resolve(value).then(function (response) {
      try {
        return isolate(response);
      } catch (error) {
        console.error('reelcut: could not add isolation headers', error);
        return response;
      }
    });
    return respondWith.call(this, wrapped);
  };
})();
if(!self.define){let e,s={};const n=(n,r)=>(n=new URL(n+".js",r).href,s[n]||new Promise(s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()}).then(()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e}));self.define=(r,l)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let o={};const t=e=>n(e,i),a={module:{uri:i},exports:o,require:t};s[i]=Promise.all(r.map(e=>a[e]||t(e))).then(e=>(l(...e),o))}}define(["./workbox-9c191d2f"],function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"index.html",revision:"6c4fe3bc602a935caade4bdf9bf52ff3"},{url:"coi-reload.js",revision:"be12d14adc2f3a2eaf5d7718a943a61e"},{url:"favicon.svg",revision:"71007eea3be6a9450977be6afd5e7d12"},{url:"icons/icon-512.png",revision:"7fee921308baf046ea6c0b0f44a682df"},{url:"icons/icon-192.png",revision:"01526e26b43feb1c294690051b619a6c"},{url:"assets/workbox-window.prod.es5-BBnX5xw4.js",revision:null},{url:"assets/whisper.worker-BlwfgDBP.js",revision:null},{url:"assets/transcribe-C345Y_p9.js",revision:null},{url:"assets/mediabunny-aac-encoder-BGv7ITpg.js",revision:null},{url:"assets/inter-vietnamese-800-normal-Cm7tD1pz.woff2",revision:null},{url:"assets/inter-vietnamese-700-normal-DlLaEgI2.woff2",revision:null},{url:"assets/inter-vietnamese-600-normal-Cc8MFFhd.woff2",revision:null},{url:"assets/inter-vietnamese-400-normal-DMkecbls.woff2",revision:null},{url:"assets/inter-latin-ext-800-normal-DZJjya6U.woff2",revision:null},{url:"assets/inter-latin-ext-700-normal-Ca8adRJv.woff2",revision:null},{url:"assets/inter-latin-ext-600-normal-D2bJ5OIk.woff2",revision:null},{url:"assets/inter-latin-ext-400-normal-C1nco2VV.woff2",revision:null},{url:"assets/inter-latin-800-normal-BYj_oED-.woff2",revision:null},{url:"assets/inter-latin-700-normal-Yt3aPRUw.woff2",revision:null},{url:"assets/inter-latin-600-normal-LgqL8muc.woff2",revision:null},{url:"assets/inter-latin-400-normal-C38fXH4l.woff2",revision:null},{url:"assets/inter-greek-ext-800-normal-B--PVpEC.woff2",revision:null},{url:"assets/inter-greek-ext-700-normal-qfdV9bQt.woff2",revision:null},{url:"assets/inter-greek-ext-600-normal-DRtmH8MT.woff2",revision:null},{url:"assets/inter-greek-ext-400-normal-DGGRlc-M.woff2",revision:null},{url:"assets/inter-greek-800-normal-CLIouy3y.woff2",revision:null},{url:"assets/inter-greek-700-normal-C3JjAnD8.woff2",revision:null},{url:"assets/inter-greek-600-normal-plRanbMR.woff2",revision:null},{url:"assets/inter-greek-400-normal-B4URO6DV.woff2",revision:null},{url:"assets/inter-cyrillic-ext-800-normal-BZOjs1Xv.woff2",revision:null},{url:"assets/inter-cyrillic-ext-700-normal-BjwYoWNd.woff2",revision:null},{url:"assets/inter-cyrillic-ext-600-normal-Dfes3d0z.woff2",revision:null},{url:"assets/inter-cyrillic-ext-400-normal-BQZuk6qB.woff2",revision:null},{url:"assets/inter-cyrillic-800-normal-C7MGvYyJ.woff2",revision:null},{url:"assets/inter-cyrillic-700-normal-CjBOestx.woff2",revision:null},{url:"assets/inter-cyrillic-600-normal-CWCymEST.woff2",revision:null},{url:"assets/inter-cyrillic-400-normal-obahsSVq.woff2",revision:null},{url:"assets/index-C6rU4VX6.js",revision:null},{url:"assets/index-BHbMoqE_.css",revision:null},{url:"assets/audioMix-D_1hDj4D.js",revision:null},{url:"assets/__vite-browser-external-BIHI7g3E.js",revision:null},{url:"assets/ExportDialog-8binNcD2.js",revision:null},{url:"favicon.svg",revision:"71007eea3be6a9450977be6afd5e7d12"},{url:"icons/icon-192.png",revision:"01526e26b43feb1c294690051b619a6c"},{url:"icons/icon-512.png",revision:"7fee921308baf046ea6c0b0f44a682df"},{url:"manifest.webmanifest",revision:"f3f569644f4e24c0ad9e65a1058814bd"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))});
