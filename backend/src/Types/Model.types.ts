type WithId<TValues> = TValues & { id: number };

export type Company = {
  name: string;
  stockPrices?: DailyStockPrice[];
};

export type DailyStockPrice = {
  date: number;
  lowestPrice: number;
  highestPrice: number;
  company: string;
};

export type DailyStockPricePayload = WithId<DailyStockPrice>;
export type CompanyPayload = WithId<Company>;
