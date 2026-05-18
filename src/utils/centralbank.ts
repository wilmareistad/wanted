import { calculatePayout } from "./gameUtils";
import type { CentralbankUser, Transaction } from "../types/CentralBank";

const BASE_URL = import.meta.env.VITE_CENTRALBANK_URL;
const API_KEY = import.meta.env.VITE_CENTRALBANK_API_KEY;

const headers = {
  "Content-Type": "application/json",
};

export async function getIdentity(token: string): Promise<CentralbankUser> {
  const res = await fetch(`${BASE_URL}/identity-tokens/${token}`, { headers });
  if (res.status === 401) throw { type: "TOKEN_EXPIRED" };
  if (!res.ok) throw { type: "NETWORK_ERROR", message: "Could not verify identity" };
  const data = await res.json();
  return data.user;
}

export async function createTransaction(identityToken: string): Promise<Transaction> {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers,
    body: JSON.stringify({ identity_token: identityToken, amount: 2, api_key: API_KEY }),
  });
  if (res.status === 401) throw { type: "TOKEN_EXPIRED" };
  if (!res.ok) throw { type: "TRANSACTION_FAILED" };
  return res.json();
}

export async function sendPayout(transactionId: string, levelsCleared: number): Promise<void> {
  const amount = calculatePayout(levelsCleared);
  if (amount === 0) return;
  const res = await fetch(`${BASE_URL}/transactions/${transactionId}/payout`, {
    method: "POST",
    headers,
    body: JSON.stringify({ amount, api_key: API_KEY }),
  });
  if (res.status === 401) throw { type: "TOKEN_EXPIRED" };
  if (!res.ok) throw { type: "PAYOUT_FAILED" };
}