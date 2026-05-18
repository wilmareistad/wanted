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
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });

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

  useEffect(() => {
    if (loading) return;
    
  }, [loading, characters]);

  // Initialize cursor position to center of playfield
  useEffect(() => {
    if (!loading && playfieldRef.current) {
      const rect = playfieldRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      cursorRef.current = { x: centerX, y: centerY };
      setCursorPos({ x: centerX, y: centerY });
    }
  }, [loading]);

  // Virtual cursor movement with arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const CURSOR_SPEED = 30;
      let moved = false;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setCursorVisible(true);
          cursorRef.current.y = Math.max(0, cursorRef.current.y - CURSOR_SPEED);
          moved = true;
          break;
        case "ArrowDown":
          e.preventDefault();
          setCursorVisible(true);
          cursorRef.current.y = Math.min(
            window.innerHeight - 10,
            cursorRef.current.y + CURSOR_SPEED
          );
          moved = true;
          break;
        case "ArrowLeft":
          e.preventDefault();
          setCursorVisible(true);
          cursorRef.current.x = Math.max(0, cursorRef.current.x - CURSOR_SPEED);
          moved = true;
          break;
        case "ArrowRight":
          e.preventDefault();
          setCursorVisible(true);
          cursorRef.current.x = Math.min(
            window.innerWidth - 10,
            cursorRef.current.x + CURSOR_SPEED
          );
          moved = true;
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          // Temporarily hide cursor to find element underneath
          const cursorElement = document.querySelector(`.${styles.virtualCursor}`) as HTMLElement;
          if (cursorElement) {
            cursorElement.style.display = 'none';
          }
          
          const element = document.elementFromPoint(
            cursorRef.current.x,
            cursorRef.current.y
          ) as HTMLElement;
          
          // Show cursor again
          if (cursorElement) {
            cursorElement.style.display = 'block';
          }
          
          // Click the button or its parent if it's an image inside a button
          let targetButton: HTMLButtonElement | null = null;
          if (element && element.tagName === "BUTTON") {
            targetButton = element as HTMLButtonElement;
          } else if (element && element.closest("button")) {
            targetButton = element.closest("button") as HTMLButtonElement;
          }
          
          if (targetButton) {
            targetButton.click();
          }
          return;
        case "Tab":
          e.preventDefault();
          return;
        default:
          return;
      }

      if (moved) {
        setCursorPos({ ...cursorRef.current });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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

  // Keyboard navigation for grid
  const handleGridKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    // Only handle Enter/Space for clicking
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        onCharacterClick(characters[index]);
        return;
      default:
        return;
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
              tabIndex={-1}
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
        {/* Virtual cursor */}
        <div
          className={styles.virtualCursor}
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            opacity: cursorVisible ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        />
      </div>
<div className={styles.sideInfo}>

        <Leaderboard />
</div>
      </div>
      </div>
  );
}