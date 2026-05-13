import type { ReactNode } from "react";
import type { IdleProps } from "../../types/Game";
import styles from "./Idle.module.css";

interface NavigationProps extends IdleProps {
  onInfoClick?: () => void;
}

export function Navigation({
  onStartGame,
  onInfoClick,
}: NavigationProps): ReactNode {
  return (
    <section className={styles.infoButtons}>
      <button className={styles.playBtn} onClick={onStartGame}>
        PLAY
      </button>
      <div>
        <button className={styles.tivoliBtn}>TO TIVOLI</button>
        <button className={styles.rewardBtn} onClick={onInfoClick}>
          Game Info
        </button>
      </div>
    </section>
  );
}   
