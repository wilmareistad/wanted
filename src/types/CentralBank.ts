export type CentralbankUser = {
  id: string;
  name: string;
};

export type Transaction = {
  id: string;
  stamp: string;
};

export type CentralbankError =
  | { type: "TOKEN_EXPIRED" }
  | { type: "TRANSACTION_FAILED" }
  | { type: "PAYOUT_FAILED" }
  | { type: "NETWORK_ERROR"; message: string };