import { DailyStockPrice } from "../../Types/Model.types";

export default function DailyStockPriceBuilder(
  company: string,
  date: number,
  lowestPrice: number,
  highestPrice: number
): DailyStockPrice {
  return {
    company,
    date,
    lowestPrice,
    highestPrice,
  };
}
