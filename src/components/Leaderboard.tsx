import { useEffect, useState } from "react";
import { getTopFive } from "../utils/leaderboard";
import type { LeaderboardEntry } from "../types/Leaderboard";
import styles from "./Leaderboard.module.css"

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    getTopFive().then(setEntries);
  }, []);

  return (
    // <ol>
    //   {entries.map((entry) => (
    //     <li key={entry.id}>
    //       {entry.name} — {entry.score}
    //     </li>
    //   ))}
    // </ol>
    <ol className={styles.list}>
      {entries.map((entry, index) => (
        <li key={entry.id} className={styles.entry}>
          <span className={styles.rank}>{index + 1}.</span>
          <span className={styles.name}>{entry.name}</span>
          <span className={styles.dots} />
          <span className={styles.score}>{entry.score}</span>
        </li>
      ))}
    </ol>

  );
}