import Rune from "../assets/Rune.png";
import RedRune from "../assets/RedRune.png";
import ReallyRedRune from "../assets/ReallyRedRune.png";
import WhiteRune from "../assets/WhiteRune.png";
import BlackRune from "../assets/BlackRune.png";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export type GridCharacter = {
  id: number;
  figure: string;
};

export type LevelData = {
  sessionId: string;
  targetFigure: string;
  grid: GridCharacter[];
};

export async function generateLevel(count: number): Promise<LevelData> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/generate_level`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ count }),
  });
  const data = await res.json();
  return {
    sessionId: data.sessionId,
    targetFigure: data.targetFigure,
    grid: data.grid.map((figure: string, i: number) => ({ id: i, figure })),
  };
}

export async function validateClick(
  sessionId: string,
  clickedIndex: number,
): Promise<boolean> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/validate_click`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      session_id: sessionId,
      clicked_index: clickedIndex,
    }),
  });
  return res.json();
}

// figure help 
export function resolveFigure(figure: string): string {
  if (figure === "rune") return Rune;
  if (figure === "redrune") return RedRune;
  if (figure === "reallyredrune") return ReallyRedRune;
  if (figure === "redrune") return RedRune;
  if (figure === "whiterune") return WhiteRune;
  if (figure === "blackrune") return BlackRune;
  return figure;
}

export function isImage(figure: string): boolean {
  return figure.startsWith("/") || figure.includes(".svg") || figure.includes(".png");
}