import Config from "./config";
import StockPrices from "./data/AmazonStockPrices.json";

export type DailySharePrices = (typeof StockPrices)[0];

export type TransactionType = "ACHAT" | "VENTE";
export type TransactionCompany = (typeof Config.Stocks)[number];

export type ExecutionTime = {
  seconds: number;
  minutes: number;
};

export type Transaction = {
  date: string;
  action: TransactionType;
  name: TransactionCompany;
  unit_price: number;
  num_shares: number;
  total: number;
  portfolio_amount: number;
};

export type ServerSuccessfullResponseBody = {
  transactions: Transaction[];
  executionTime: ExecutionTime;
};

export type ServerSuccessfullResponse = {
  success: boolean;
  body: ServerSuccessfullResponseBody;
};
