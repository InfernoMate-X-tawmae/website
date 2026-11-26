export const site = {
  name: 'InfernoMate',
  tagline: ['Streamer', 'Creator', 'Community'],
  twitch: 'https://twitch.tv/infernomate',
  discord: 'https://discord.infernomate.de',
  shop: 'https://infernomate.de',
  imprint: 'https://infernomate.de/impressum',
  privacy: '/datenschutz/',
};

export type SocialId = 'twitch' | 'youtube' | 'tiktok' | 'instagram' | 'x' | 'discord' | 'kofi';

export const socials: { id: SocialId; label: string; handle: string; href: string }[] = [
  { id: 'twitch', label: 'Twitch', handle: 'infernomate', href: 'https://twitch.tv/infernomate' },
  { id: 'youtube', label: 'YouTube', handle: 'InfernoMate', href: 'https://youtube.com/channel/UCJIOLsL0d9DYMz9jFcve7_g' },
  { id: 'tiktok', label: 'TikTok', handle: '@infernomate', href: 'https://tiktok.com/@infernomate' },
  { id: 'instagram', label: 'Instagram', handle: '@infernomatettv', href: 'https://instagram.com/infernomatettv' },
  { id: 'x', label: 'X', handle: '@InfernoMateTtv', href: 'https://x.com/InfernoMateTtv' },
  { id: 'discord', label: 'Discord', handle: 'Server beitreten', href: 'https://discord.infernomate.de' },
  { id: 'kofi', label: 'Ko-fi', handle: 'infernomate', href: 'https://ko-fi.com/infernomate' },
];
