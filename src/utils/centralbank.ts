import { calculatePayout } from "./gameUtils";
import type { CentralbankUser } from "../types/CentralBank"
import type { Transaction } from "../types/CentralBank"

const BASE_URL = import.meta.env.VITE_CENTRALBANK_URL;
const API_KEY = import.meta.env.VITE_CENTRALBANK_API_KEY;
const AMUSEMENT_UUID = import.meta.env.VITE_AMUSEMENT_UUID;

const headers = {
  "Content-Type": "application/json",
  "X-Api-Key": API_KEY,
};

export async function getIdentity(token: string): Promise<CentralbankUser> {
  const res = await fetch(`${BASE_URL}/identity-tokens/${token}`, {
    headers,
  });
  if (!res.ok) throw new Error("Invalid or expired token");
  const data = await res.json();
  return data.user;
}

export async function createTransaction(identityToken: string): Promise<Transaction> {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      identity_token: identityToken,
      amount: 2,
      amusement_uuid: AMUSEMENT_UUID,
    }),
  });
  if (!res.ok) throw new Error("Transaction failed");
  return res.json();
}

export async function sendPayout(transactionId: string, levelsCleared: number): Promise<void> {
  const amount = calculatePayout(levelsCleared);
  if (amount === 0) return;

  const res = await fetch(`${BASE_URL}/transactions/${transactionId}/payout`, {
    method: "POST",
    headers,
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) throw new Error("Payout failed");
}