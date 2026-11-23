// [data-accordion] with [data-accordion-item|toggle|panel]: one item always
// open. Ported unchanged from roncelli-main.js (RC-04 parity).
export function initAccordion(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-accordion]').forEach((acc) => {
    if (acc.dataset.accordionInited) return;
    const items = [...acc.querySelectorAll<HTMLElement>('[data-accordion-item]')];
    if (!items.length) return;

    const parts = items.map((item, i) => {
      const toggle = item.querySelector<HTMLElement>('[data-accordion-toggle]')!;
      const panel = item.querySelector<HTMLElement>('[data-accordion-panel]')!;
      const id = `acc-${Math.random().toString(36).slice(2, 8)}-${i}`;
      toggle.id = `${id}-toggle`;
      panel.id = `${id}-panel`;
      toggle.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', toggle.id);
      panel.setAttribute('role', 'region');
      return { item, toggle, panel };
    });

    const setOpen = (target: HTMLElement) => {
      parts.forEach(({ item, toggle, panel }) => {
        const open = item === target;
        item.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        panel.setAttribute('aria-hidden', String(!open));
        (panel as HTMLElement & { inert: boolean }).inert = !open;
      });
    };

    parts.forEach(({ item, toggle }) => {
      toggle.addEventListener('click', () => {
        if (!item.classList.contains('is-open')) setOpen(item);
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
