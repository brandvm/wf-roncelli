// Console credits and the aboutSite()/egg() helpers, ported unchanged from
// roncelli-main.js (RC-04 parity).
export function initCredits() {
  window.addEventListener('load', () => {
    const idle = (window as any).requestIdleCallback || ((fn: () => void) => setTimeout(fn, 0));
    idle(() => {
      try {
        const a = 'color:#fff;background:#111;padding:4px 8px;border-radius:4px;';
        const b = 'color:#111;background:#ff621c;padding:4px 8px;border-radius:4px;';
        const c = 'color:#777;font-style:italic;';
        console.log('%cWebsite by Brand Vision Marketing', a);
        console.log('%cBuilt with vanilla JS modules', b);
        console.log('%cType aboutSite() or egg() in the console.', c);
      } catch (_) {}
    });
  });

  if ('aboutSite' in window) return;
  Object.defineProperties(window, {
    aboutSite: {
      value: () => ({ title: document.title || 'Untitled', url: location.href }),
      writable: false,
      configurable: false,
    },
    egg: {
      value: () => '🥚 Hi! Nothing to see here… probably.',
      writable: false,
      configurable: false,
    },
  });
}
