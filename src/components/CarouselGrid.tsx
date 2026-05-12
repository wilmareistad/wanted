import { memo } from "react";
import type { CarouselProps } from "../types/Level";
import type { Character } from "../types/Character";

import styles from "./CarouselGrid.module.css";
import { isImage } from "../utils/gameUtils";

const ITEM_W = 80;
const ITEM_H = 72;
const SPEED_PX_PER_S = 60;

const CarouselGrid = memo(function CarouselGrid({
  characters,
  cols,
  onCharacterClick,
}: CarouselProps) {
  const rows: Character[][] = [];
  for (let i = 0; i < characters.length; i += cols) {
    rows.push(characters.slice(i, i + cols));
  }

  return (
    <div className={styles.carouselGrid}>
      {rows.map((row, rowIndex) => (
        <CarouselRow
          key={rowIndex}
          items={row}
          direction={rowIndex % 2 === 0 ? "left" : "right"}
          onCharacterClick={onCharacterClick}
        />
      ))}
    </div>
  );
});

export default CarouselGrid;

function CarouselRow({
  items,
  direction,
  onCharacterClick,
}: {
  items: Character[];
  direction: "left" | "right";
  onCharacterClick: (c: Character) => void;
}) {
  // Duplicate the strip so the seam is invisible
  const doubled = [...items, ...items];
  const stripWidth = items.length * ITEM_W;
  const duration = stripWidth / SPEED_PX_PER_S;

  return (
    <div className={styles.track}>
      <div
        className={styles.strip}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {doubled.map((char, i) => (
          <button
            key={i}
            className={styles.item}
            style={{ width: ITEM_W, height: ITEM_H }}
            onClick={() => onCharacterClick(items[i % items.length])}
          >
            {isImage(char.figure) ? (
              <img src={char.figure} alt="character" className={styles.img} />
            ) : (
              <span className={styles.emoji}>{char.figure}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}