/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-5199072c'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/_...all_-CU93WGHd.js",
    "revision": null
  }, {
    "url": "assets/_...all_-legacy-XwKuphIu.js",
    "revision": null
  }, {
    "url": "assets/index-CK3oXIpp.js",
    "revision": null
  }, {
    "url": "assets/index-D3ngO4xR.js",
    "revision": null
  }, {
    "url": "assets/index-DIi6hTck.js",
    "revision": null
  }, {
    "url": "assets/index-DjNKnUTh.js",
    "revision": null
  }, {
    "url": "assets/index-Dln868Ss.js",
    "revision": null
  }, {
    "url": "assets/index-DNFMjwom.js",
    "revision": null
  }, {
    "url": "assets/index-legacy-B5Rs47jS.js",
    "revision": null
  }, {
    "url": "assets/index-legacy-B8yS5uAC.js",
    "revision": null
  }, {
    "url": "assets/index-legacy-BYOQQNeI.js",
    "revision": null
  }, {
    "url": "assets/index-legacy-D-kN84Wx.js",
    "revision": null
  }, {
    "url": "assets/index-legacy-DJHQYHjB.js",
    "revision": null
  }, {
    "url": "assets/index-legacy-e9poKlEA.js",
    "revision": null
  }, {
    "url": "assets/polyfills-legacy-s2vd_U8d.js",
    "revision": null
  }, {
    "url": "assets/style-CX6ujepU.css",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "3432168c5480822847da5b5b08f22339"
  }, {
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "manifest.webmanifest",
    "revision": "df9614f0e39b0385032a8d446b580b42"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
