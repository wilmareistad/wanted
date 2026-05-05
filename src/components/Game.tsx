import { useState } from "react";
import type { Character } from "../types/character";


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

  function handleClick(character: Character) {
    if (character.isTarget) {
      setMessage("RÄTT!");
      setCharacters(generateCharacters(9)); // ny runda
    } else {
      setMessage("Fel...");
    }
  }

  return (
    <div>
      <h2>{message}</h2>

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