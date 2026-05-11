import type { ReactNode } from "react";
import type { IdleProps } from "../../types/Game";
import styles from "./Idle.module.css";

export function Idle({ onStartGame }: IdleProps): ReactNode {
  return (
    <div className={styles.idleContainer}>
      <h1>WANTED</h1>
      <h2>
        AT <span className={styles.yrgo}>YRGO</span>!
      </h2>

      <section className={styles.infoBoxes}>
        <div className={styles.box}>
          <h3>INSTRUCTIONS</h3>
          <p>Runes family is visiting Yrgo but one is an imposter... Find the wanted Rune and catch them before time runs out! </p>
        </div>
        <div className={styles.box}>
          <h3 className={styles.leaderboardH}>LEADERBOARD</h3>
          <p>leaderbord ruta</p>
        </div>
      </section>

      <section className={styles.boxButtons}>sektion med alla knappar</section>

      <button onClick={onStartGame}>Start game</button>
    </div>
  );
}
