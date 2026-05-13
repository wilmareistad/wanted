import type { ReactNode } from "react";
import type { IdleProps } from "../../types/Game";
import styles from "./Idle.module.css";
import { Leaderboard } from "../Leaderboard";
import { Navigation } from "./Navigation";
import Instructions from '../Instructions';

export function Idle({ onStartGame }: IdleProps): ReactNode {
  return (
    <div className={styles.idleContainer}>
      <h1>WANTED</h1>
      <h2>
        AT <span className={styles.yrgo}>YRGO</span>!
      </h2>

      <section className={styles.infoBoxes}>
        <Instructions />
        <div className={styles.box}>
          <h3 className={styles.leaderboardH}>LEADERBOARD</h3>
          <Leaderboard />
        </div>
      </section>

      <Navigation onStartGame={onStartGame} />
    </div>
  );
}
