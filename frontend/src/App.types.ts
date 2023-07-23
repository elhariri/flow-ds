export type TransactionType = "ACHAT" | "VENTE";
export type TransactionCompany = "GOOGLE" | "AMAZON";

export type CompanyOption = {
  name: string;
  value: string;
};

export type ExecutionTime = {
  seconds: number;
  minutes: number;
  milliseconds: number;
};

export type Transaction = {
  date: string;
  action: TransactionType;
  company: TransactionCompany;
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
