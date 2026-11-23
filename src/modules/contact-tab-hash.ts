// Contact page: tab names become URL hashes (#tab-name opens that tab and
// scrolls to it; clicking a tab pushes its hash). Ported from the Contact
// page's footer code (RC-04 parity). Kept to /contact as before: other
// pages have Webflow tabs too, and this rewrites every [data-w-tab].
// Only change: jQuery's $(el).offset().top is written as the native
// equivalent.
export function initContactTabHash() {
  if (location.pathname.replace(/\/$/, '') !== '/contact') return;
  const w = window as any;
  w.Webflow = w.Webflow || [];
  w.Webflow.push(() => {
    function changeTab(shouldScroll = false) {
      const hashSegments = window.location.hash.substring(1).split('/');
      const offset = 240; // fixed header height
      let lastTabTarget: HTMLElement | undefined;

      for (const segment of hashSegments) {
        const tabTarget = document.querySelector<HTMLElement>(`[data-w-tab="${segment}"]`);
        if (tabTarget) {
          tabTarget.click();
          lastTabTarget = tabTarget;
        }
      }

      if (shouldScroll && lastTabTarget) {
        const top = lastTabTarget.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top - offset, behavior: 'smooth' });
      }
    }

    const tabs = document.querySelectorAll<HTMLElement>('[data-w-tab]');
    tabs.forEach((tab) => {
      const dataWTabValue = tab.dataset.wTab || '';
      const parsedDataTab = dataWTabValue.replace(/\s+/g, '-').toLowerCase();
      tab.dataset.wTab = parsedDataTab;
      tab.addEventListener('click', () => {
        history.pushState({}, '', `#${parsedDataTab}`);
      });
    });

    if (window.location.hash) {
      requestAnimationFrame(() => {
        changeTab(true);
      });
    }

    window.addEventListener('hashchange', () => {
      changeTab();
    });
  });
}
