import { Stocks, TransactionType } from "../../../index.types";

export type StockDayAction = {
  action: TransactionType;
  price: number;
};

export type Datapoint = {
  date: number;
  prices: {
    [key in Stocks]: {
      buyPrice: number;
      sellPrice: number;
    };
  };
};
