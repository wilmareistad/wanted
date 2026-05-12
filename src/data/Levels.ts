import type { LevelConfig } from "../types/Level";

export const LEVELS: LevelConfig[] = [
  { level: 1, gridCount: 4 },
  { level: 2, gridCount: 9 },
  { level: 3, gridCount: 16 },
  { level: 4, gridCount: 25 },
  { level: 5,  gridCount: 20,  carousel: true, carouselSpeed: 40,  carouselGap: 80,  carouselCols: 4 }, // 5 rows
  { level: 6,  gridCount: 24,  carousel: true, carouselSpeed: 60,  carouselGap: 60,  carouselCols: 4 }, // 6 rows
  { level: 7,  gridCount: 28,  carousel: true, carouselSpeed: 80,  carouselGap: 44,  carouselCols: 4 }, // 7 rows
  { level: 8,  gridCount: 35,  carousel: true, carouselSpeed: 100, carouselGap: 30,  carouselCols: 5 }, // 5 rows
  { level: 9,  gridCount: 35,  carousel: true, carouselSpeed: 120, carouselGap: 18,  carouselCols: 5 }, // 6 rows
  { level: 10, gridCount: 35,  carousel: true, carouselSpeed: 140, carouselGap: 10,  carouselCols: 5 }, // 7 rows
  { level: 11, gridCount: 35,  carousel: true, carouselSpeed: 160, carouselGap: 4,   carouselCols: 5 }, // 7 rows
];