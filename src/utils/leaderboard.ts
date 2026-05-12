import type { LeaderboardEntry } from "../types/Leaderboard";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

export async function getTopFive(): Promise<LeaderboardEntry[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/leaderboard?select=id,name,score&order=score.desc&limit=5`,
    { headers }
  );
  return res.json();
}

export async function saveScore(name: string, score: number): Promise<void> {
  await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, score }),
  });
}