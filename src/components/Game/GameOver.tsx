import type { ReactNode } from "react";
import type { GameOverProps } from "../../types/Game";
import styles from "./GameOver.module.css";
import { Leaderboard } from "../Leaderboard";
import { Navigation } from "./Navigation";

export function GameOver({
  score,
  currentLevel,
  onPlayAgain,
}: GameOverProps): ReactNode {
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
    <h3 className={styles.rewardTitle}>Reward</h3>
    <div>euro: stamp:
    </div>
  </div>
</div>


        <div className={styles.box}>
          <h3 className={styles.leaderboardH}>LEADERBOARD</h3>
          <Leaderboard />
        </div>
      </section>


      <Navigation onStartGame={onPlayAgain} />
    </div>
  );
}
