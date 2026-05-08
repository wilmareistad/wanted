import type { ReactNode } from "react";
import type { IdleProps } from "../../types/Game";

export function Idle({ onStartGame }: IdleProps): ReactNode {
  return (
    <div>
      <h1>Wanted!</h1>
      <button onClick={onStartGame}>Start game</button>
    </div>
  );
}