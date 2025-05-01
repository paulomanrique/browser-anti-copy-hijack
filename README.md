## 📋 Browser Anti-Copy Hijack

This userscript protects your clipboard from websites that try to hijack your copied text by injecting copyright notices or unwanted messages when you press `CTRL+C`.

### ✨ What It Does

- Blocks malicious or unnecessary `copy` event listeners.
- Prevents inline clipboard tampering via `document.oncopy`.
- Neutralizes `clipboardData.setData` when used to inject junk.
- Targets only a curated list of abusive websites — safe by default.

### ✅ Supported Websites

The script only runs on known abusive websites. 

> Found a site that hijacks your clipboard? [Open an issue](https://github.com/paulomanrique/browser-anti-copy-hijack/issues) and suggest it!

### 🚀 How to Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) on your browser.
2. Click [this link to install the script](https://github.com/paulomanrique/browser-anti-copy-hijack/raw/master/anti-copy-hijack.user.js)
3. Done. You’ll be free to copy text again without nonsense!

---

## 🧹 Contributing

If you find another site that hijacks your clipboard, [open an issue](https://github.com/paulomanrique/browser-anti-copy-hijack/issues) or submit a PR with the domain added to the `@match` list.

---

## 🧑‍⚖️ License

This project is licensed under the [Unlicense](https://unlicense.org/), which means:

> **Do whatever you want.**
>  
> You can copy, modify, redistribute, and use it for commercial or non-commercial purposes, without restriction.
