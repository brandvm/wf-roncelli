// Honeypot + timing + JS-render token on form[data-form-guard], on top of
// reCAPTCHA. Ported unchanged from roncelli-main.js (RC-04 parity).
const DEFAULTS = Object.freeze({
  formSelector: 'form[data-form-guard]',
  honeypotName: 'company-website', // plausible bait; must NOT match a real field
  tokenName: 'fg-rendered', // proves this script executed in a browser
  tokenValue: '1',
  minSeconds: 3, // submit faster than this => almost certainly a bot
});
type Cfg = typeof DEFAULTS;
type GuardedForm = HTMLFormElement & { _fgArmedAt?: number };

const now = () => Date.now();
let cfg: Cfg = DEFAULTS;

function buildHoneypot(name: string) {
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

function addHidden(form: HTMLFormElement, name: string, value: string) {
  let input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
  if (!input) {
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    form.appendChild(input);
  }
  input.value = value;
  return input;
}

function prepOne(form: GuardedForm) {
  if (form.dataset.formGuardBound === '1') return;
  form.dataset.formGuardBound = '1';

  let hp = form.querySelector(`[name="${cfg.honeypotName}"]`);
  if (!hp) {
    const built = buildHoneypot(cfg.honeypotName);
    form.appendChild(built.wrap);
    hp = built.input;
  }

  form._fgArmedAt = now();
  form.addEventListener('focusin', () => (form._fgArmedAt = now()), { once: true });

  addHidden(form, cfg.tokenName, cfg.tokenValue);
}

// Capture phase on document, so it runs before Webflow's own submit handler.
function onSubmitCapture(e: Event) {
  const target = e.target as Element | null;
  const form = (target && target.closest ? target.closest(cfg.formSelector) : null) as GuardedForm | null;
  if (!form) return;

  const hp = form.querySelector<HTMLInputElement>(`[name="${cfg.honeypotName}"]`);
  const honeyFilled = !!(hp && hp.value && hp.value.trim());
  const tooFast = (now() - (form._fgArmedAt || 0)) / 1000 < cfg.minSeconds;

  if (honeyFilled || tooFast) {
    e.preventDefault();
    e.stopPropagation();
    if (form.dataset.formGuardDebug === '1') {
      console.warn('[FormGuard] blocked submission', { honeyFilled, tooFast });
    }
  }
}

export function initFormGuard(options: Partial<Cfg> = {}) {
  cfg = Object.assign({}, DEFAULTS, options);
  Array.from(document.querySelectorAll<GuardedForm>(cfg.formSelector)).forEach(prepOne);
  document.addEventListener('submit', onSubmitCapture, true);
}
