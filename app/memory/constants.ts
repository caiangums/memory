export const ITEMS = ['💀', '👻', '🚀', '👽', '🌎', '🌟', '🤖', '💩', '🐶', '🍿'];

export const CARDS = [...ITEMS, ...ITEMS];

export const WAIT_TIMEOUT = 500;

export const MATCHING_CARDS = 2;

export const GAME_ACTIONS = {
  REVEAL: 'REVEAL',
  HIDE_REVEALED: 'HIDE_REVEALED',
  FIND: 'FIND',
  RESET: 'RESET',
} as const;
