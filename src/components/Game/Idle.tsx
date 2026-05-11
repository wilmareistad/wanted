import type { ReactNode } from "react";
import type { IdleProps } from "../../types/Game";
import styles from "./Idle.module.css";

export function Idle({ onStartGame }: IdleProps): ReactNode {
  return (
    <div>
      <h1>WANTED</h1>
      <h2>
        AT <span className={styles.yrgo}>YRGO</span>!
      </h2>

      <section className="styles.InfoBoxes">
        <div className="styles.instructions">instruktioner ruta</div>
        <div className="styles.leaderboard">leaderbord ruta</div>
      </section>

      <section className="styles.idleButtons">sektion med alla knappar</section>

      <button onClick={onStartGame}>Start game</button>
    </div>
  );
}
