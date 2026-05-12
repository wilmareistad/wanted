import type { LevelConfig } from "../types/Level";

export const LEVELS: LevelConfig[] = [
  { level: 1, gridCount: 4 },
  { level: 2, gridCount: 9 },
  { level: 3, gridCount: 16 },
  { level: 4, gridCount: 25 },
  { level: 5,  gridCount: 25,  carousel: true, carouselSpeed: 40,  carouselGap: 80 },
  { level: 6,  gridCount: 36,  carousel: true, carouselSpeed: 60,  carouselGap: 60 },
  { level: 7,  gridCount: 49,  carousel: true, carouselSpeed: 80,  carouselGap: 44 },
  { level: 8,  gridCount: 64,  carousel: true, carouselSpeed: 100, carouselGap: 30 },
  { level: 9,  gridCount: 81,  carousel: true, carouselSpeed: 120, carouselGap: 18 },
  { level: 10, gridCount: 100, carousel: true, carouselSpeed: 140, carouselGap: 10 },
  { level: 11, gridCount: 121, carousel: true, carouselSpeed: 160, carouselGap: 4  },
];