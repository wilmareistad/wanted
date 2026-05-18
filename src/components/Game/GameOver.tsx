import { useState } from "react";
import type { GameOverProps } from "../../types/Game";
import styles from "./GameOver.module.css";
import { Leaderboard } from "../Leaderboard";
import { Navigation } from "./Navigation";
import Info from "../Info";
import { calculatePayout } from "../../utils/gameUtils";

export function GameOver({
  score,
  currentLevel,
  onPlayAgain,
  transaction,
}: GameOverProps) {
  const [infoMode, setInfoMode] = useState<null | "play" | "info">(null);

  const openInfoForPlay = () => setInfoMode("play");
  const openInfo = () => setInfoMode("info");
  const handleStartFromInfo = () => {
    setInfoMode(null);
    onPlayAgain();
  };
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
              <span className={styles.statValue}>{score}</span>
            </div>
          </div>

          <div className={styles.rewardBox}>
            <div>
              €{euro} | Stamp: {transaction?.stamp?.stamptype}
            </div>
          </div>
        </div>

        <Leaderboard />
      </section>

      <Navigation onStartGame={openInfoForPlay} onInfoClick={openInfo} />

      <Info
        isOpen={infoMode !== null}
        onClose={() => setInfoMode(null)}
        onStartGame={handleStartFromInfo}
        showStartButton={infoMode === "play"}
      />
    </div>
  );
}
