import type { Character } from "./Character";

export type GameState = {
characters: Character[];
score: number;
timeLeft: number;
level: number;
isGameOver: boolean;
}

export type TimerProps = {
  initialTime: number;
  onTimeUp: () => void;
};