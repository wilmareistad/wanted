import type { Character } from "./Character";

export type LevelConfig = {
  level: number;
  gridCount: number;
  pointsToAdvance: number;
  initialTime: number;
  carousel?: boolean;
};

export type Props = {
  characters: Character[];
  cols: number;
  onCharacterClick: (c: Character) => void;
};

export type RowProps = {
  row: Character[];
  direction: "left" | "right";
  onCharacterClick: (c: Character) => void;
};