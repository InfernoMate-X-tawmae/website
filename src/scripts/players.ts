import type { PlayerIndexEntry, PlayerStats } from '../data/types';

export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

let index: Promise<PlayerIndexEntry[]> | null = null;

export function loadIndex() {
  index ??= fetch(`${BASE}/data/players/index.json`)
    .then((r) => (r.ok ? r.json() : { players: [] }))
    .then((j) => j.players as PlayerIndexEntry[])
    .catch(() => []);
  return index;
}

const shardOf = (login: string) => (/^[a-z0-9]/.test(login[0] ?? '') ? login[0] : '_');

export async function loadPlayer(login: string): Promise<PlayerStats | null> {
  const key = login.toLowerCase();
  try {
    const r = await fetch(`${BASE}/data/players/${shardOf(key)}.json`);
    if (!r.ok) return null;
    const shard = (await r.json()) as Record<string, PlayerStats>;
    return shard[key] ?? null;
  } catch {
    return null;
  }
}

export function search(players: PlayerIndexEntry[], query: string, limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const starts: PlayerIndexEntry[] = [];
  const contains: PlayerIndexEntry[] = [];
  for (const p of players) {
    const name = p.name.toLowerCase();
    if (p.login.startsWith(q) || name.startsWith(q)) starts.push(p);
    else if (p.login.includes(q) || name.includes(q)) contains.push(p);
  }
  return [...starts, ...contains].slice(0, limit);
}

export function playerUrl(login: string) {
  return `${BASE}/spieler/?name=${encodeURIComponent(login)}`;
}

const whole = new Intl.NumberFormat('de-DE');
export const fmt = (n: number) => whole.format(n);

export function esc(text: string) {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export function avatar(p: { name: string; avatar: string | null }, cls: string) {
  if (p.avatar && /^https:\/\//.test(p.avatar)) return `<img src="${esc(p.avatar)}" alt="" class="${cls} rounded-full object-cover" loading="lazy" />`;
  return `<span class="${cls} flex items-center justify-center rounded-full bg-white/10 font-bold text-white/70" aria-hidden="true">${esc(p.name.slice(0, 1).toUpperCase())}</span>`;
}

export function attachSearch(root: HTMLElement, onPick: (p: PlayerIndexEntry) => void) {
  const input = root.querySelector<HTMLInputElement>('input')!;
  const list = root.querySelector<HTMLUListElement>('[role="listbox"]')!;
  let results: PlayerIndexEntry[] = [];
  let active = -1;

  const close = () => {
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    active = -1;
  };

  const render = () => {
    if (!results.length) {
      list.innerHTML = input.value.trim() ? '<li class="px-4 py-3 text-sm text-white/55">Niemand gefunden.</li>' : '';
      list.hidden = !input.value.trim();
      input.setAttribute('aria-expanded', String(!list.hidden));
      return;
    }
    list.innerHTML = results
      .map(
        (p, i) => `<li id="${list.id}-${i}" role="option" aria-selected="${i === active}" data-i="${i}"
          class="flex cursor-pointer items-center gap-3 px-4 py-2.5 aria-selected:bg-white/[0.07] hover:bg-white/[0.05]">
          ${avatar(p, 'size-8 shrink-0')}
          <span class="min-w-0 flex-1 truncate font-semibold">${esc(p.name)}</span>
          ${p.rank ? `<span class="num shrink-0 text-sm text-white/55">Platz ${fmt(p.rank)}</span>` : ''}
        </li>`,
      )
      .join('');
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    if (active >= 0) input.setAttribute('aria-activedescendant', `${list.id}-${active}`);
    else input.removeAttribute('aria-activedescendant');
  };

  const pick = (p: PlayerIndexEntry | undefined) => {
    if (!p) return;
    input.value = p.name;
    close();
    onPick(p);
  };

  input.addEventListener('focus', () => void loadIndex());
  input.addEventListener('input', async () => {
    results = search(await loadIndex(), input.value);
    active = results.length ? 0 : -1;
    render();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!results.length) return;
      e.preventDefault();
      active = (active + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length;
      render();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      pick(results[active] ?? results[0]);
    } else if (e.key === 'Escape') {
      close();
    }
  });
  list.addEventListener('mousedown', (e) => {
    const li = (e.target as HTMLElement).closest<HTMLElement>('[data-i]');
    if (!li) return;
    e.preventDefault();
    pick(results[Number(li.dataset.i)]);
  });
  input.addEventListener('blur', () => setTimeout(close, 100));
}
