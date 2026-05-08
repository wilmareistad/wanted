import type { ReactNode } from "react";
import type { GameOverProps } from "../../types/Game";

export function GameOver({ score, onPlayAgain }: GameOverProps): ReactNode {
  return (
    <div>
      <h2>Game Over!</h2>
      <p>Score: {score}</p>
      <button onClick={onPlayAgain}>Play again</button>
    </div>
  );
}