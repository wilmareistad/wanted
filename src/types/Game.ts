import type { Character } from "./character";

export type GameState = {
characters: Character[];
score: number;
timeLeft: number;
level: number;
isGameOver: boolean;
}