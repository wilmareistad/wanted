import type { LevelConfig } from "../types/Level";

export const LEVELS: LevelConfig[] = [
  { level: 1, gridCount: 4,  pointsToAdvance: 1, initialTime: 10 },
  { level: 2, gridCount: 9,  pointsToAdvance: 1, initialTime: 0 }, // 0 = takes it from the one before
  { level: 3, gridCount: 16, pointsToAdvance: 1, initialTime: 0 },
  { level: 4, gridCount: 25, pointsToAdvance: 1, initialTime: 0 },
  { level: 5, gridCount: 16, pointsToAdvance: 1, initialTime: 0, carousel: true },
  { level: 6, gridCount: 25, pointsToAdvance: 1, initialTime: 0, carousel: true },
  { level: 7, gridCount: 25, pointsToAdvance: 1, initialTime: 0, carousel: true },
];