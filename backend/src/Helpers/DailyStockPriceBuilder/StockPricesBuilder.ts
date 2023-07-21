import { DailyStockPrice } from "../../Types/Model.types";
import DailyStockPriceBuilder from "./DailyStockPriceBuilder";

export default function StockPricesBuilder(
  company: string,
  values: [number, number, number][]
): DailyStockPrice[] {
  return values.map(([date, lowestPrice, highestPrice]) =>
    DailyStockPriceBuilder(company, date, lowestPrice, highestPrice)
  );
}
