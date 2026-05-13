import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { IdleProps } from "../../types/Game";
import styles from "./Idle.module.css";
import { Leaderboard } from "../Leaderboard";
import { Navigation } from "./Navigation";
import Instructions from "../Instructions";
import Info from "../Info";

export function Idle({ onStartGame }: IdleProps): ReactNode {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the info modal before
    const hasSeenInfo = localStorage.getItem("hasSeenInfoModal");
    if (!hasSeenInfo) {
      setIsInfoOpen(true);
      localStorage.setItem("hasSeenInfoModal", "true");
    }
  }, []);

  return (
    <>
      <div className={styles.idleContainer}>
        <h1>WANTED</h1>
        <h2>
          AT <span className={styles.yrgo}>YRGO</span>!
        </h2>

        <section className={styles.infoBoxes}>
          <Instructions />
          <Leaderboard />
        </section>

        <Navigation
          onStartGame={onStartGame}
          onInfoClick={() => setIsInfoOpen(true)}
        />
      </div>

      <Info isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </>
  );
}
