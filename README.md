# reelcut

Published build of the local Reels editor, served from the root of `main` as the GitHub Pages user site: <https://djung4810-crypto.github.io>

GitHub Pages cannot set `Cross-Origin-Opener-Policy` or `Cross-Origin-Embedder-Policy`. `sw.js` adds those headers, and `coi-reload.js` reloads once so the threaded ONNX WASM used for subtitles can use `SharedArrayBuffer`. Import, cutting, and export do not need that isolation.

`.nojekyll` is present so Pages publishes every file, including `assets/__vite-browser-external-*.js`.
