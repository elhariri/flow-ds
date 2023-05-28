import { TransactionCompany, TransactionType } from "../../index.types";

export type Datapoint = {
  date: number;
  prices: {
    [key in TransactionCompany]: {
      buyPrice: number;
      sellPrice: number;
    };
  };
  possibilities: {
    [key in TransactionCompany]: TransactionType[];
  };
};
