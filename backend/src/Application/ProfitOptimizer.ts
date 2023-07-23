import ApplicationError from "../Helpers/ApplicationError";
import { DailyStockPrice } from "../Types/Model.types";
import Config from "../config";
import { Transaction } from "../index.types";
import MathHelper from "./Helpers/MathHelper/MathHelper";
import TransactionsBuilder from "./TransactionsBuilder/TransactionsBuilder";

class ProfitOptimizer {
  static CheckPricesValidity(prices: DailyStockPrice[]): DailyStockPrice[] {
    for (let i = 0; i < prices.length; i += 1) {
      if (prices[i].highestPrice <= 0 || prices[i].lowestPrice <= 0) {
        throw new ApplicationError(500, "Prices cannot be null or negative");
      } else if (prices[i].highestPrice < prices[i].lowestPrice) {
        throw new ApplicationError(
          500,
          "Highest price cannot be lower than lowest price"
        );
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

    let minIndex = 0;
    let buyIndex = 0;
    let sellIndex = 1;
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i += 1) {
      if (prices[minIndex].lowestPrice < prices[i].lowestPrice) {
        const numShares = Math.floor(
          InitialInvestment / prices[minIndex].lowestPrice
        );

        const profit = prices[i].highestPrice * numShares;

        if (profit >= maxProfit) {
          maxProfit = profit;
          sellIndex = i;
          buyIndex = minIndex;
        }
      } else {
        minIndex = i;
      }
    }

    if (maxProfit === 0) {
      buyIndex = -1;
      sellIndex = -1;
    }

    return { buyIndex, sellIndex, profit: maxProfit };
  }

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
