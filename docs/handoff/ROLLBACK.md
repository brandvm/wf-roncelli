# Rollback — custom code as it is live (2026-11-10)

Every piece of custom code on www.buildroncelli.com, word for word, before any change from this repo.

- **Site and page code:** read from Webflow through the `webflow-roncelli` connection on 2026-11-10 (Site settings › Custom code, and each page's settings).
- **Embeds:** read from the published pages. The connection can't list Embed elements without the Designer open.
- **Live and staging match:** the site head and footer code is byte-identical on www.buildroncelli.com (published 2026-10-23) and roncelli.webflow.io (published 2026-11-09). This file therefore restores both.
- **Supersedes:** the 2026-11-06 version, which was read from the published pages only. That version listed Lenis and its init script as loaded; they are commented out in the footer code.

## How to roll back

1. **[Person]** Restore the Webflow backup taken before the change (Site settings › Backups). This brings back everything below together. Or restore only the blocks that changed:
2. **Site code:** paste each block below back into Site settings › Custom code (Head code / Footer code), replacing what is there.
3. **Page code:** paste into Page settings › Custom code for each page listed.
4. **Embeds:** restore in the Designer, in the element named under each one.
5. **Publish**, then run `pnpm wf:baseline compare --live --dir .webflow-build/baselines`. The noise floor is 0%, so every difference is real.

## Site settings › Head code

2116 characters.

```html
<!-- Google Tag(s) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YZ52HY5MDF"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', 'G-YZ52HY5MDF');
</script>

<!-- Brand Vision's Ahrefs -->
<script src="https://analytics.ahrefs.com/analytics.js" data-key="QpJYWmVEhYv1W9ABdVuGcw" async></script>
<!-- Tony's Ahrefs -->
<script src="https://analytics.ahrefs.com/analytics.js" data-key="MvuhbjO9PAx0acRXKKx8jQ" async></script>

<!-- Global | Webflow Head Custom Code | Start -->
<link rel="preconnect" href="https://unpkg.com" />
<link rel="preconnect" href="https://cdn.prod.website-files.com" />

<!-- Disables Zoom on Input Fields -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

<!-- Theme Color Browser -->
<meta name="theme-color" content="#030307" />

<!-- Finsweet Attributes -->

<!-- Preloading Fonts -->
<link rel="preload" href="https://cdn.prod.website-files.com/695eb0569a00fe00b842a8fb/695eb2143d5e2f3431b80a5f_SourceSerif4-VariableFont_opsz%2Cwght.ttf" as="font" type="font/ttf" crossorigin="anonymous" />
<link rel="preload" href="https://cdn.prod.website-files.com/695eb0569a00fe00b842a8fb/695eb248e0f9005377d8c9ac_MYRIADPRO-REGULAR.OTF" as="font" type="font/otf" crossorigin="anonymous" />

<style>
  /* Hiding Dev Supports */
  .g-embed-code,
  .g-grid-guide,
  .w-webflow-badge,
  .cms-filters {
    z-index: -99999 !important;
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
  }
  * {
    -webkit-transform: transateZ(0);
  }

  /* --------- Lenis Smooth Scrolling --------- */
  html.lenis {
    height: auto;
  }
  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }
  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }
  .lenis.lenis-stopped {
    overflow: hidden;
  }

  * {
    content-visibility: visible !important;
  }
</style>

<!-- [Attributes by Finsweet] Number Count -->

<!-- Global | Webflow Head Custom Code | End -->
```

## Site settings › Footer code

26894 characters. Lenis and its init script are inside an HTML comment, so they don't run.

```html
<script src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-numbercount@1/numbercount.js"></script>

<!-- Lenis Smooth Scrolling 
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.5/dist/lenis.min.js"></script>
<script>
  if (!window.matchMedia('(pointer: coarse)').matches && Webflow.env('editor') === undefined) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
</script>-->

<script>
  (function () {
    const TZ = 'America/Toronto';
    const pad2 = (n) => String(n).padStart(2, '0');

    function torontoLocalToUtcMs(year, monthIndex, day, hour, minute, second) {
      const assumedUtc = new Date(Date.UTC(year, monthIndex, day, hour, minute, second));
      const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: TZ,
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).formatToParts(assumedUtc);
      const get = (t) => parts.find((p) => p.type === t)?.value;
      const tzAsUtc = Date.UTC(Number(get('year')), Number(get('month')) - 1, Number(get('day')), Number(get('hour')), Number(get('minute')), Number(get('second')));
      const offsetMs = tzAsUtc - assumedUtc.getTime();
      return Date.UTC(year, monthIndex, day, hour, minute, second) - offsetMs;
    }

    // June 17, 2027 00:00:00 Toronto time
    // monthIndex is 0-based → June = 5
    const targetUtcMs = torontoLocalToUtcMs(2027, 5, 17, 0, 0, 0);

    const timer = document.querySelector('.timer-card');
    if (!timer) return;

    const items = Array.from(timer.querySelectorAll('.time-item'));
    if (items.length < 4) return;

    const valueEls = items.map((item) => item.querySelector('.d1'));

    function tick() {
      const diffMs = targetUtcMs - Date.now();

      if (diffMs <= 0) {
        valueEls[0].textContent = '0';
        valueEls[1].textContent = '00';
        valueEls[2].textContent = '00';
        valueEls[3].textContent = '00';
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      valueEls[0].textContent = String(Math.floor(totalSeconds / 86400));
      valueEls[1].textContent = pad2(Math.floor((totalSeconds % 86400) / 3600));
      valueEls[2].textContent = pad2(Math.floor((totalSeconds % 3600) / 60));
      valueEls[3].textContent = pad2(totalSeconds % 60);
    }

    tick();
    setInterval(tick, 1000);
  })();
</script>

<!-- Code Sandbox - Script -->
<script defer>
  /**
   * File: roncelli-main.js
   *
   * Sections:
   * 1) Console Easter Egg / Credits
   * 2) Utilities (minimal)
   * 3) Modules
   * 4) Init
   */

  (() => {
    'use strict';

    //=============================================================================
    // 1) CONSOLE EASTER EGG / CREDITS
    //-----------------------------------------------------------------------------
    window.addEventListener('load', () => {
      const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 0));
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

    Object.defineProperties(window, {
      aboutSite: {
        value: () => ({
          title: document.title || 'Untitled',
          url: location.href,
        }),
        writable: false,
        configurable: false,
      },
      egg: {
        value: () => 'ðŸ¥š Hi! Nothing to see hereâ€¦ probably.',
        writable: false,
        configurable: false,
      },
    });

    //=============================================================================
    // 2) UTILITIES (minimal)
    //-----------------------------------------------------------------------------
    const onReady = (fn) => {
      if (document.readyState === 'interactive' || document.readyState === 'complete') fn();
      else document.addEventListener('DOMContentLoaded', fn, { once: true });
    };

    //=============================================================================
    // 3) MODULES
    //=============================================================================

    //-----------------------------------------------------------------------------
    // SMART SWIPERJS SLIDER
    //-----------------------------------------------------------------------------
    const SmartSwiper = (() => {
      const hasIO = 'IntersectionObserver' in window;
      const reduceMotion = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const CONFIGS = [
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
            breakpoints: {
              0: { spaceBetween: 14 },
              768: { spaceBetween: 16 },
              1024: { spaceBetween: 20 },
            },
          },
          navPrev: '.swiper-prev',
          navNext: '.swiper-next',
        },
        {
          selector: '.sw-other-projects .swiper',
          // IMPORTANT: this matches your HTML, so nav buttons scope per tab pane
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
            breakpoints: {
              0: { spaceBetween: 14 },
              768: { spaceBetween: 16 },
              1024: { spaceBetween: 20 },
            },
          },
          navPrev: '.swiper-prev',
          navNext: '.swiper-next',
        },
        {
          selector: '.sw-other-industry .swiper',
          // IMPORTANT: this matches your HTML, so nav buttons scope per tab pane
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
          // IMPORTANT: this matches your HTML, so nav buttons scope per tab pane
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
            coverflowEffect: {
              rotate: 60,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            },
          },
          navPrev: '.swiper-prev',
          navNext: '.swiper-next',
        },
      ];

      const idle = (fn) => ('requestIdleCallback' in window ? window.requestIdleCallback(fn) : setTimeout(fn, 0));

      const isDisplayed = (el) => !!(el && el.getClientRects().length);

      function ensureCSS() {
        if (document.querySelector('link[href*="swiper-bundle.min.css"]')) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
        document.head.appendChild(link);
      }

      function ensureJS(cb) {
        if (window.Swiper) return cb();
        const existing = document.querySelector('script[src*="swiper-bundle.min.js"]');
        if (existing) {
          const wait = () => (window.Swiper ? cb() : setTimeout(wait, 40));
          return wait();
        }
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
        s.defer = true;
        s.onload = cb;
        s.onerror = () => {};
        document.body.appendChild(s);
      }

      function normalizeOpts(base) {
        const o = Object.assign(
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

      function resolveNav(el, cfg) {
        const root = (cfg.wrapper && el.closest(cfg.wrapper)) || null;
        const scope = root || el.parentElement || document;

        const prev = cfg.navPrev ? scope.querySelector(cfg.navPrev) : scope.querySelector('.swiper-prev');
        const next = cfg.navNext ? scope.querySelector(cfg.navNext) : scope.querySelector('.swiper-next');

        return { scope, prev, next };
      }

      function withNav(el, cfg, opts) {
        const { prev, next } = resolveNav(el, cfg);
        if (prev || next) opts.navigation = { prevEl: prev || null, nextEl: next || null };
        return opts;
      }

      function readDataOverrides(el, opts) {
        const over = Object.assign({}, opts);
        const { dataset } = el;

        if ('swiperLoop' in dataset) over.loop = dataset.swiperLoop === 'true';
        if ('swiperSpeed' in dataset) over.speed = Math.max(0, parseInt(dataset.swiperSpeed, 10) || over.speed || 400);
        if ('swiperAutoplay' in dataset) {
          if (dataset.swiperAutoplay === 'false') over.autoplay = false;
          else {
            const delay = Math.max(0, parseInt(dataset.swiperAutoplay, 10) || 0);
            over.autoplay = delay ? { delay, disableOnInteraction: true } : false;
          }
        }

        return over;
      }

      // Hide prev at beginning, hide next at end (and hide both when locked)
      function bindEdgeNavHiding(el, swiper, prevEl, nextEl) {
        if (!swiper || el.dataset.edgeNavBound) return;
        el.dataset.edgeNavBound = '1';

        const setHidden = (btn, hidden) => {
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

      function getInstance(el) {
        return el._smartSwiperInstance || el.swiper || null;
      }

      function repairIfNeeded(el) {
        const cfg = CONFIGS.find((c) => el.matches(c.selector));
        if (!cfg) return;

        const inst = getInstance(el);
        if (!inst) return;

        const { prev, next } = resolveNav(el, cfg);

        // Make sure Swiper is correct after tab switches
        if (isDisplayed(el)) {
          try {
            inst.update();
            if (inst.navigation && typeof inst.navigation.update === 'function') {
              inst.navigation.update();
            }
          } catch (_) {}
        }

        bindEdgeNavHiding(el, inst, prev, next);
      }

      function initOne(el) {
        if (!el) return;

        // If already initialized (maybe from earlier run), just repair/update it
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
          // eslint-disable-next-line no-undef
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
        if (!sels) return [];
        return Array.from(document.querySelectorAll(sels));
      }

      function observeAndInit(els) {
        if (!els.length) return;

        // First, init/repair anything visible now
        els.forEach(initOne);

        // Lazy-init when sliders scroll into view
        if (!hasIO) return;

        const io = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                initOne(e.target);
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

        ensureCSS();
        ensureJS(() => observeAndInit(els));
      }

      let debounceT;
      function refresh() {
        clearTimeout(debounceT);
        debounceT = setTimeout(boot, 80);
      }

      function init() {
        const start = () => {
          boot();

          // When a Webflow tab changes, refresh after it finishes toggling panes
          document.addEventListener(
            'click',
            (e) => {
              const link = e.target && e.target.closest ? e.target.closest('.w-tab-link') : null;
              if (!link) return;
              setTimeout(refresh, 60);
            },
            true,
          );

          window.addEventListener('resize', refresh, { passive: true });

          // Keep your original external API name if you are using it elsewhere
          Object.defineProperty(window, 'athleticSlider', {
            value: Object.freeze({ refresh }),
            writable: false,
            configurable: false,
          });
        };

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', start, { once: true });
        } else {
          start();
        }
      }

      return { init, refresh };
    })();

    //-----------------------------------------------------------------------------
    // NAV SHRINK ON SCROLL (toggles .is-shrunk on .g-nav-group at 5vh)
    //-----------------------------------------------------------------------------
    const NavShrink = (() => {
      function init() {
        const group = document.querySelector('.g-nav-group');
        if (!group) return;

        const thresholdPx = window.innerHeight * 0.05; // 5vh

        const update = () => {
          const shouldShrink = window.scrollY >= thresholdPx;
          group.classList.toggle('is-shrunk', shouldShrink);
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update, { passive: true });
      }

      return { init };
    })();

    //-----------------------------------------------------------------------------
    // LINKED HOVER IMAGES (scoped per .g-nav-drop-content)
    // Uses ONLY:
    // - Links:  [data-link-index="1"]
    // - Images: [data-image-index="1"]
    // Behavior:
    // - Hover a link -> matching image opacity 1, others 0 (within same .g-nav-drop-content)
    // - Mouse out -> last active image stays active
    //-----------------------------------------------------------------------------
    const LinkedHoverImages = (() => {
      const DEFAULTS = Object.freeze({
        rootSelector: '.g-nav-drop-content',
        linkSelector: '[data-link-index]',
        imageSelector: '[data-image-index]',
        activeOpacity: '1',
        inactiveOpacity: '0',
        transition: 'opacity 735ms cubic-bezier(0.65,0.05,0,1)',
      });

      const isDisplayed = (el) => !!(el && el.getClientRects().length);

      function init(options = {}) {
        const cfg = Object.assign({}, DEFAULTS, options);
        const roots = Array.from(document.querySelectorAll(cfg.rootSelector));
        if (!roots.length) return;
        roots.forEach((root) => initOneRoot(root, cfg));
      }

      function initOneRoot(root, cfg) {
        if (!root || root.dataset.linkedHoverImagesInited === '1') return;

        const links = Array.from(root.querySelectorAll(cfg.linkSelector));
        const images = Array.from(root.querySelectorAll(cfg.imageSelector));
        if (!links.length || !images.length) return;

        // Map "1" -> [img, img...]
        const map = new Map();
        images.forEach((img) => {
          const key = img.getAttribute('data-image-index');
          if (key == null) return;
          if (!map.has(key)) map.set(key, []);
          map.get(key).push(img);

          if (!img.style.transition) img.style.transition = cfg.transition;
        });

        let lastActiveKey = null;

        function setActive(key) {
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

        // Initial state: show first mapped image
        const firstKey = map.keys().next().value;
        if (firstKey != null) setActive(firstKey);

        // Hover behavior
        links.forEach((link) => {
          const key = link.getAttribute('data-link-index');
          if (key == null) return;

          link.addEventListener('mouseenter', () => setActive(key));
          link.addEventListener('mouseleave', () => {
            // Intentionally empty: keep last active image showing
          });
        });

        // Repair when container visibility/layout changes (dropdown/tabs/resize)
        const repair = () => {
          if (!isDisplayed(root)) return;
          if (lastActiveKey != null) setActive(lastActiveKey);
          else if (firstKey != null) setActive(firstKey);
        };
        window.addEventListener('resize', repair, { passive: true });

        root.dataset.linkedHoverImagesInited = '1';
      }

      return { init };
    })();

    //-----------------------------------------------------------------------------
    // FORM GUARD (honeypot + timing + JS-render token, on top of reCAPTCHA)
    // Add data-form-guard to any <form> you want protected.
    // Optional: data-form-guard-debug="1" to log blocks to the console.
    //-----------------------------------------------------------------------------
    const FormGuard = (() => {
      const DEFAULTS = Object.freeze({
        formSelector: 'form[data-form-guard]',
        honeypotName: 'company-website', // plausible bait; must NOT match a real field
        tokenName: 'fg-rendered', // proves this script executed in a browser
        tokenValue: '1',
        minSeconds: 3, // submit faster than this => almost certainly a bot
      });

      const now = () => Date.now();
      let cfg = DEFAULTS;

      function buildHoneypot(name) {
        // Off-screen wrapper (better than display:none, which some bots skip).
        const wrap = document.createElement('div');
        wrap.setAttribute('aria-hidden', 'true');
        wrap.style.cssText = 'position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;';

        const label = document.createElement('label');
        label.setAttribute('for', name);
        label.textContent = 'Leave this field empty';

        const input = document.createElement('input');
        input.type = 'text';
        input.name = name;
        input.id = name;
        input.tabIndex = -1;
        input.autocomplete = 'off';
        input.setAttribute('autocorrect', 'off');

        wrap.appendChild(label);
        wrap.appendChild(input);
        return { wrap, input };
      }

      function addHidden(form, name, value) {
        let input = form.querySelector(`input[name="${name}"]`);
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          form.appendChild(input);
        }
        input.value = value;
        return input;
      }

      function prepOne(form) {
        if (form.dataset.formGuardBound === '1') return;
        form.dataset.formGuardBound = '1';

        // 1) Honeypot: reuse a Designer-added field if present, else inject one.
        let hp = form.querySelector(`[name="${cfg.honeypotName}"]`);
        if (!hp) {
          const built = buildHoneypot(cfg.honeypotName);
          form.appendChild(built.wrap);
          hp = built.input;
        }

        // 2) Timing: stamp when the form became available, re-stamp on first
        //    real interaction so bfcache/prefetch doesn't make a user look instant.
        form._fgArmedAt = now();
        form.addEventListener('focusin', () => (form._fgArmedAt = now()), {
          once: true,
        });

        // 3) Proof-of-render token: only set because this script ran.
        addHidden(form, cfg.tokenName, cfg.tokenValue);
      }

      // Registered at document in CAPTURE phase so it runs BEFORE Webflow's own
      // submit handler (which binds in the bubble phase on the form element).
      function onSubmitCapture(e) {
        const form = e.target && e.target.closest ? e.target.closest(cfg.formSelector) : null;
        if (!form) return; // not a guarded form -> leave it completely alone

        const hp = form.querySelector(`[name="${cfg.honeypotName}"]`);
        const honeyFilled = !!(hp && hp.value && hp.value.trim());
        const tooFast = (now() - (form._fgArmedAt || 0)) / 1000 < cfg.minSeconds;

        if (honeyFilled || tooFast) {
          e.preventDefault();
          e.stopPropagation(); // stops the event reaching Webflow's handler
          if (form.dataset.formGuardDebug === '1') {
            console.warn('[FormGuard] blocked submission', {
              honeyFilled,
              tooFast,
            });
          }
          return;
        }
        // Looks human: do nothing, let Webflow + reCAPTCHA proceed untouched.
      }

      function init(options = {}) {
        cfg = Object.assign({}, DEFAULTS, options);
        Array.from(document.querySelectorAll(cfg.formSelector)).forEach(prepOne);
        document.addEventListener('submit', onSubmitCapture, true);
      }

      return { init };
    })();

    const Accordion = (() => {
      function init(root = document) {
        root.querySelectorAll('[data-accordion]').forEach((acc) => {
          if (acc.dataset.accordionInited) return;
          const items = [...acc.querySelectorAll('[data-accordion-item]')];
          if (!items.length) return;

          const parts = items.map((item, i) => {
            const toggle = item.querySelector('[data-accordion-toggle]');
            const panel = item.querySelector('[data-accordion-panel]');
            const id = `acc-${Math.random().toString(36).slice(2, 8)}-${i}`;
            toggle.id = `${id}-toggle`;
            panel.id = `${id}-panel`;
            toggle.setAttribute('aria-controls', panel.id);
            panel.setAttribute('aria-labelledby', toggle.id);
            panel.setAttribute('role', 'region');
            return { item, toggle, panel };
          });

          const setOpen = (target) => {
            parts.forEach(({ item, toggle, panel }) => {
              const open = item === target;
              item.classList.toggle('is-open', open);
              toggle.setAttribute('aria-expanded', String(open));
              panel.setAttribute('aria-hidden', String(!open));
              panel.inert = !open; // keeps closed panels out of tab order
            });
          };

          parts.forEach(({ item, toggle }) => {
            toggle.addEventListener('click', () => {
              if (!item.classList.contains('is-open')) setOpen(item); // open item ignores clicks → one always open
            });
            toggle.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
              }
            });
          });

          setOpen(items.find((i) => i.classList.contains('is-open')) || items[0]);
          acc.dataset.accordionInited = '1';
        });
      }
      return { init };
    })();

    // In Section 4) INIT add:
    // try { LinkedHoverImages.init(); } catch (e) { console.error("[LinkedHoverImages]", e); }

    //=============================================================================
    // 4) INIT
    //-----------------------------------------------------------------------------
    onReady(() => {
      try {
        SmartSwiper.init();
      } catch (e) {
        console.error('[SmartSwiper]', e);
      }
      try {
        NavShrink.init();
      } catch (e) {
        console.error('[NavShrink]', e);
      }
      try {
        LinkedHoverImages.init();
      } catch (e) {
        console.error('[LinkedHoverImages]', e);
      }
      try {
        FormGuard.init();
      } catch (e) {
        console.error('[FormGuard]', e);
      }
      try {
        Accordion.init();
      } catch (e) {
        console.error('[Accordion]]', e);
      }
    });
  })();
</script>
```

## Page settings › Custom code

Pages not listed here have empty head and footer code (checked: all 35 pages).

### Contact (/contact) · footer

```html
<script>
  var Webflow = Webflow || [];
  Webflow.push(() => {
    function changeTab(shouldScroll = false) {
      const hashSegments = window.location.hash.substring(1).split('/');
      const offset = 240; // change this to match your fixed header height if you have one
      let lastTabTarget;

      for (const segment of hashSegments) {
        const tabTarget = document.querySelector(`[data-w-tab="${segment}"]`);

        if (tabTarget) {
          tabTarget.click();
          lastTabTarget = tabTarget;
        }
      }

      if (shouldScroll && lastTabTarget) {
        window.scrollTo({
          top: $(lastTabTarget).offset().top - offset, behavior: 'smooth'
        });
      }
    }

    const tabs = document.querySelectorAll('[data-w-tab]');

    tabs.forEach(tab => {
      const dataWTabValue = tab.dataset.wTab;
      const parsedDataTab = dataWTabValue.replace(/\s+/g,"-").toLowerCase();
      tab.dataset.wTab = parsedDataTab;
      tab.addEventListener('click', () => {
        history.pushState({}, '', `#${parsedDataTab}`);
      });
    });

    if (window.location.hash) {
      requestAnimationFrame(() => { changeTab(true); });
    }

    window.addEventListener('hashchange', () => { changeTab() });
  });
