import { CHARACTERS } from "../data/characters";
import type { Character } from "../types/Character";

export function pickTargetFigure(): string {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)].figure;
}

export function generateCharacters(count: number, targetFigure: string): Character[] {
  const targetIndex = Math.floor(Math.random() * count);
  const otherFigures = CHARACTERS.filter((c) => c.figure !== targetFigure);
  return Array.from({ length: count }, (_, i) => {
    if (i === targetIndex) {
      return { id: i, isTarget: true, figure: targetFigure };
    }
    const randomOther =
      otherFigures[Math.floor(Math.random() * otherFigures.length)];
    return { id: i, isTarget: false, figure: randomOther.figure };
  });
}