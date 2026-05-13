import { useState, useEffect } from "react";
// change from centralbank.mock to centralbank when centralbank is done
import { getIdentity, createTransaction, sendPayout } from "../utils/centralbank.mock";
import type { CentralbankUser, Transaction } from "../types/CentralBank";

export function useCentralbank() {
  const [user, setUser] = useState<CentralbankUser | null>(null);
  const [identityToken, setIdentityToken] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("identity_token");
    history.replaceState({}, "", window.location.pathname);

    if (token) {
      setIdentityToken(token);
      getIdentity(token).then(setUser);
    }
  }, []);

  async function startGame() {
    // Use identity token from URL if it exist, otherwise mock
    const token = identityToken || "mock-token";
    const txn = await createTransaction(token);
    setTransaction(txn);
    return txn.stamp;
  }

  async function endGame(levelsCleared: number) {
    if (transaction?.id) {
      await sendPayout(transaction.id, levelsCleared);
    }
  }

  return { user, startGame, endGame, transaction };
}