import { Stocks, TransactionType } from "../../../index.types";

export type StockDayAction = {
  action: TransactionType;
  price: number;
};

export type DataPoint = { [key in Stocks]: StockDayAction[] } & {
  date: number;
};
