import { ExecutionTime, Transaction } from "../../../index.types";

export type DayPrices = {
  date: number;
  GOOGLE: {
    buyPrice: number;
    sellPrice: number;
  };
  AMAZON: {
    buyPrice: number;
    sellPrice: number;
  };
};

export type MaximizerOutput = {
  profit: number;
  transactions: Transaction[];
  executionTime: ExecutionTime;
};
