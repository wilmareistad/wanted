import { useState, useEffect } from "react";
// change from centralbank.mock to centralbank when centralbank is done
import { getIdentity, createTransaction, sendPayout } from "../utils/centralbank.mock";
import type { CentralbankUser, Transaction, CentralbankError } from "../types/CentralBank";


export function useCentralbank() {
  const [user, setUser] = useState<CentralbankUser | null>(null);
  const [identityToken, setIdentityToken] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<CentralbankError | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("identity_token");
    history.replaceState({}, "", window.location.pathname);

    if (token) {
      setIdentityToken(token);
      getIdentity(token)
        .then(setUser)
        .catch(setError);
    }
  }, []);

  async function startGame() {
    try {
      const token = identityToken || "mock-token";
      const txn = await createTransaction(token);
      setTransaction(txn);
      return txn.stamp;
    } catch (e) {
      setError(e as CentralbankError);
      throw e;
    }
  }

  async function endGame(levelsCleared: number) {
    try {
      if (transaction?.id) {
        await sendPayout(transaction.id, levelsCleared);
      }
    } catch (e) {
      setError(e as CentralbankError);
    }
  }

  return { user, startGame, endGame, transaction, error };
}