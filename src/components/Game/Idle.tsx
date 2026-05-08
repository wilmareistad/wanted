import type { ReactNode } from "react";
import type { IdleProps } from "../../types/Game";

export function Idle({ onStartGame }: IdleProps): ReactNode {
  return (
    <div>
      <h1>WANTED</h1>
      <h2>AT YRGO!</h2>
      <button onClick={onStartGame}>Start game</button>
    </div>
  );
}
