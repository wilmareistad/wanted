import { useGameLogic } from "./UseGameLogic";
import { Idle } from "./Idle";
import { GameOn } from "./GameOn";
import { GameOver } from "./GameOver";

export default function Game() {
  const {
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
  } = useGameLogic();

  if (gameState === "idle") {
    return <Idle onStartGame={startGame} />;
  }

  if (gameState === "playing") {
    return (
      <GameOn
        currentLevel={currentLevel}
        targetFigure={targetFigure}
        characters={characters}
        message={message}
        score={score}
        loading={loading}
        timerKey={timerKey}
        timerRef={timerRef}
        onCharacterClick={handleClick}
        onTimeUp={() => setGameState("gameover")}
      />
    );
  }

  return <GameOver score={score} currentLevel={currentLevel} onPlayAgain={startGame} transaction={transaction} />;
}
