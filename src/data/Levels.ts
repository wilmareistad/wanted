import type { LevelConfig } from "../types/Level";

export const LEVELS: LevelConfig[] = [
  { level: 1, gridCount: 4 },
  { level: 2, gridCount: 9 },
  { level: 3, gridCount: 16 },
  { level: 4, gridCount: 25 },
  { level: 5,  gridCount: 24,  carousel: true, carouselSpeed: 80,  carouselGap: 44,  carouselCols: 4 }, 
  { level: 6,  gridCount: 28,  carousel: true, carouselSpeed: 100, carouselGap: 30,  carouselCols: 5 }, 
  { level: 7,  gridCount: 34,  carousel: true, carouselSpeed: 120, carouselGap: 18,  carouselCols: 6 }, 
  { level: 8, gridCount: 38,  carousel: true, carouselSpeed: 140, carouselGap: 10,  carouselCols: 7 }, 
  { level: 9, gridCount: 38,  carousel: true, carouselSpeed: 160, carouselGap: 4,   carouselCols: 7 }, 
  { level: 10, gridCount: 38,  carousel: true, carouselSpeed: 180, carouselGap: 4,   carouselCols: 7 }, 
];
// { level: 5,  gridCount: 20,  carousel: true, carouselSpeed: 40,  carouselGap: 80,  carouselCols: 4 },
// { level: 6,  gridCount: 24,  carousel: true, carouselSpeed: 60,  carouselGap: 60,  carouselCols: 4 }, 