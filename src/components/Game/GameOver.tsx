import type { ReactNode } from "react";
import type { GameOverProps } from "../../types/Game";
import styles from "./GameOver.module.css";
import { Leaderboard } from "../Leaderboard";
import { Navigation } from "./Navigation";
import { calculatePayout } from "../../utils/gameUtils";

export function GameOver({
  score,
  currentLevel,
  onPlayAgain,
  transaction,
}: GameOverProps): ReactNode {
  const euro = calculatePayout(currentLevel.level);

  return (
    <div className={styles.overContainer}>
      <h1>GAME OVER</h1>

      <section className={styles.infoBoxes}>
        <div className={styles.box}>
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Score:</span>
              <span className={styles.statValue}>{score}</span>
            </div>

            <div className={styles.statItem}>
              <span className={styles.statLabel}>Level:</span>
              <span className={styles.statValue}>{currentLevel.level}</span>
            </div>
          </div>

          <div className={styles.rewardBox}>
            <div>€{euro} | Stamp: {transaction?.stamp}</div>
          </div>
        </div>

        <Leaderboard />
      </section>

      <Navigation onStartGame={onPlayAgain} />
    </div>
  );
}
