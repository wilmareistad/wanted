import { useState, useRef } from "react";
import type { Character } from "../types/Character";
import Timer, { type TimerHandle } from "./Timer";
import { LEVELS } from "../data/Levels";
import { pickTargetFigure, generateCharacters } from "../utils/gameUtils";
import styles from "./Game.module.css";
import CarouselGrid from "./CarouselGrid";

export default function Game() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [levelIndex, setLevelIndex] = useState(0);
  const [targetFigure, setTargetFigure] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [currentTime, setCurrentTime] = useState(10);
  const timerRef = useRef<TimerHandle>(null);

  const currentLevel = LEVELS[levelIndex];
  const cols = Math.sqrt(currentLevel.gridCount);
  const [timerKey, setTimerKey] = useState(0);

  function startGame() {
    const newTarget = pickTargetFigure();
    setTargetFigure(newTarget);
    setCharacters(generateCharacters(LEVELS[0].gridCount, newTarget));
    setMessage("");
    setScore(0);
    setLevelIndex(0);
    setCurrentTime(10);
    setTimerKey((k) => k + 1);
    setGameState("playing");
  }

  function handleClick(character: Character) {
    if (gameState !== "playing") return;

    if (character.isTarget) {
      setScore((prev) => prev + 1);
      timerRef.current?.addTime(5);

      const nextIndex = levelIndex + 1;
      if (nextIndex >= LEVELS.length) {
        setGameState("gameover");
      } else {
        setMessage(`Level ${nextIndex + 1}!`);
        setLevelIndex(nextIndex);
        const newTarget = pickTargetFigure();
        setTargetFigure(newTarget);
        setCharacters(generateCharacters(LEVELS[nextIndex].gridCount, newTarget));
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
      <div>{targetFigure}</div>

      <Timer
        key={timerKey}
        ref={timerRef}
        initialTime={currentTime}
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

      {/* Vanligt grid eller karusell */}
      {currentLevel.carousel ? (
        <CarouselGrid characters={characters} cols={cols} onCharacterClick={handleClick} />
      ) : (
        <div className={`grid ${styles[`grid${cols}`]}`}>
          {characters.map((c) => (
            <button key={c.id} onClick={() => handleClick(c)}>
              {c.figure}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}