</script>
```

### News (/news) · head

```html
<!-- Finsweet Attributes -->
<script async type="module"
src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
fs-list
></script>
<!-- [Attributes by Finsweet] CMS Select -->
<script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsselect@1/cmsselect.js"></script>
```

### What We Build (/what-we-build) · head

```html
<!-- Finsweet Attributes -->
<script async type="module"
src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
fs-list
></script>
```

### Leadership (/leadership) · head

```html
<!-- Finsweet Attributes -->
<script async type="module"
src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
fs-smartlightbox
></script>
```

### Projects Template (/project/*) · head

```html
<!-- Finsweet Attributes -->
<script async type="module"
src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
fs-socialshare
></script>
```

### Projects Template (/project/*) · footer

```html
<script>
  (function () {
    function buildMailto() {
      var url = window.location.href.split("#")[0];

      var subject = "Check this article out";
      var body = "I thought you’d like this:\n\n" + url;

      var mailto =
          "mailto:?" +
          "subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);

      return mailto;
    }

    document.addEventListener("click", function (e) {
      var link = e.target.closest("#share-email");
      if (!link) return;

      e.preventDefault();
      window.location.href = buildMailto();
    });
  })();
</script>

```

### News Template (/news/*) · head

```html
<!-- Finsweet Attributes -->
<script async type="module"
src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
fs-socialshare
></script>
```

### News Template (/news/*) · footer

```html
<script>
  (function () {
    function buildMailto() {
      var url = window.location.href.split("#")[0];

      var subject = "Check this article out";
      var body = "I thought you’d like this:\n\n" + url;

      var mailto =
          "mailto:?" +
          "subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);

      return mailto;
    }

    document.addEventListener("click", function (e) {
      var link = e.target.closest("#share-email");
      if (!link) return;

      e.preventDefault();
      window.location.href = buildMailto();
    });
  })();
