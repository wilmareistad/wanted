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
  const [targetFigure, setTargetFigure] = useState<string>(pickTargetFigure);
  const [characters, setCharacters] = useState<Character[]>(
    generateCharacters(9, targetFigure),
  );
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  function nextRound() {
    const newTarget = pickTargetFigure();
    setTargetFigure(newTarget);
    setCharacters(generateCharacters(9, newTarget));
  }

  function handleClick(character: Character) {
    if (isGameOver) return;

    if (character.isTarget) {
      setScore((prev) => prev + 1);
      setMessage("CORRECT!");
      nextRound();
    } else {
      setMessage("Wrong...");
    }
  }

  return (
    <div>
      <div>
        <h1>Wanted!</h1>
        <div>{targetFigure}</div>
      </div>

      <Timer initialTime={30} onTimeUp={() => setIsGameOver(true)} />
      <h2>{message}</h2>
      <p>{score}</p>
      {isGameOver && <h2>Game Over! Final score: {score}</h2>}
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
