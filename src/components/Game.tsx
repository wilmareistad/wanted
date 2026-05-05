import { useState } from "react";
import type { Character } from "../types/Character";
import { CHARACTERS } from "../data/characters";
import Timer from "./Timer";
import { LEVELS } from "../data/Levels";

function pickTargetFigure(): string {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)].figure;
}

function generateCharacters(count: number, targetFigure: string): Character[] {
  const targetIndex = Math.floor(Math.random() * count);
  const otherFigures = CHARACTERS.filter((c) => c.figure !== targetFigure);
  return Array.from({ length: count }, (_, i) => {
    if (i === targetIndex) {
      return { id: i, isTarget: true, figure: targetFigure };
    }
    const randomOther =
      otherFigures[Math.floor(Math.random() * otherFigures.length)];
    return { id: i, isTarget: false, figure: randomOther.figure };
  });
}

export default function Game() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [levelIndex, setLevelIndex] = useState(0);
  const [targetFigure, setTargetFigure] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [levelScore, setLevelScore] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const currentLevel = LEVELS[levelIndex];

  function startGame() {
    const newTarget = pickTargetFigure();
    setTargetFigure(newTarget);
    setCharacters(generateCharacters(LEVELS[0].gridCount, newTarget));
    setMessage("");
    setScore(0);
    setLevelScore(0);
    setLevelIndex(0);
    setTimerKey((k) => k + 1);
    setGameState("playing");
  }

  function nextRound(index: number) {
    const newTarget = pickTargetFigure();
    setTargetFigure(newTarget);
    setCharacters(generateCharacters(LEVELS[index].gridCount, newTarget));
  }

  function handleClick(character: Character) {
    if (gameState !== "playing") return;

    if (character.isTarget) {
      const newLevelScore = levelScore + 1;
      setScore((prev) => prev + 1);

      if (newLevelScore >= currentLevel.pointsToAdvance) {
        const nextIndex = levelIndex + 1;
        if (nextIndex >= LEVELS.length) {
          setGameState("gameover");
        } else {
          setMessage(`Level ${nextIndex + 1}!`);
          setLevelIndex(nextIndex);
          setLevelScore(0);
          nextRound(nextIndex);
        }
      } else {
        setLevelScore(newLevelScore);
        setMessage("CORRECT!");
        nextRound(levelIndex);
      }
    } else {
      setMessage("Wrong...");
    }
  }

  // start
  if (gameState === "idle") {
    return (
      <div>
        <h1>Wanted!</h1>
        <p>Find Hans before the time runs out!</p>
        <button onClick={startGame}>Start game</button>
      </div>
    );
  }

  // game and game over
  return (
    <div>
      <div>
        <h1>Wanted!</h1>
        <p>Level {currentLevel.level}</p>
        <div>{targetFigure}</div>
      </div>

      <Timer
        key={timerKey}
        initialTime={30}
        onTimeUp={() => setGameState("gameover")}
      />

      <h2>{message}</h2>
      <p>Score: {score} | Level progress: {levelScore}/{currentLevel.pointsToAdvance}</p>

      {gameState === "gameover" && (
        <div>
          <h2>Game Over! Score: {score}</h2>
          <button onClick={startGame}>Play again</button>
        </div>
      )}

      <div className="grid">
        {characters.map((c) => (
          <button key={c.id} onClick={() => handleClick(c)}>
            {c.figure}
          </button>
        ))}
      </div>
    </div>
  );
}