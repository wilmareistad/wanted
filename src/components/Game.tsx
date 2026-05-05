import { useState } from "react";
import type { Character } from "../types/Character";
import { CHARACTERS } from "../data/characters";
import Timer from "./Timer";

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
  const [targetFigure, setTargetFigure] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  function startGame() {
    const newTarget = pickTargetFigure();
    setTargetFigure(newTarget);
    setCharacters(generateCharacters(9, newTarget));
    setMessage("");
    setScore(0);
    setTimerKey((k) => k + 1);
    setGameState("playing");
  }

  function nextRound() {
    const newTarget = pickTargetFigure();
    setTargetFigure(newTarget);
    setCharacters(generateCharacters(9, newTarget));
  }

  function handleClick(character: Character) {
    if (gameState !== "playing") return;
    if (character.isTarget) {
      setScore((prev) => prev + 1);
      setMessage("CORRECT!");
      nextRound();
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
        <div>{targetFigure}</div>
      </div>

      <Timer
        key={timerKey}
        initialTime={30}
        onTimeUp={() => setGameState("gameover")}
      />

      <h2>{message}</h2>
      <p>{score}</p>

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