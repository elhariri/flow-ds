export type TransactionType = "ACHAT" | "VENTE";
export type TransactionCompany = "GOOGLE" | "AMAZON";

export type ExecutionTime = {
  seconds: number;
  minutes: number;
};

export type Transaction = {
  date: string;
  action: TransactionType;
  name: TransactionCompany;
  unitPrice: number;
  numShares: number;
  total: number;
  portfolioAmount: number;
};

export type ServerSuccessfullResponseBody = {
  profit: number;
  transactions: Transaction[];
  executionTime: ExecutionTime;
};

export type ServerSuccessfullResponse = {
  success: boolean;
  body: ServerSuccessfullResponseBody;
};
