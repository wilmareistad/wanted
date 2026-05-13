import type { CentralbankUser, Transaction } from "../types/CentralBank";
import { calculatePayout } from "./gameUtils";

export async function getIdentity(_token: string): Promise<CentralbankUser> {
  return { id: "mock-user-123", name: "Wilma" };
}

export async function createTransaction(_identityToken: string): Promise<Transaction> {
  const txn = { id: "mock-transaction-abc", stamp: "gold tucan" };
  console.log(`[MOCK] Transaction created:`, txn);
  return txn;
}

export async function sendPayout(_transactionId: string, levelsCleared: number): Promise<void> {
  const amount = calculatePayout(levelsCleared);
  console.log(`[MOCK] Payout sent: €${amount} for ${levelsCleared} levels`);
}