</script>

```

### Chatbot Leadership Preview (staging only, password-protected) · footer

The comment is cut off (`scr` with no closing `-->`), so the browser treats everything after it on the page as a comment. The page is password-protected on staging and not published live. The Zendesk key matches the chatbot Roncelli plans to launch.

```html
<!-- Start of roncelli Zendesk Widget script -->
<script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=ac03e8c6-6099-4e04-85a4-a5c59e324925"></script>
<!-- End of roncelli Zendesk Widget scr
```

## Embeds (read from the published pages)

### Global style Embed, on every page (likely in the nav or footer component)

Seen on: /contact, /, /leadership, /news, /news/a-fresh-look-for-roncellis-60th-year, /project/wagner-place-development, /what-we-build

```html
<style>
  /* ================================================
Blankboard Studio – Global Styles
================================================ */

  /* ------------------------------------------------
01. Responsive Scaling System by Blankboard Studio
------------------------------------------------ */

  /* Base Container & Font Scaling */
  :root {
    --size-unit: 16;
    --size-container-ideal: 1680;
    --size-container-min: 1280px;
    --size-container-max: 1680px;
    --size-container: clamp(var(--size-container-min), 100vw, var(--size-container-max));
    --size-font: calc(var(--size-container) / (var(--size-container-ideal) / var(--size-unit)));
    font-size: var(--size-font);
  }

  /* Tablet */
  @media screen and (max-width: 991px) {
    :root {
      --size-container-ideal: 834;
      --size-container-min: 768px;
      --size-container-max: 991px;
    }
  }

  /* Mobile Landscape */
  @media screen and (max-width: 767px) {
    :root {
      --size-container-ideal: 430;
      --size-container-min: 480px;
      --size-container-max: 767px;
    }
  }

  /* Mobile Portrait */
  @media screen and (max-width: 479px) {
    :root {
      --size-container-ideal: 430;
      --size-container-min: 320px;
      --size-container-max: 428px;
    }
  }

  /* ------------------------------------------------
    02. Color System: OKLCH and Display-P3 Fallback
    ------------------------------------------------ */

  @supports (color: oklch(50% 0.2 280)) {
    :root {
    }
  }

  @supports (color: color(display-p3 1 0 0)) {
    :root {
    }
  }

  /* ------------------------------------------------
    03. Reset & Box Model
    ------------------------------------------------ */

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed;
    text-size-adjust: 100%;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: 8%;
    text-underline-offset: -8%;
    text-underline-position: from-font;
  }

  /* html {
    scroll-behavior: initial;
    scrollbar-width: none;
    -webkit-font-smoothing: antialiased;
  } */

  body {
    width: 100vw;
    font-feature-settings:
      'liga' 1,
      'calt' 1;
    -ms-overflow-style: none;
  }

  /* body::-webkit-scrollbar,
  body ::-webkit-scrollbar {
    display: none;
  } */

  svg {
    max-width: none;
    height: auto;
    box-sizing: border-box;
    vertical-align: middle;
  }

  a {
    color: inherit;
  }

  textarea {
    resize: none;
  }

  /* ------------------------------------------------
    04. Typography Utilities
    ------------------------------------------------ */

  .rte > :first-child {
    margin-top: 0;
  }

  .rte > :last-child {
    margin-bottom: 0;
  }

  .rte > div:first-child > :first-child {
    margin-top: 0;
  }

  .rte > div:first-child > :last-child {
    margin-bottom: 0;
  }

  /* ------------------------------------------------
    05. Utility Attributes
    ------------------------------------------------ */

  :root {
    --truncated-line: 1;
  }

  [scroll-show='false'] {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  [scroll-show='false']::-webkit-scrollbar {
    display: none;
  }

  [data-truncate] {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: var(--truncated-line);
  }

  ::selection {
    background-color: color-mix(in srgb, currentColor 12%, transparent);
    color: var(--_colors---accent);
    text-shadow: none;
  }

  ::-moz-selection {
    background-color: color-mix(in srgb, currentColor 12%, transparent);
    color: var(--_colors---accent);
    text-shadow: none;
  }

  [data-theme='dark'] {
    background-color: var(--_colors---bg--dark);
    color: var(--_colors---text-color--light);
  }

  [data-theme='dark-transparent'] {
    color: var(--_colors---text-color--light) !important;
  }

  /* ------------------------------------------------
    06. Interactive Link Effects
    ------------------------------------------------ */

  .link-underline {
    position: relative;
  }

  .link-underline::after {
    content: '';
    position: absolute;
    top: 92%;
    left: 0%;
    height: 1px;
    width: 0%;
    background: currentColor;
    transition: width 735ms cubic-bezier(0.65, 0.05, 0, 1);
  }

  .link-underline:hover::after {
    width: 100%;
  }

  .link-underline:not(:hover)::after {
    left: auto;
    right: 0%;
    width: 0%;
  }

  .inline-link-underline {
    position: relative;
  }

  .inline-link-underline::after {
    content: '';
    position: absolute;
    top: 92%;
    left: 0%;
    height: 1px;
    width: 100%;
    background: currentColor;
    opacity: 0.48;
    transition: opacity 735ms cubic-bezier(0.65, 0.05, 0, 1);
  }

  .inline-link-underline:hover::after {
    opacity: 1;
  }

  /* ------------------------------------------------
    07. Animations
    ------------------------------------------------ */

  :root {
    --loop-x-duration: 60s;
  }

  @keyframes loopX {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes loopY {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(-100%);
    }
  }

  .loop-animate-x {
    animation: loopX var(--loop-x-duration) linear infinite;
  }

  .loop-animate-y {
    animation: loopY 32s linear infinite;
  }

  .loop-animate-y.reverse {
    animation: loopY 32s linear infinite reverse;
  }

  .svg-animate-line {
    stroke-dasharray: 10 10 !important;
    animation: svgDash 8s linear infinite;
  }

  .svg-animate-line.reverse {
    animation: svgDash 8s linear infinite reverse;
  }

  @keyframes svgDash {
    to {
      stroke-dashoffset: 600;
    }
  }

  /* ------------------------------------------------
    08. Components / Patterns
    ------------------------------------------------ */

  :root {
    --avatar-border: var(--_colors---light);
  }

  .s-wrapper::before,
  .s-wrapper::after,
  .w-container::before,
  .w-container::after {
    display: none;
  }

  .is_bullet-point {
    height: 1lh !important;
    min-height: 1lh !important;
  }

  .g-nav-group.is-shrunk {
    background-color: var(--_colors---bg--white);
    color: var(--_colors---text-color--dark);
    margin-top: var(--global--nav-margin-on-scroll);
    box-shadow: 0 4px 40px 0 rgba(0, 0, 0, 0.1);
  }

  .g-nav-group.is-shrunk .s-g-navigation {
    height: 4em;
  }

  .g-nav-group.is-shrunk .g-nav-overshoot {
    opacity: 1;
  }

  select.form-text-field,
  select.filter-select {
    color: currentColor;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M7.99952%208.78068L11.2995%205.48068L12.2422%206.42335L7.99952%2010.666L3.75685%206.42335L4.70019%205.48068L8.00019%208.78068L7.99952%208.78068Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 1em center;
    background-size: 1em;
    cursor: pointer;
  }

  .s-bg-grid {
    --grid-size: 2em;
    --grid-line: 1px;
    --grid-color: color-mix(in srgb, currentColor 5%, transparent);
    background-image: linear-gradient(to right, var(--grid-color) 0, var(--grid-color) var(--grid-line), transparent var(--grid-line), transparent var(--grid-size)), linear-gradient(to bottom, var(--grid-color) 0, var(--grid-color) var(--grid-line), transparent var(--grid-line), transparent var(--grid-size));
    background-size:
      var(--grid-size) var(--grid-size),
      var(--grid-size) var(--grid-size);
    background-position:
      center center,
      center center;
    background-repeat: repeat, repeat;
  }

  /* Desktop — clip replaces the old mask entirely */
  [data-section-mask-left] {
    clip-path: path('M 96 0 C 91 0, 87 1.55, 83 4.43 L 0 80 L 0 99999 L 99999 99999 L 99999 0 Z');
  }

  /* Tablet */
  @media (max-width: 1024px) {
    [data-section-mask-left] {
      clip-path: none;
    }
  }

  /* Mobile landscape */
  @media (orientation: landscape) and (max-width: 896px) {
    [data-section-mask-left] {
      clip-path: none;
    }
  }

  /* Mobile */
  @media (max-width: 767px) {
    [data-section-mask-left] {
      clip-path: none;
    }
  }
  .mask-icon.is-orange {
    background-color: #c34532;
  }

  .news-cms-list:hover .news-cms-item {
    opacity: 0.5;
  }

  .g-nav-drop-content [data-image-index] {
    opacity: 0;
    transition: opacity 200ms ease;
  }

  .g-nav-drop-content [data-image-index='1'] {
    opacity: 1;
  }
  /* ---- Accordion CSS (paste this block into a Webflow embed) ---- */
  .fs-acc-panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.4s cubic-bezier(0.65, 0.05, 0, 1);
  }
  .fs-acc-panel-inner {
    min-height: 0;
    overflow: hidden;
  }
  .fs-acc-item.is-open .fs-acc-panel {
    grid-template-rows: 1fr;
  }

  .fs-acc-icon-w {
    transition:
      background-color 0.3s,
      color 0.3s;
  }
  .fs-acc-icon-line.is-vert {
    transition: transform 0.3s;
  }
  .fs-acc-item.is-open .fs-acc-icon-w {
    background-color: var(--_colors---bg--primary);
    color: #fff;
  }
  .fs-acc-item.is-open .fs-acc-icon-line.is-vert {
    transform: rotate(0deg);
  }

  .fs-acc-toggle:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    .fs-acc-panel,
    .fs-acc-icon-w,
    .fs-acc-icon-line.is-vert {
      transition: none;
    }
  }

  .filter-radio-button.w--redirected-checked ~ .filter-radio-label {
    color: white;
  }

  .news-cms-item.is-insights:nth-child(3n) {
    border-right: none !important;
  }
  @media screen and (width < 991px) {
    .news-cms-item.is-insights:nth-child(2n) {
      border-right: none !important;
    }
  }
  @media screen and (width < 768px) {
    .news-cms-item.is-insights {
      border-right: none !important;
    }
  }
