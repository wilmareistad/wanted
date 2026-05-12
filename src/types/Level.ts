import type { Character } from "./Character";

export type LevelConfig = {
  level: number;
  gridCount: number;
  carousel?: boolean;
  carouselSpeed?: number;
  carouselGap?: number;
  carouselCols?: number;
};

export type CarouselProps = {
  characters: Character[];
  cols: number;
  onCharacterClick: (c: Character) => void;
  speed?: number;
  gap?: number;
};

export type CarouselRowProps = {
  row: Character[];
  direction: "left" | "right";
  onCharacterClick: (c: Character) => void;
};