// ==UserScript==
// @name         Browser Anti-Copy Hijack
// @namespace    https://github.com/paulomanrique/browser-anti-copy-hijack
// @version      1.2
// @description  Prevent websites from injecting unwanted content into your clipboard when copying text.
// @author       Paulo Manrique
// @match        https://*.uol.com.br/*
// @match        https://*.globo.com/*
// @match        https://*.cartacapital.com.br/*
// @match        https://www.cbsnews.com/*
// @match        https://revistaoeste.com/*
// @match        https://www.terra.com.br/*
// @match        https://www.gazetadopovo.com.br/*
// @match        https://www.poder360.com.br/*
// @match        https://agenciabrasil.ebc.com.br/*
// @match        https://www.nexojornal.com.br/*
// @match        https://www.indiatimes.com/*
// @icon         https://raw.githubusercontent.com/paulomanrique/browser-anti-copy-hijack/master/icon.png
// @grant        none
// @run-at       document-start
// @license      Unlicense
// @updateURL    https://github.com/paulomanrique/browser-anti-copy-hijack/releases/latest/download/anti-copy-hijack.user.js
// @downloadURL  https://github.com/paulomanrique/browser-anti-copy-hijack/releases/latest/download/anti-copy-hijack.user.js
// ==/UserScript==

(function () {
  "use strict";

  // Block attempts to register 'copy' event listeners
  const origAdd = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (type === "copy") return;
    return origAdd.call(this, type, listener, options);
  };

  // Stop existing 'copy' handlers from running
  window.addEventListener("copy", (e) => e.stopImmediatePropagation(), true);

  // Neutralize document.oncopy
  Object.defineProperty(document, "oncopy", {
    get: () => null,
    set: () => {},
    configurable: true,
  });

  // Sanitize clipboardData.setData if used
  document.addEventListener(
    "copy",
    function (e) {
      if (!e.clipboardData) return;
      const originalSet = e.clipboardData.setData;
      e.clipboardData.setData = function (format, text) {
        if (text && text.includes("Por favor utilize o link")) return;
        return originalSet.call(this, format, text);
      };
    },
    true,
  );
})();

// Removes the select-none effect on revistaoeste.com
if (location.hostname.includes('revistaoeste.com')) {
  const style = document.createElement('style');
  style.innerHTML = `
      * {
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
          user-select: text !important;
      }
  `;
  document.documentElement.appendChild(style);
}
// Removes the select-none effect on gazeta do povo
