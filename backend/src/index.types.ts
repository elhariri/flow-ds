import Config from "./config";
import StockPrices from "./data-sample/AmazonStockPrices.json";

export type DailyStockPrices = (typeof StockPrices)[0];

export type TransactionType = "ACHAT" | "VENTE";
export type Stocks = (typeof Config.Stocks)[number];

export type ExecutionTime = {
  seconds: number;
  minutes: number;
};

export type Transaction = {
  date: string;
  action: TransactionType;
  name: Stocks;
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
  result: ServerSuccessfullResponseBody;
};
