import { useState, useEffect } from "react";
// change from centralbank.mock to centralbank when centralbank is done
import { getIdentity, createTransaction, sendPayout } from "../utils/centralbank.mock";
import type { CentralbankUser } from "../types/CentralBank";

export function useCentralbank() {
  const [user, setUser] = useState<CentralbankUser | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("identity_token");
    history.replaceState({}, "", window.location.pathname);

    if (token) {
      getIdentity(token).then(setUser);
    }
  }, []);

  async function startGame() {
    const transaction = await createTransaction("mock-token");
    setTransactionId(transaction.id);
    return transaction.stamp;
  }

  async function endGame(levelsCleared: number) {
    if (transactionId) {
      await sendPayout(transactionId, levelsCleared);
    }
  }

  return { user, startGame, endGame };
}