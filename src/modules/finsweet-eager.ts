// RC-04 parity: the CDN loader started List, Smart Lightbox and Social
// Share as soon as the page loaded. The bundled recipe (./finsweet.ts)
// starts an attribute when its elements come near the viewport or on the
// first input; this starts the ones the page uses at once instead, as
// before. Run after initFinsweet.
import { loadAttribute } from './finsweet';

const USED = ['list', 'smartlightbox', 'socialshare'];

export function initFinsweetEager() {
  for (const name of USED) {
    if (document.querySelector(`[fs-${name}-element], [fs-${name}]`)) loadAttribute(name);
  }
}
