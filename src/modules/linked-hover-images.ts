// Nav dropdown: hovering [data-link-index="n"] shows [data-image-index="n"]
// within the same .g-nav-drop-content; the last one stays on mouse-out.
// Ported unchanged from roncelli-main.js (RC-04 parity).
const DEFAULTS = Object.freeze({
  rootSelector: '.g-nav-drop-content',
  linkSelector: '[data-link-index]',
  imageSelector: '[data-image-index]',
  activeOpacity: '1',
  inactiveOpacity: '0',
  transition: 'opacity 735ms cubic-bezier(0.65,0.05,0,1)',
});
type Cfg = typeof DEFAULTS;

const isDisplayed = (el: Element | null) => !!(el && el.getClientRects().length);

export function initLinkedHoverImages(options: Partial<Cfg> = {}) {
  const cfg = Object.assign({}, DEFAULTS, options);
  const roots = Array.from(document.querySelectorAll<HTMLElement>(cfg.rootSelector));
  if (!roots.length) return;
  roots.forEach((root) => initOneRoot(root, cfg));
}

function initOneRoot(root: HTMLElement, cfg: Cfg) {
  if (!root || root.dataset.linkedHoverImagesInited === '1') return;

  const links = Array.from(root.querySelectorAll<HTMLElement>(cfg.linkSelector));
  const images = Array.from(root.querySelectorAll<HTMLElement>(cfg.imageSelector));
  if (!links.length || !images.length) return;

  const map = new Map<string, HTMLElement[]>();
  images.forEach((img) => {
    const key = img.getAttribute('data-image-index');
    if (key == null) return;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(img);
    if (!img.style.transition) img.style.transition = cfg.transition;
  });

  let lastActiveKey: string | null = null;

  function setActive(key: string) {
    const targets = map.get(String(key));
    if (!targets || !targets.length) return;
    images.forEach((img) => {
      img.style.opacity = cfg.inactiveOpacity;
      img.style.pointerEvents = 'none';
    });
    targets.forEach((img) => {
      img.style.opacity = cfg.activeOpacity;
      img.style.pointerEvents = 'auto';
    });
    lastActiveKey = String(key);
  }

  const firstKey = map.keys().next().value;
  if (firstKey != null) setActive(firstKey);

  links.forEach((link) => {
    const key = link.getAttribute('data-link-index');
    if (key == null) return;
    link.addEventListener('mouseenter', () => setActive(key));
    link.addEventListener('mouseleave', () => {
      // Intentionally empty: keep last active image showing
    });
  });

  const repair = () => {
    if (!isDisplayed(root)) return;
    if (lastActiveKey != null) setActive(lastActiveKey);
    else if (firstKey != null) setActive(firstKey);
  };
  window.addEventListener('resize', repair, { passive: true });

  root.dataset.linkedHoverImagesInited = '1';
}
