import { Stocks, TransactionType } from "../../index.types";

export type Datapoint = {
  date: number;
  prices: {
    [key in Stocks]: {
      buyPrice: number;
      sellPrice: number;
    };
  };
  possibilities: {
    [key in Stocks]: TransactionType[];
  };
};
