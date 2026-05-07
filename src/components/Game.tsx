import { useState, useRef } from "react";
import Timer, { type TimerHandle } from "./Timer";
import { LEVELS } from "../data/Levels";
import { generateLevel, validateClick, resolveFigure, isImage, type GridCharacter } from "../utils/gameUtils";
import styles from "./Game.module.css";
import CarouselGrid from "./CarouselGrid";

export default function Game() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [levelIndex, setLevelIndex] = useState(0);
  const [targetFigure, setTargetFigure] = useState("");
  const [characters, setCharacters] = useState<GridCharacter[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<TimerHandle>(null);

  const currentLevel = LEVELS[levelIndex];
  const cols = Math.sqrt(currentLevel.gridCount);

  async function loadLevel(index: number) {
    setLoading(true);
    const data = await generateLevel(LEVELS[index].gridCount);
    setSessionId(data.sessionId);
    setTargetFigure(resolveFigure(data.targetFigure));
    setCharacters(data.grid.map((c) => ({ ...c, figure: resolveFigure(c.figure) })));
    setLoading(false);
  }

  async function startGame() {
    setScore(0);
    setLevelIndex(0);
    setMessage("");
    setTimerKey((k) => k + 1);
    setGameState("playing");
    await loadLevel(0);
  }

  async function handleClick(character: GridCharacter) {
    if (gameState !== "playing" || !sessionId || loading) return;

    const correct = await validateClick(sessionId, character.id);

    if (correct) {
      setScore((prev) => prev + 1);
      timerRef.current?.addTime(5);

      const nextIndex = levelIndex + 1;
      if (nextIndex >= LEVELS.length) {
        setGameState("gameover");
      } else {
        setMessage(`Level ${nextIndex + 1}!`);
        setLevelIndex(nextIndex);
        await loadLevel(nextIndex);
      }
    } else {
      setMessage("Wrong...");
    }
  }

  if (gameState === "idle") {
    return (
      <div>
        <h1>Wanted!</h1>
        <button onClick={startGame}>Start game</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Wanted!</h1>
      <p>Level {currentLevel.level}</p>

      <div style={{ fontSize: "3rem", minHeight: "60px" }}>
        {isImage(targetFigure) ? (
          <img src={targetFigure} alt="target" style={{ height: "60px", width: "auto" }} />
        ) : (
          targetFigure
        )}
      </div>

      <Timer
        key={timerKey}
        ref={timerRef}
        initialTime={10}
        onTimeUp={() => setGameState("gameover")}
      />

      <h2>{message}</h2>
      <p>Score: {score}</p>

      {gameState === "gameover" && (
        <div>
          <h2>Game Over! Score: {score}</h2>
          <button onClick={startGame}>Play again</button>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : currentLevel.carousel ? (
        <CarouselGrid characters={characters} cols={cols} onCharacterClick={handleClick} />
      ) : (
        <div className={`grid ${styles[`grid${cols}`]}`}>
          {characters.map((c) => (
            <button
              key={c.id}
              onClick={() => handleClick(c)}
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