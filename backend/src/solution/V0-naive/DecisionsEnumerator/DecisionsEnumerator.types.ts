import { Stocks, TransactionType } from "../../../index.types";

export type ShareDayPrices = {
  buyPrice: number;
  sellPrice: number;
};

export type SharesDayPrices = {
  GOOGLE: ShareDayPrices;
  AMAZON: ShareDayPrices;
};

export type Possibility = {
  type: TransactionType;
  share: Stocks;
  amount: number;
};
