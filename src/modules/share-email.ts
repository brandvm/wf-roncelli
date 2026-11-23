// #share-email on project and news pages opens a mailto with the page URL.
// Ported unchanged from the Project and News template footer code (RC-04
// parity). No-op without #share-email.
function buildMailto() {
  const url = window.location.href.split('#')[0];
  const subject = 'Check this article out';
  const body = 'I thought you’d like this:\n\n' + url;
  return 'mailto:?' + 'subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

export function initShareEmail() {
  if (!document.querySelector('#share-email')) return;
  document.addEventListener('click', (e) => {
    const t = e.target as Element | null;
    const link = t && t.closest ? t.closest('#share-email') : null;
    if (!link) return;
    e.preventDefault();
    window.location.href = buildMailto();
  });
}
