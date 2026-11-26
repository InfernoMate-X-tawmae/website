export interface Player {
  userId: string;
  login: string;
  name: string;
  avatar: string | null;
}

export interface BoardRow extends Player {
  rank: number;
  points: number;
}

export interface LoyaltyData {
  updatedAt: string;
  pointsName: string;
  leaderboards: { current: BoardRow[]; week: BoardRow[]; month: BoardRow[] };
}

export interface TopRow {
  login: string;
  name: string;
  avatar: string | null;
  value: number;
}

export interface CasinoData {
  updatedAt: string;
  roulette: { rounds: number; wagered: number; paidOut: number; lastNumbers: number[]; top: TopRow[] };
  blackjack: { hands: number; won: number; blackjacks: number; wagered: number; paidOut: number; top: TopRow[] };
  poker: { hands: number; won: number; wagered: number; paidOut: number; top: TopRow[] };
}

export interface GamesData {
  updatedAt: string;
  gamble: { plays: number; wins: number; losses: number; allIns: number; pointsWon: number; pointsLost: number; top: TopRow[] };
  duels: { played: number; tied: number; pointsDuelledFor: number; top: TopRow[] };
  rumble: { entries: number; rounds: number; pointsWon: number; top: TopRow[] };
  scratchCards: { sold: number; wins: number; pointsWon: number; jackpot: number; ticketsSinceWin: number; top: TopRow[] };
}

export interface PlayerIndexEntry {
  login: string;
  name: string;
  avatar: string | null;
  platform: 'twitch' | 'youtube';
  points: number;
  rank: number | null;
}

export interface PlayerStats extends PlayerIndexEntry {
  userId: string;
  week: { earned: number; rank: number } | null;
  month: { earned: number; rank: number } | null;
  earned: { watchtime: number; chat: number; bonus: number };
  transfers: { sent: number; received: number };
  gamble: { plays: number; wins: number; losses: number; pointsWon: number; pointsLost: number; highestWin: number; allIns: number };
  duels: { played: number; won: number; lost: number; tied: number; pointsWon: number; pointsLost: number };
  rumble: { entries: number; wins: number; pointsWon: number; pointsLost: number };
  scratchCards: { bought: number; wins: number; pointsWon: number; pointsLost: number; highestWin: number };
  roulette: { rounds: number; hits: number; wagered: number; paidOut: number; best: number; bestNumber: number } | null;
  blackjack: { hands: number; wins: number; blackjacks: number; wagered: number; paidOut: number; best: number } | null;
  poker: { hands: number; wins: number; wagered: number; paidOut: number; best: number; bestHand: string } | null;
  twitch: PlayerTwitch | null;
}

export interface PlayerTwitch {
  subMonths: number;
  subTier: number | null;
  giftedSubs: number;
  bits: number | null;
  followedAt: string | null;
}

export interface TwitchData {
  updatedAt: string;
  subs: { total: number; tier1: number; tier2: number; tier3: number; gifted: number; top: TopRow[] };
  gifts: { total: number; gifters: number; top: TopRow[] };
  bits: { topTotal: number; top: TopRow[] };
  followers: { total: number; lastWeek: number; top: TopRow[] };
}

export interface CommandEntry {
  group: string;
  name: string;
  triggers: string[];
  mod: boolean;
}

export interface CommandsData {
  updatedAt: string;
  commands: CommandEntry[];
}

export interface SongRow {
  name: string;
  artists: string;
  value: number;
}

export interface CommunityData {
  updatedAt: string;
  watchtime: { seconds: number; viewers: number; top: TopRow[] };
  lurks: { count: number; seconds: number; lurkers: number; top: TopRow[] };
  checkins?: { count: number; people: number; top: TopRow[] };
  slots: { spins: number; wins: number; wagered: number; paidOut: number; biggestWin: number; top: TopRow[] };
  quiz: { games: number; rounds: number; solved: number; correct: number; top: TopRow[] };
  songs: { requests: number; requesters: number; different: number; top: TopRow[]; topSongs: SongRow[] };
}
