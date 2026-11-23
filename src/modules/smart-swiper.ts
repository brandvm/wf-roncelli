// Swiper sliders: .js-swiper, .sw-other-projects (per tab pane),
// .sw-other-industry and .project-gallery-w (coverflow). Lazy-inits when a
// slider is displayed and near the viewport; re-checks after Webflow tab
// clicks and resizes; hides prev/next at the ends.
// Ported from roncelli-main.js (RC-04 parity). The only change: Swiper
// 11.2.10 comes from this bundle (pnpm add) instead of jsDelivr
// swiper@11's full bundle, with only the modules these sliders use
// (navigation, coverflow, and autoplay for data-swiper-autoplay), and its
// CSS from dist/styles.css. window.Swiper is still set, as the CDN script
// did.
import Swiper from 'swiper';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';

Swiper.use([Navigation, Autoplay, EffectCoverflow]);

type Cfg = { selector: string; wrapper?: string; opts: Record<string, any>; navPrev?: string; navNext?: string };
type SwiperEl = HTMLElement & { _smartSwiperInstance?: any; swiper?: any };

const CONFIGS: Cfg[] = [
  {
    selector: '.js-swiper .swiper',
    wrapper: '.js-swiper',
    opts: {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: false,
      speed: 400,
      autoplay: false,
      watchOverflow: true,
      touchReleaseOnEdges: true,
      simulateTouch: true,
      breakpoints: { 0: { spaceBetween: 14 }, 768: { spaceBetween: 16 }, 1024: { spaceBetween: 20 } },
    },
    navPrev: '.swiper-prev',
    navNext: '.swiper-next',
  },
  {
    selector: '.sw-other-projects .swiper',
    wrapper: '.wwb-tab-pane',
    opts: {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: false,
      speed: 400,
      autoplay: false,
      watchOverflow: true,
      touchReleaseOnEdges: true,
      simulateTouch: true,
      breakpoints: { 0: { spaceBetween: 14 }, 768: { spaceBetween: 16 }, 1024: { spaceBetween: 20 } },
    },
    navPrev: '.swiper-prev',
    navNext: '.swiper-next',
  },
  {
    selector: '.sw-other-industry .swiper',
    wrapper: '.sw-other-industry',
    opts: {
      slidesPerView: 2.75,
      spaceBetween: 20,
      loop: false,
      speed: 400,
      autoplay: false,
      watchOverflow: true,
      touchReleaseOnEdges: true,
      simulateTouch: true,
      breakpoints: {
        0: { spaceBetween: 14, slidesPerView: 1 },
        768: { spaceBetween: 16, slidesPerView: 2 },
        1024: { spaceBetween: 20, slidesPerView: 2.75 },
      },
    },
    navPrev: '.swiper-prev',
    navNext: '.swiper-next',
  },
  {
    selector: '.project-gallery-w .swiper',
    wrapper: '.project-gallery-w',
    opts: {
      slidesPerView: 'auto',
      spaceBetween: 0,
      centeredSlides: true,
      loop: true,
      speed: 400,
      autoplay: false,
      watchOverflow: true,
      touchReleaseOnEdges: true,
      simulateTouch: true,
      effect: 'coverflow',
      coverflowEffect: { rotate: 60, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
    },
    navPrev: '.swiper-prev',
    navNext: '.swiper-next',
  },
];

const hasIO = 'IntersectionObserver' in window;
const reduceMotion = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDisplayed = (el: Element | null) => !!(el && el.getClientRects().length);

function normalizeOpts(base: Record<string, any>) {
  const o: Record<string, any> = Object.assign(
    {
      touchReleaseOnEdges: true,
      simulateTouch: true,
      // helps when containers show/hide (Webflow tabs)
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
    },
    base || {},
  );
  if (reduceMotion) {
    if (o.autoplay) o.autoplay = false;
    o.speed = Math.min(o.speed || 400, 300);
  }
  return o;
}

function resolveNav(el: HTMLElement, cfg: Cfg) {
  const root = (cfg.wrapper && el.closest(cfg.wrapper)) || null;
  const scope: ParentNode = root || el.parentElement || document;
  const prev = cfg.navPrev ? scope.querySelector<HTMLElement>(cfg.navPrev) : scope.querySelector<HTMLElement>('.swiper-prev');
  const next = cfg.navNext ? scope.querySelector<HTMLElement>(cfg.navNext) : scope.querySelector<HTMLElement>('.swiper-next');
  return { scope, prev, next };
}

function withNav(el: HTMLElement, cfg: Cfg, opts: Record<string, any>) {
  const { prev, next } = resolveNav(el, cfg);
  if (prev || next) opts.navigation = { prevEl: prev || null, nextEl: next || null };
  return opts;
}

function readDataOverrides(el: HTMLElement, opts: Record<string, any>) {
  const over: Record<string, any> = Object.assign({}, opts);
  const { dataset } = el;
  if ('swiperLoop' in dataset) over.loop = dataset.swiperLoop === 'true';
  if ('swiperSpeed' in dataset) over.speed = Math.max(0, parseInt(dataset.swiperSpeed!, 10) || over.speed || 400);
  if ('swiperAutoplay' in dataset) {
    if (dataset.swiperAutoplay === 'false') over.autoplay = false;
    else {
      const delay = Math.max(0, parseInt(dataset.swiperAutoplay!, 10) || 0);
      over.autoplay = delay ? { delay, disableOnInteraction: true } : false;
    }
  }
  return over;
}

// Hide prev at beginning, hide next at end (and hide both when locked)
function bindEdgeNavHiding(el: HTMLElement, swiper: any, prevEl: HTMLElement | null, nextEl: HTMLElement | null) {
  if (!swiper || el.dataset.edgeNavBound) return;
  el.dataset.edgeNavBound = '1';
  const setHidden = (btn: HTMLElement | null, hidden: boolean) => {
    if (!btn) return;
    btn.style.display = hidden ? 'none' : '';
  };
  const update = () => {
    const locked = !!swiper.isLocked;
    setHidden(prevEl, locked || !!swiper.isBeginning);
    setHidden(nextEl, locked || !!swiper.isEnd);
  };
  update();
  ['slideChange', 'reachBeginning', 'reachEnd', 'fromEdge', 'resize', 'update', 'lock', 'unlock'].forEach((evt) => {
    try {
      swiper.on(evt, update);
    } catch (_) {}
  });
}

const getInstance = (el: SwiperEl) => el._smartSwiperInstance || el.swiper || null;

function repairIfNeeded(el: SwiperEl) {
  const cfg = CONFIGS.find((c) => el.matches(c.selector));
  if (!cfg) return;
  const inst = getInstance(el);
  if (!inst) return;
  const { prev, next } = resolveNav(el, cfg);
  if (isDisplayed(el)) {
    try {
      inst.update();
      if (inst.navigation && typeof inst.navigation.update === 'function') inst.navigation.update();
    } catch (_) {}
  }
  bindEdgeNavHiding(el, inst, prev, next);
}

function initOne(el: SwiperEl) {
  if (!el) return;
  const existing = getInstance(el);
  if (existing) {
    repairIfNeeded(el);
    return;
  }
  // Do not init while hidden (inactive Webflow tab panes)
  if (!isDisplayed(el)) return;
  const cfg = CONFIGS.find((c) => el.matches(c.selector));
  if (!cfg) return;
  const opts = withNav(el, cfg, normalizeOpts(readDataOverrides(el, cfg.opts)));
  const { prev, next } = resolveNav(el, cfg);
  el.dataset.swiperInited = '1';
  try {
    const swiper = new Swiper(el, opts);
    el._smartSwiperInstance = swiper;
    bindEdgeNavHiding(el, swiper, prev, next);
    try {
      swiper.update();
    } catch (_) {}
  } catch (err) {
    delete el.dataset.swiperInited;
    throw err;
  }
}

function scan() {
  const sels = CONFIGS.map((c) => c.selector).join(', ');
  return Array.from(document.querySelectorAll<SwiperEl>(sels));
}

function observeAndInit(els: SwiperEl[]) {
  if (!els.length) return;
  els.forEach(initOne);
  if (!hasIO) return;
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          initOne(e.target as SwiperEl);
          obs.unobserve(e.target);
        }
      });
    },
    { rootMargin: '200px 0px' },
  );
  els.forEach((el) => io.observe(el));
}

function boot() {
  const els = scan();
  if (!els.length) return;
  // The CDN version loaded Swiper here; it is bundled now.
  observeAndInit(els);
}

let debounceT: ReturnType<typeof setTimeout> | undefined;
function refresh() {
  clearTimeout(debounceT);
  debounceT = setTimeout(boot, 80);
}

export function initSmartSwiper() {
  (window as any).Swiper = (window as any).Swiper || Swiper;
  boot();

  // When a Webflow tab changes, refresh after it finishes toggling panes
  document.addEventListener(
    'click',
    (e) => {
      const t = e.target as Element | null;
      const link = t && t.closest ? t.closest('.w-tab-link') : null;
      if (!link) return;
      setTimeout(refresh, 60);
    },
    true,
  );

  window.addEventListener('resize', refresh, { passive: true });

  // The original external API name, kept
  if (!('athleticSlider' in window)) {
    Object.defineProperty(window, 'athleticSlider', {
      value: Object.freeze({ refresh }),
      writable: false,
      configurable: false,
    });
  }
}
