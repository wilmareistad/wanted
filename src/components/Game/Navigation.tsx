import type { ReactNode } from "react";
import type { IdleProps } from "../../types/Game";
import styles from "./Idle.module.css";

export function Navigation({ onStartGame }: IdleProps): ReactNode {
  return (
    <section className={styles.infoButtons}>
      <button className={styles.playBtn} onClick={onStartGame}>
        PLAY
      </button>
      <div>
        <button className={styles.tivoliBtn}>TO TIVOLI</button>
        <button className={styles.rewardBtn}>REWARDS</button>
      </div>
    </section>
  );
}
