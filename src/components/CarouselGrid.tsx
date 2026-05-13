import { memo, useRef, useEffect } from "react";
import type { CarouselProps } from "../types/Level";
import type { Character } from "../types/Character";
import styles from "./CarouselGrid.module.css";
import { isImage } from "../utils/gameUtils";

const ITEM_W = 72;
const ITEM_H = 72;
const MAX_TRACK = 425;

const CarouselGrid = memo(function CarouselGrid({
  characters,
  cols,
  onCharacterClick,
  speed = 60,
  gap = 20,
  shakiness = 0,
  sameDirection = false,
}: CarouselProps) {
  const rows: Character[][] = [];
  for (let i = 0; i < characters.length; i += cols) {
    rows.push(characters.slice(i, i + cols));
  }

  return (
    <div className={styles.carouselGrid}>
      {rows.map((row, rowIndex) => {
        // Nomral direction: left/right
        let direction: "left" | "right" = rowIndex % 2 === 0 ? "left" : "right";
        
        // If sameDirection is true, switch all directions
        if (sameDirection) {
          direction = direction === "left" ? "right" : "left";
        }
        
        return (
          <CarouselRow
            key={rowIndex}
            items={row}
            direction={direction}
            onCharacterClick={onCharacterClick}
            speed={speed}
            gap={gap}
            shakiness={shakiness}
          />
        );
      })}
    </div>
  );
});

export default CarouselGrid;

function CarouselRow({
  items,
  direction,
  onCharacterClick,
  speed,
  gap,
  shakiness,
}: {
  items: Character[];
  direction: "left" | "right";
  onCharacterClick: (c: Character) => void;
  speed: number;
  gap: number;
  shakiness: number;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef(0);

  const slotW = ITEM_W + gap;
  const oneSetW = items.length * slotW;
  const copiesNeeded = Math.ceil((MAX_TRACK + oneSetW) / oneSetW) + 1;
  const totalW = copiesNeeded * oneSetW;

  const repeated = Array.from(
    { length: copiesNeeded * items.length },
    (_, i) => items[i % items.length]
  );

  useEffect(() => {
    // Left moves negative, right starts at -oneSetW and moves positive back toward 0
    offsetRef.current = direction === "right" ? -oneSetW : 0;
    lastTsRef.current = null;

    function tick(ts: number) {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const delta = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (direction === "left") {
        offsetRef.current -= speed * delta;
        if (offsetRef.current <= -oneSetW) offsetRef.current += oneSetW;
      } else {
        offsetRef.current += speed * delta;
        if (offsetRef.current >= 0) offsetRef.current -= oneSetW;
      }

      const shakeAmount = shakiness * 8;
      const shakeX = (Math.random() - 0.5) * shakeAmount;
      const shakeY = (Math.random() - 0.5) * shakeAmount;

      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(${offsetRef.current + shakeX}px) translateY(${shakeY}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [direction, speed, oneSetW, shakiness]);

  return (
    <div className={styles.track}>
      <div
        ref={stripRef}
        className={styles.strip}
        style={{ width: totalW }}
      >
        {repeated.map((char, i) => (
          <div key={i} className={styles.slot} style={{ width: slotW }}>
            <button
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
          </div>
        ))}
      </div>
    </div>
  );
}