import Config from "../config";
import DateHelper from "../exo1/Utilities/DateHelper";
import MathHelper from "../exo1/Utilities/MathHelper";
import { DailyStockPrices, Stocks, Transaction } from "../index.types";

export function findBuyAndSellIndexes(prices: DailyStockPrices[]): {
  buyIndex: number;
  sellIndex: number;
  profit: number;
} {
  let buyIndex = 0;
  let minIndex = 0;
  let sellIndex = 1;
  let counter = 1;
  let maxProfit = 0;

  while (counter < prices.length) {
    if (
      prices[minIndex].lowestPriceOfTheDay < prices[counter].lowestPriceOfTheDay
    ) {
      const profit =
        prices[counter].highestPriceOfTheDay -
        prices[minIndex].lowestPriceOfTheDay;

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

export function BuildTransactions(
  buyPrices: DailyStockPrices,
  sellPrices: DailyStockPrices,
  shareName: Stocks
): [Transaction, Transaction] {
  const numShares = Math.floor(
    Config.InitialInvestment / buyPrices.lowestPriceOfTheDay
  );

  const BuyUnitPrice = buyPrices.lowestPriceOfTheDay;
  const BuyTotal = numShares * BuyUnitPrice;

  const SellUnitPrice = sellPrices.highestPriceOfTheDay;
  const SellTotal = numShares * SellUnitPrice;

  return [
    {
      date: DateHelper.format(buyPrices.timestamp),
      action: "ACHAT",
      name: shareName,
      numShares,
      unitPrice: MathHelper.roundToTwo(BuyUnitPrice),
      total: MathHelper.roundToTwo(BuyTotal),
      portfolioAmount: MathHelper.roundToTwo(
        Config.InitialInvestment - BuyTotal
      ),
    },
    {
      date: DateHelper.format(sellPrices.timestamp),
      action: "VENTE",
      name: shareName,
      numShares,
      unitPrice: MathHelper.roundToTwo(SellUnitPrice),
      total: MathHelper.roundToTwo(SellTotal),
      portfolioAmount: MathHelper.roundToTwo(
        Config.InitialInvestment - BuyTotal + SellTotal
      ),
    },
  ];
}

function findMaxProfit(
  prices: DailyStockPrices[],
  shareName: Stocks
): { profit: number; transactions: Transaction[] } {
  const { buyIndex, sellIndex } = findBuyAndSellIndexes(prices);
  const transactions = BuildTransactions(
    prices[buyIndex],
    prices[sellIndex],
    shareName
  );

  return {
    profit: MathHelper.roundToTwo(
      transactions[1].portfolioAmount - Config.InitialInvestment
    ),
    transactions,
  };
}

export default findMaxProfit;
