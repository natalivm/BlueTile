export interface Badge {
  id: string;
  title: string;
  emoji: string;
  color: string;
}

export const badges: Badge[] = [
  { id: 'dancefloor-king', title: 'Dancefloor King', emoji: '🕺', color: '#FF6B6B' },
  { id: 'guest-star', title: 'Guest Star', emoji: '⭐', color: '#FFD93D' },
  { id: 'coffee-addict', title: 'Coffee Addict', emoji: '☕', color: '#6F4E37' },
  { id: 'meme-lord', title: 'Meme Lord', emoji: '😂', color: '#A855F7' },
  { id: 'snack-dealer', title: 'Snack Dealer', emoji: '🍕', color: '#F97316' },
  { id: 'meeting-survivor', title: 'Meeting Survivor', emoji: '💀', color: '#64748B' },
  { id: 'plant-parent', title: 'Plant Parent', emoji: '🌿', color: '#22C55E' },
  { id: 'karaoke-champion', title: 'Karaoke Champion', emoji: '🎤', color: '#EC4899' },
  { id: 'early-bird', title: 'Early Bird', emoji: '🐦', color: '#38BDF8' },
  { id: 'night-owl', title: 'Night Owl', emoji: '🦉', color: '#6366F1' },
  { id: 'office-dj', title: 'Office DJ', emoji: '🎧', color: '#8B5CF6' },
  { id: 'pun-master', title: 'Pun Master', emoji: '🃏', color: '#F43F5E' },
  { id: 'desk-chef', title: 'Desk Chef', emoji: '👨‍🍳', color: '#EF4444' },
  { id: 'emoji-enthusiast', title: 'Emoji Enthusiast', emoji: '✨', color: '#FBBF24' },
  { id: 'spreadsheet-wizard', title: 'Spreadsheet Wizard', emoji: '🧙', color: '#14B8A6' },
  { id: 'dog-whisperer', title: 'Dog Whisperer', emoji: '🐶', color: '#D97706' },
  { id: 'trivia-brain', title: 'Trivia Brain', emoji: '🧠', color: '#E879F9' },
  { id: 'gif-ninja', title: 'GIF Ninja', emoji: '🥷', color: '#334155' },
  { id: 'positive-vibes', title: 'Positive Vibes', emoji: '🌈', color: '#06B6D4' },
  { id: 'holiday-decorator', title: 'Holiday Decorator', emoji: '🎄', color: '#DC2626' },
];

export function getBadgeById(id: string): Badge | undefined {
  return badges.find(b => b.id === id);
}
