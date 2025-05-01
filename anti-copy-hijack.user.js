// ==UserScript==
// @name         Browser Anti-Copy Hijack
// @namespace    https://github.com/paulomanrique/browser-anti-copy-hijack
// @version      1.0
// @description  Prevent websites from injecting unwanted content into your clipboard when copying text.
// @author       Paulo Manrique
// @match        https://f5.folha.uol.com.br/*
// @icon         https://raw.githubusercontent.com/paulomanrique/browser-anti-copy-hijack/master/icon.png
// @grant        none
// @run-at       document-start
// @license      Unlicense
// @updateURL    https://github.com/paulomanrique/browser-anti-copy-hijack/raw/master/anti-copy-hijack.user.js
// @downloadURL  https://github.com/paulomanrique/browser-anti-copy-hijack/raw/master/anti-copy-hijack.user.js
// ==/UserScript==

(function () {
    'use strict';

    // Block attempts to register 'copy' event listeners
    const origAdd = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type === 'copy') return;
        return origAdd.call(this, type, listener, options);
    };

    // Stop existing 'copy' handlers from running
    window.addEventListener('copy', e => e.stopImmediatePropagation(), true);

    // Neutralize document.oncopy
    Object.defineProperty(document, 'oncopy', {
        get: () => null,
        set: () => {},
        configurable: true
    });

    // Sanitize clipboardData.setData if used
    document.addEventListener('copy', function(e) {
        if (!e.clipboardData) return;
        const originalSet = e.clipboardData.setData;
        e.clipboardData.setData = function(format, text) {
            if (text && text.includes('Por favor utilize o link')) return;
            return originalSet.call(this, format, text);
        };
    }, true);
})();
