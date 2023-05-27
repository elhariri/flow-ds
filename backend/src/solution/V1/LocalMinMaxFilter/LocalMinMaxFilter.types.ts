import { TransactionCompany, TransactionType } from "../../../index.types";

export type StockDayAction = {
  action: TransactionType;
  price: number;
};

export type DataPoint = { [key in TransactionCompany]: StockDayAction[] } & {
  date: number;
};
