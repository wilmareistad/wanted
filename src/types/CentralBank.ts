export type CentralbankUser = {
  id: string;
  name: string;
};

export type Stamp = {
  id: string;
  user_id: string;
  stamptype_id: string;
  image_url: string;
  stamptype: string;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  stamp: Stamp;
};

export type CentralbankError =
  | { type: "TOKEN_EXPIRED" }
  | { type: "TRANSACTION_FAILED" }
  | { type: "PAYOUT_FAILED" }
  | { type: "NETWORK_ERROR"; message: string };