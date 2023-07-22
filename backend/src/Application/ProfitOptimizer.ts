import { DailyStockPrice } from "../Types/Model.types";
import Config from "../config";
import { Transaction } from "../index.types";
import MathHelper from "./Helpers/MathHelper/MathHelper";
import TransactionsBuilder from "./TransactionsBuilder/TransactionsBuilder";

class ProfitOptimizer {
  static CheckPricesValidity(prices: DailyStockPrice[]): DailyStockPrice[] {
    for (let i = 0; i < prices.length; i += 1) {
      if (prices[i].highestPrice <= 0 || prices[i].lowestPrice <= 0) {
        throw new Error("Prices cannot be negative");
      } else if (prices[i].highestPrice < prices[i].lowestPrice) {
        throw new Error("Highest price cannot be lower than lowest price");
      }
    }

    return prices;
  }

  static FindBuyAndSellIndexes(prices: DailyStockPrice[]): {
    buyIndex: number;
    sellIndex: number;
    profit: number;
  } {
    const { InitialInvestment } = Config;

    let counter = 1;
    let minIndex = 0;

    let buyIndex = 0;
    let sellIndex = 1;

    let maxProfit = 0;

    while (counter < prices.length) {
      if (prices[minIndex].lowestPrice < prices[counter].lowestPrice) {
        const numShares = Math.floor(
          InitialInvestment / prices[minIndex].lowestPrice
        );

        const profit = prices[counter].highestPrice * numShares;

        if (profit >= maxProfit) {
          maxProfit = profit;
          sellIndex = counter;
          buyIndex = minIndex;
        }
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

  /*  static FindBuyAndSellIndexes(prices: DailyStockPrice[]): {
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

        if (profit >= maxProfit) {
          maxProfit = profit;
          sellIndex = counter;
          buyIndex = minIndex;
        }
      } else {
        minIndex = counter;
      }
      counter += 1;
    }

    if (maxProfit === 0) {
      buyIndex = -1;
      sellIndex = -1;
    }
    console.log({ buyIndex, sellIndex, profit: maxProfit });
    return { buyIndex, sellIndex, profit: maxProfit };
  }
 */
  static FindMaxProfit(prices: DailyStockPrice[]): {
    profit: number;
    transactions: Transaction[];
  } {
    if (prices.length < 2) {
      return {
        profit: 0,
        transactions: [],
      };
    }

    this.CheckPricesValidity(prices);

    const { InitialInvestment } = Config;

    const {
      buyIndex,
      sellIndex,
      profit: maxProfit,
    } = this.FindBuyAndSellIndexes(prices);

    if (maxProfit === 0) {
      return {
        profit: 0,
        transactions: [],
      };
    }

    const transactions = TransactionsBuilder.buildOptimalSolution(
      prices[buyIndex],
      prices[sellIndex]
    );

    const { portfolioAmount } = transactions[1];

    const profit = MathHelper.roundToTwo(portfolioAmount - InitialInvestment);

    return {
      profit,
      transactions,
    };
  }
}

export default ProfitOptimizer;
