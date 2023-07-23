export type TransactionType = "ACHAT" | "VENTE";

export type ExecutionTime = {
  seconds: number;
  minutes: number;
  milliseconds: number;
};

export type Transaction = {
  date: string;
  action: TransactionType;
  company: string;
  unitPrice: number;
  numShares: number;
  total: number;
  portfolioAmount: number;
};

export type ServerSuccessfullResponseBody = {
  transactions: Transaction[];
  executionTime: ExecutionTime;
  profit: number;
};

export type ServerSuccessfullResponse = {
  success: boolean;
  result: ServerSuccessfullResponseBody;
};
