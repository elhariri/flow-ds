import { DailyStockPrice } from "../Types/Model.types";

export default function FindBuyAndSellIndexes(prices: DailyStockPrice[]): {
  buyIndex: number;
  sellIndex: number;
  profit: number;
} {
  let counter = 1;
  let minIndex = 0;

  let buyIndex = 0;
  let sellIndex = 1;

  let maxProfit = 0;

  while (counter < prices.length) {
    if (prices[minIndex].lowestPrice < prices[counter].lowestPrice) {
      const profit =
        prices[counter].highestPrice - prices[minIndex].lowestPrice;

      maxProfit = Math.max(maxProfit, profit);
      sellIndex = counter;
      buyIndex = minIndex;
    } else {
      minIndex = counter;
    }
    counter += 1;
  }

  if (maxProfit === 0) {
    buyIndex = -1;
    sellIndex = -1;
  }

  return { buyIndex, sellIndex, profit: maxProfit };
}
