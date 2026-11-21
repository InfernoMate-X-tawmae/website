const whole = new Intl.NumberFormat('de-DE');
const compact = new Intl.NumberFormat('de-DE', { notation: 'compact', maximumFractionDigits: 1 });
const stamp = new Intl.DateTimeFormat('de-DE', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Europe/Berlin',
});

export const fmt = (n: number) => whole.format(n);
export const fmtCompact = (n: number) => compact.format(n);
export const fmtStamp = (iso: string) => (iso ? `${stamp.format(new Date(iso))} Uhr` : '–');
export const fmtNet = (n: number) => (n > 0 ? `+${whole.format(n)}` : n < 0 ? `−${whole.format(-n)}` : '0');
export const pct = (part: number, total: number) => (total > 0 ? Math.round((part / total) * 100) : 0);

export function url(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
