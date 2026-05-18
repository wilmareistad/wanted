import { useCallback, useRef, useState, useEffect, type ReactNode } from "react";
import Timer from "../Timer";
import CarouselGrid from "../CarouselGrid";
import Instructions from "../Instructions";
import { Leaderboard } from "../Leaderboard";
import { isImage } from "../../utils/gameUtils";
import styles from "./GameOn.module.css";
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

  // Auto-focus first button when game starts or changes
  useEffect(() => {
    if (loading) return;
    
    const timer = setTimeout(() => {
      const firstButton = playfieldRef.current?.querySelector(
        "button"
      ) as HTMLButtonElement;
      if (firstButton) {
        firstButton.focus();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [loading, characters]);

  const cols = currentLevel.carousel
  ? currentLevel.carouselCols ?? Math.ceil(characters.length / rowCount)
  : Math.round(Math.sqrt(currentLevel.gridCount));
  const stableClickRef = useRef(onCharacterClick);
  stableClickRef.current = onCharacterClick;
  const stableClick = useCallback(
    (c: Parameters<typeof onCharacterClick>[0]) => stableClickRef.current(c),
    []
  );

  // Keyboard navigation for grid
  const handleGridKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        nextIndex = Math.max(0, index - cols);
        break;
      case "ArrowDown":
        e.preventDefault();
        nextIndex = Math.min(characters.length - 1, index + cols);
        break;
      case "ArrowLeft":
        e.preventDefault();
        nextIndex = index === 0 ? characters.length - 1 : index - 1;
        break;
      case "ArrowRight":
        e.preventDefault();
        nextIndex = index === characters.length - 1 ? 0 : index + 1;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onCharacterClick(characters[index]);
        return;
      default:
        return;
    }

    const button = playfieldRef.current?.querySelector(
      `button[data-index="${nextIndex}"]`
    ) as HTMLButtonElement;
    if (button) {
      button.focus();
    }
  };

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
          <Timer key={timerKey} ref={timerRef} initialTime={10} onTimeUp={onTimeUp} />
        </div>

        <div className={styles.messageBox}>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>

        <div className={styles.infoSection}>
          <div className={styles.sideInfo}>
        <Instructions />
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
          shakiness={currentLevel.carouselShakiness ?? 0}
          sameDirection={currentLevel.carouselSameDirection ?? false}
          />
        ) : (
          <div className={`${styles.grid} ${styles[`grid${cols}`]}`}>
            {characters.map((c, index) => (
              <button
              key={c.id}
              data-index={index}
              onClick={() => onCharacterClick(c)}
              onKeyDown={(e) => handleGridKeyDown(e, index)}
              className={styles.characterButton}
              aria-label={`Character ${index + 1}`}
              tabIndex={0}
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
<div className={styles.sideInfo}>

        <Leaderboard />
</div>
      </div>
      </div>
  );
}