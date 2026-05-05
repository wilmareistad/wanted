import { useState } from "react";
import type { Character } from "../types/Character";
import Timer from "./Timer";

function generateCharacters(count: number): Character[] {
    const targetIndex = Math.floor(Math.random() * count);

    return Array.from({length: count}, (_, i ) => ({
        id: i,
        isTarget: i === targetIndex,
    }));
}

export default function Game() {
  const [characters, setCharacters] = useState<Character[]>(
    generateCharacters(9)
  );

  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  function handleClick(character: Character) {
  if (isGameOver) return;

  if (character.isTarget) {
    setScore((prev) => prev + 1);
    setMessage("CORRECT!");
    setCharacters(generateCharacters(9));
  } else {
    setMessage("Wrong...");
  }
}

  return (
    <div>
      <Timer
      initialTime={30}
      onTimeUp={() => setIsGameOver(true)}
      />
      <h2>{message}</h2>
      <p>{score}</p>
      {isGameOver && <h2>Game Over! Final score: {score}</h2>}

      <div className="grid">
        {characters.map((c) => (
          <button key={c.id} onClick={() => handleClick(c)}>
            🙂
          </button>
          
        ))}
      </div>
    </div>
  );
}