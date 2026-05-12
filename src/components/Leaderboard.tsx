import { useEffect, useState } from "react";
import { getTopFive } from "../utils/leaderboard";
import type { LeaderboardEntry } from "../types/Leaderboard";

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    getTopFive().then(setEntries);
  }, []);

  return (
    <ol>
      {entries.map((entry) => (
        <li key={entry.id}>
          {entry.name} — {entry.score}
        </li>
      ))}
    </ol>
  );
}