</style>
```

### Copyright year, in the footer, on every page

Seen on: /contact, /, /leadership, /news, /news/a-fresh-look-for-roncellis-60th-year, /project/wagner-place-development, /what-we-build

```html
<script>document.write(new Date().getFullYear())</script>
```

### Projects Template: tabs menu style

Seen on: /project/wagner-place-development

```html
<style>
  .wwb-tabs-menu {
    overflow-x: auto;
    overflow-y: visible;
    cursor: grab;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    flex-wrap: nowrap; /* if it's a flex container */
  }

  .wwb-tabs-menu::-webkit-scrollbar {
    display: none;
  }

  .wwb-tabs-menu.is-dragging {
    cursor: grabbing;
    user-select: none;
  }
</style>
```

### Projects Template: tabs menu drag-scroll script

Seen on: /project/wagner-place-development

```html
<script>
  (function () {
    const menu = document.querySelector('.wwb-tabs-menu');
    if (!menu) return;

    // Drag-to-scroll
    let isDragging = false,
      startX = 0,
      scrollStart = 0;

    menu.addEventListener('mousedown', (e) => {
      // Don't interfere with actual tab clicks
      isDragging = false;
      startX = e.pageX;
      scrollStart = menu.scrollLeft;

      menu.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 5) isDragging = true; // threshold before drag starts
      if (!isDragging) return;
      menu.style.scrollBehavior = 'auto';
      menu.scrollLeft = scrollStart - dx;
    }

    function onMouseUp(e) {
      menu.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      menu.style.scrollBehavior = '';

      if (isDragging) {
        // Block the click that fires after mouseup
        e.stopPropagation();
        const blocker = (e) => e.stopPropagation();
        window.addEventListener('click', blocker, { capture: true, once: true });
      }
      isDragging = false;
    }

    menu.addEventListener('dragstart', (e) => e.preventDefault());
  })();
</script>
```
