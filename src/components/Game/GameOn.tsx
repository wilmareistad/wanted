import { useCallback, useRef, type ReactNode } from "react";
import Timer from "../Timer";
import CarouselGrid from "../CarouselGrid";
import { isImage } from "../../utils/gameUtils";
import styles from "./Game.module.css";
import type { GameOnProps } from "../../types/Game";

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
  const cols = Math.sqrt(currentLevel.gridCount);

  const clickRef = useRef(onCharacterClick);
  clickRef.current = onCharacterClick;

  const stableClick = useCallback(
    (c: Parameters<typeof onCharacterClick>[0]) => clickRef.current(c),
    [] // eslint-disable-line
  );

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <p className={styles.headerText}>Level {currentLevel.level}</p>
        <p className={styles.headerText}>Score: {score}</p>
        <h1 className={styles.title}>Wanted!</h1>

        <div className={styles.targetBox}>
          {isImage(targetFigure) ? (
            <img src={targetFigure} alt="target" className={styles.targetImg} />
          ) : (
            targetFigure
          )}
        </div>

        <Timer key={timerKey} ref={timerRef} initialTime={10} onTimeUp={onTimeUp} />

        <div className={styles.messageBox}>
          {message && <h2 className={styles.message}>{message}</h2>}
        </div>
      </div>

      {/* Playfield */}
      <div className={styles.playfield}>
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : currentLevel.carousel ? (
          <CarouselGrid characters={characters} cols={cols} onCharacterClick={stableClick} />
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
    </div>
  );
}