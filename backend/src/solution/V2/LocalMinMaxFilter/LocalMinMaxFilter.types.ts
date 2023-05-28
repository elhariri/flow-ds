import { Stocks, TransactionType } from "../../../index.types";

export type BuyStockAction = {
  action: "ACHAT";
  price: number;
  otherStockPrice: number;
};

export type SellStockAction = {
  action: "VENTE";
  price: number;
};

export type StockDayAction = {
  action: TransactionType;
  price: number;
};

export type StockDayActionV2 = BuyStockAction | SellStockAction;

export type DataPoint = { [key in Stocks]: StockDayAction[] } & {
  date: number;
};

export type DataPointV2 = {
  [key in Stocks]: StockDayActionV2[];
} & {
  date: number;
};
