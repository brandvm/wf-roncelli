// Toggles .is-shrunk on .g-nav-group past 5vh of scroll. Ported unchanged
// from roncelli-main.js (RC-04 parity).
export function initNavShrink() {
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
