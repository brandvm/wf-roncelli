// Project pages: drag the .wwb-tabs-menu row sideways with the mouse; a
// drag doesn't click the tab under it. Ported unchanged from the Project
// template's Embed (RC-04 parity). Its CSS (.wwb-tabs-menu, .is-dragging)
// stays in that Embed. Kept to /project/* as before.
export function initTabsDragScroll() {
  if (!location.pathname.startsWith('/project/')) return;
  const menu = document.querySelector<HTMLElement>('.wwb-tabs-menu');
  if (!menu) return;

  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;

  menu.addEventListener('mousedown', (e) => {
    isDragging = false;
    startX = e.pageX;
    scrollStart = menu.scrollLeft;
    menu.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e: MouseEvent) {
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 5) isDragging = true; // threshold before drag starts
    if (!isDragging) return;
    menu!.style.scrollBehavior = 'auto';
    menu!.scrollLeft = scrollStart - dx;
  }

  function onMouseUp(e: MouseEvent) {
    menu!.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    menu!.style.scrollBehavior = '';
    if (isDragging) {
      e.stopPropagation();
      const blocker = (ev: Event) => ev.stopPropagation();
      window.addEventListener('click', blocker, { capture: true, once: true });
    }
    isDragging = false;
  }

  menu.addEventListener('dragstart', (e) => e.preventDefault());
}
