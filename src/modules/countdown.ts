// Countdown on `.timer-card` to 17 June 2027, 00:00 Toronto time.
// Ported unchanged from the site footer code (ROLLBACK.md, RC-04 parity).
export function initCountdown() {
  const TZ = 'America/Toronto';
  const pad2 = (n: number) => String(n).padStart(2, '0');

  function torontoLocalToUtcMs(year: number, monthIndex: number, day: number, hour: number, minute: number, second: number) {
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
    const get = (t: string) => parts.find((p) => p.type === t)?.value;
    const tzAsUtc = Date.UTC(Number(get('year')), Number(get('month')) - 1, Number(get('day')), Number(get('hour')), Number(get('minute')), Number(get('second')));
    const offsetMs = tzAsUtc - assumedUtc.getTime();
    return Date.UTC(year, monthIndex, day, hour, minute, second) - offsetMs;
  }

  // June 17, 2027 00:00:00 Toronto time (monthIndex is 0-based: June = 5)
  const targetUtcMs = torontoLocalToUtcMs(2027, 5, 17, 0, 0, 0);

  const timer = document.querySelector('.timer-card');
  if (!timer) return;

  const items = Array.from(timer.querySelectorAll('.time-item'));
  if (items.length < 4) return;

  const valueEls = items.map((item) => item.querySelector('.d1')) as HTMLElement[];

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
}
