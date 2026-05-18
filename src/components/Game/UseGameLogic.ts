import { useState, useRef } from "react";
import type { TimerHandle } from "../Timer";
import { LEVELS } from "../../data/Levels";
import {
  generateLevel,
  validateClick,
  resolveFigure,
  type GridCharacter,
} from "../../utils/gameUtils";
import { useCentralbank } from "../../hooks/useCentralbank";

export function useGameLogic() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">(
    "idle",
  );
  const [levelIndex, setLevelIndex] = useState(0);
  const [targetFigure, setTargetFigure] = useState("");
  const [characters, setCharacters] = useState<GridCharacter[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<TimerHandle>(null);
  const {
    startGame: startCentralbankGame,
    endGame,
    transaction,
    error,
  } = useCentralbank();

  const currentLevel = LEVELS[levelIndex];

  async function loadLevel(index: number) {
    setLoading(true);
    setMessage("");
    const data = await generateLevel(LEVELS[index].gridCount);
    setSessionId(data.sessionId);
    setTargetFigure(resolveFigure(data.targetFigure));
    setCharacters(
      data.grid.map((c) => ({ ...c, figure: resolveFigure(c.figure) })),
    );
    setLoading(false);
  }

  async function startGame() {
    setScore(0);
    setLevelIndex(0);
    setMessage("");
    setTimerKey((k) => k + 1);
    setGameState("playing");
    await startCentralbankGame();
    await loadLevel(0);
  }

  async function handleClick(character: GridCharacter) {
    if (gameState !== "playing" || !sessionId || loading) return;

    const correct = await validateClick(sessionId, character.id);

    if (correct) {
      setScore((prev) => prev + 1);
      timerRef.current?.addTime(2);

      const nextIndex = levelIndex + 1;
      if (nextIndex >= LEVELS.length) {
        await endGame(currentLevel.level);
        setGameState("gameover");
      } else {
        setLevelIndex(nextIndex);
        await loadLevel(nextIndex);
      }
    } else {
      setMessage("Wrong!");
      setTimeout(() => setMessage(""), 3000);
    }
  }

  return {
    gameState,
    setGameState,
    currentLevel,
    targetFigure,
    characters,
    message,
    score,
    loading,
    timerKey,
    timerRef,
    startGame,
    handleClick,
    transaction,
    error,
  };
}