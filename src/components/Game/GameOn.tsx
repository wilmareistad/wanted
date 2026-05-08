import type { ReactNode } from "react";
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

  return (
    <div>
      <p>Level {currentLevel.level}</p>
      <p>Score: {score}</p>
      <h1>Wanted!</h1>

      <div style={{ fontSize: "3rem", minHeight: "60px" }}>
        {isImage(targetFigure) ? (
          <img src={targetFigure} alt="target" style={{ height: "60px", width: "auto" }} />
        ) : (
          targetFigure
        )}
      </div>

      <Timer key={timerKey} ref={timerRef} initialTime={10} onTimeUp={onTimeUp} />

      <h2>{message}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : currentLevel.carousel ? (
        <CarouselGrid characters={characters} cols={cols} onCharacterClick={onCharacterClick} />
      ) : (
        <div className={`grid ${styles[`grid${cols}`]}`}>
          {characters.map((c) => (
            <button
              key={c.id}
              onClick={() => onCharacterClick(c)}
              style={{ fontSize: "2rem", minWidth: "60px", minHeight: "60px" }}
            >
              {isImage(c.figure) ? (
                <img src={c.figure} alt="figure" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              ) : (
                c.figure
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}