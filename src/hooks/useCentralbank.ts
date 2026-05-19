import { useState, useEffect } from "react";
import { getIdentity, createTransaction, sendPayout } from "../utils/centralbank";
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
      // getIdentity is optional - try to fetch it but don't block if it fails
      getIdentity(token)
        .then(setUser)
        .catch(() => {
          // Silently ignore getIdentity failures - it's optional
          console.debug("getIdentity failed (optional endpoint)");
        });
    }
  }, []);

  async function startGame() {
    try {
      if (!identityToken) {
        throw { type: "NETWORK_ERROR", message: "No identity token provided" };
      }
      const txn = await createTransaction(identityToken);
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
        console.log(`endGame called with transaction.id=${transaction.id}, levelsCleared=${levelsCleared}`);
        await sendPayout(transaction.id, levelsCleared);
      } else {
        console.warn("endGame called but no transaction.id");
      }
    } catch (e) {
      console.error("endGame error:", e);
      setError(e as CentralbankError);
    }
  }

  return { user, startGame, endGame, transaction, error };
}