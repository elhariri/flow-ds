import MathHelper from "../Helpers/MathHelper/MathHelper";
import { DailyStockPrice } from "../Types/Model.types";
import Config from "../config";
import { Transaction } from "../index.types";
import BuildTransactions from "./BuildTransactions";
import FindBuyAndSellIndexes from "./FindBuyAndSellIndexes";

function FindMaxProfit(prices: DailyStockPrice[]): {
  profit: number;
  transactions: Transaction[];
} {
  const { InitialInvestment } = Config;

  const { buyIndex, sellIndex } = FindBuyAndSellIndexes(prices);
  const transactions = BuildTransactions(prices[buyIndex], prices[sellIndex]);

  const { portfolioAmount } = transactions[1];

  const profit = MathHelper.roundToTwo(portfolioAmount - InitialInvestment);

  return {
    profit,
    transactions,
  };
}

export default FindMaxProfit;
