import type { Character } from "./Character";

export type LevelConfig = {
  level: number;
  gridCount: number;
  pointsToAdvance: number;
  initialTime: number;
  carousel?: boolean;
};

export type CarouselProps = {
  characters: Character[];
  cols: number;
  onCharacterClick: (c: Character) => void;
};

export type CarouselRowProps = {
  row: Character[];
  direction: "left" | "right";
  onCharacterClick: (c: Character) => void;
};