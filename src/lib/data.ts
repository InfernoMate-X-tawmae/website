import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { CasinoData, GamesData, LoyaltyData, PlayerIndexEntry, TwitchData } from '../data/types';

const dir = join(process.cwd(), 'public', 'data');

const empty = {
  'loyalty.json': { updatedAt: '', pointsName: 'Punkte', leaderboards: { current: [], week: [], month: [] } } satisfies LoyaltyData,
  'casino.json': {
    updatedAt: '',
    roulette: { rounds: 0, wagered: 0, paidOut: 0, lastNumbers: [], top: [] },
    blackjack: { hands: 0, won: 0, blackjacks: 0, wagered: 0, paidOut: 0, top: [] },
    poker: { hands: 0, won: 0, wagered: 0, paidOut: 0, top: [] },
  } satisfies CasinoData,
  'games.json': {
    updatedAt: '',
    gamble: { plays: 0, wins: 0, losses: 0, allIns: 0, pointsWon: 0, pointsLost: 0, top: [] },
    duels: { played: 0, tied: 0, pointsDuelledFor: 0, top: [] },
    rumble: { entries: 0, rounds: 0, pointsWon: 0, top: [] },
    scratchCards: { sold: 0, wins: 0, pointsWon: 0, jackpot: 0, ticketsSinceWin: 0, top: [] },
  } satisfies GamesData,
  'twitch.json': {
    updatedAt: '',
    subs: { total: 0, tier1: 0, tier2: 0, tier3: 0, gifted: 0, top: [] },
    gifts: { total: 0, gifters: 0, top: [] },
    bits: { topTotal: 0, top: [] },
    followers: { total: 0, lastWeek: 0, top: [] },
  } satisfies TwitchData,
  'players/index.json': { updatedAt: '', players: [] as PlayerIndexEntry[] },
};

export async function loadData<T>(name: keyof typeof empty): Promise<T> {
  try {
    return JSON.parse(await readFile(join(dir, name), 'utf8')) as T;
  } catch {
    return empty[name] as T;
  }
}
