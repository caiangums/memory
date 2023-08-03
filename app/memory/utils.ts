import { ITEMS } from './constants';

export const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

export const isGameOver = (foundCards: string[]) => foundCards.length === ITEMS.length
