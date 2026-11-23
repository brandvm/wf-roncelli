// Finsweet Attributes v1, bundled from npm at the versions jsDelivr served
// on 2026-11-23 (numbercount 1.2.1, cmsselect 1.7.0), so Webflow needs no
// script tags. Ported for RC-04 parity: numbercount ran site-wide from the
// footer code, cmsselect on /news only. Both start through Webflow.push,
// as the CDN scripts did; each is only loaded where its elements exist.
export function initFinsweetV1() {
  if (document.querySelector('[fs-numbercount-element]')) {
    import('@finsweet/attributes-numbercount');
  }
  if (document.querySelector('[fs-cmsselect-element]')) {
    import('@finsweet/attributes-cmsselect');
  }
}
