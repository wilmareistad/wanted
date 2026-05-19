import { useGameLogic } from "./UseGameLogic";
import { Idle } from "./Idle";
import { GameOn } from "./GameOn";
import { GameOver } from "./GameOver";
import TokenExpired from "../../errors/TokenExpired";
import PayoutFailed from "../../errors/PayoutFailed";
import TransactionFailed from "../../errors/TransactionFailed";

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
    error,
  } = useGameLogic();

  if (error?.type === "TOKEN_EXPIRED") return <TokenExpired />;
  if (error?.type === "PAYOUT_FAILED")
    return <PayoutFailed transactionId={transaction?.id} />;
  if (error?.type === "TRANSACTION_FAILED")
    return <TransactionFailed onRetry={() => window.location.reload()} />;
  if (error) return <p>Something went wrong: {error.type}</p>;

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

  return (
    <GameOver
      score={score}
      currentLevel={currentLevel}
      onPlayAgain={startGame}
      transaction={transaction}
    />
  );
}
