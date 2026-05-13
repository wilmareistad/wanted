import { useCallback, useRef, useState, useEffect, type ReactNode } from "react";
import Timer from "../Timer";
import CarouselGrid from "../CarouselGrid";
import Instructions from "../Instructions";
import { Leaderboard } from "../Leaderboard";
import { isImage } from "../../utils/gameUtils";
import styles from "./Game.module.css";
import type { GameOnProps } from "../../types/Game";

const TRACK_H = 76 + 4;

export function GameOn({
  currentLevel,
  targetFigure,
  characters,
  message,
  score,
  loading,
  timerKey,
  timerRef,
  onCharacterClick,
  onTimeUp,
}: GameOnProps): ReactNode {
  const playfieldRef = useRef<HTMLDivElement>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const [rowCount, setRowCount] = useState(5);

  useEffect(() => {
    const node = playfieldRef.current;
    if (!node) return;
    roRef.current = new ResizeObserver((entries) => {
      const h = entries[0].contentRect.height;
      if (h > 0) setRowCount(Math.max(1, Math.floor(h / TRACK_H)));
    });
    roRef.current.observe(node);
    return () => roRef.current?.disconnect();
  }, []);

const cols = currentLevel.carousel
  ? currentLevel.carouselCols ?? Math.ceil(characters.length / rowCount)
  : Math.round(Math.sqrt(currentLevel.gridCount));
  const stableClickRef = useRef(onCharacterClick);
  stableClickRef.current = onCharacterClick;
  const stableClick = useCallback(
    (c: Parameters<typeof onCharacterClick>[0]) => stableClickRef.current(c),
    []
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Wanted</h1>

        <div className={styles.infoRow}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>SCORE:</span>
            <span className={styles.statValue}>{score}</span>
          </div>

          <div className={styles.targetBox}>
            {isImage(targetFigure) ? (
              <img src={targetFigure} alt="target" className={styles.targetImg} />
            ) : (
              <span className={styles.targetEmoji}>{targetFigure}</span>
            )}
          </div>

          <div className={styles.statBox}>
            <span className={styles.statLabel}>LEVEL:</span>
            <span className={styles.statValue}>{currentLevel.level}</span>
          </div>
        </div>

        <div className={styles.timerRow}>
          <Timer key={timerKey} ref={timerRef} initialTime={300} onTimeUp={onTimeUp} />
        </div>

        <div className={styles.messageBox}>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>

      <div className={styles.playfield} ref={playfieldRef}>
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : currentLevel.carousel ? (
          <CarouselGrid
            characters={characters}
            cols={cols}
            onCharacterClick={stableClick}
            speed={currentLevel.carouselSpeed ?? 60}
            gap={currentLevel.carouselGap ?? 20}
          />
        ) : (
          <div className={`${styles.grid} ${styles[`grid${cols}`]}`}>
            {characters.map((c) => (
              <button
                key={c.id}
                onClick={() => onCharacterClick(c)}
                className={styles.characterButton}
              >
                {isImage(c.figure) ? (
                  <img src={c.figure} alt="figure" className={styles.characterImg} />
                ) : (
                  c.figure
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.infoSection}>
        <Instructions />
        <Leaderboard />
      </div>
    </div>
  );
}