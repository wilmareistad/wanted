import { useState } from "react";
import type { ReactNode } from "react";
import type { IdleProps } from "../../types/Game";
import styles from "./Idle.module.css";
import { Leaderboard } from "../Leaderboard";
import { Navigation } from "./Navigation";
import Instructions from "../Instructions";
import Info from "../Info";

export function Idle({ onStartGame }: IdleProps): ReactNode {
  const [infoMode, setInfoMode] = useState<null | "play" | "info">(null);

  const openInfoForPlay = () => setInfoMode("play");
  const openInfo = () => setInfoMode("info");
  const handleStartFromInfo = () => {
    setInfoMode(null);
    onStartGame();
  };

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

        <Navigation onStartGame={openInfoForPlay} onInfoClick={openInfo} />
      </div>

      <Info
        isOpen={infoMode !== null}
        onClose={() => setInfoMode(null)}
        onStartGame={handleStartFromInfo}
        showStartButton={infoMode === "play"}
      />
    </>
  );
}
