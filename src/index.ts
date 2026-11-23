// Entry point. Keep this file a manifest: one run() call per module.
// Feature code lives in src/modules/<name>.ts and exports an init
// function that no-ops when its selector is absent from the page.
//
// RC-04 parity release: the modules below are the site's own code, moved
// out of Webflow unchanged (ROLLBACK.md has the originals). The template's
// starter modules (aria-roles, placeholders, unique-form-ids) are off for
// this release because they change the published markup; each can come
// back as its own batch.
import { initCredits } from './modules/credits';
import { initCountdown } from './modules/countdown';
import { initSmartSwiper } from './modules/smart-swiper';
import { initNavShrink } from './modules/nav-shrink';
import { initLinkedHoverImages } from './modules/linked-hover-images';
import { initFormGuard } from './modules/form-guard';
import { initAccordion } from './modules/accordion';
import { initContactTabHash } from './modules/contact-tab-hash';
import { initShareEmail } from './modules/share-email';
import { initTabsDragScroll } from './modules/tabs-drag-scroll';
import { initFinsweetV1 } from './modules/finsweet-v1';
import { initFinsweet } from './modules/finsweet';
import { initFinsweetEager } from './modules/finsweet-eager';

// Each module runs in isolation: one that throws is logged and skipped,
// and every module after it still initializes.
function run(name: string, init: () => void) {
  try {
    init();
  } catch (error) {
    console.error(`[wfc] ${name} failed to initialize`, error);
  }
}

function boot() {
  // Release the pre-paint scroll lock set by loader.html first, before any
  // module measures the page. The head snippet also has a fallback timeout.
  document.documentElement.classList.remove('is-loading');

  // Site code (was the Webflow footer code, roncelli-main.js first).
  run('credits', initCredits);
  run('countdown', initCountdown);
  run('smart-swiper', initSmartSwiper);
  run('nav-shrink', initNavShrink);
  run('linked-hover-images', initLinkedHoverImages);
  run('form-guard', initFormGuard);
  run('accordion', initAccordion);
  // Was page code and Embeds.
  run('contact-tab-hash', initContactTabHash);
  run('share-email', initShareEmail);
  run('tabs-drag-scroll', initTabsDragScroll);
  run('finsweet-v1', initFinsweetV1);
  // Finsweet v2 last (it starts a microtask later), then start the used
  // attributes at once, as the CDN loader did.
  run('finsweet', initFinsweet);
  run('finsweet-eager', initFinsweetEager);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
