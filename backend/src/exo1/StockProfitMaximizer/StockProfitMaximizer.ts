import { DailyStockPrices } from "../../index.types";
import Portfolio from "../Portfolio/Portfolio";
import DataParser from "../DataParser/DataParser";
import { Datapoint } from "../DataParser/DataParser.types";
import OutcomesGenerator from "../OutcomesGenerator/OutcomesGenerator";

class StockProfitMaximizer {
  private static filterWeakCashOnlyPortfolios(portfolios: Portfolio[]) {
    const filteredPortfolios: Portfolio[] = [];

    let maxPortfolio: Portfolio = new Portfolio(0);

    for (let j = 0; j < portfolios.length; j += 1) {
      const portfolio = portfolios[j];

      if (portfolio.googleShares + portfolio.amazonShares > 0) {
        filteredPortfolios.push(portfolio);
      } else if (portfolio.cashAmount > maxPortfolio.cashAmount) {
        maxPortfolio = portfolio;
      }
    }

    filteredPortfolios.push(maxPortfolio);

    return filteredPortfolios;
  }

  private static findPortfolioWithMaxProfit(
    portfolios: Portfolio[],
    dataPoint: Datapoint
  ) {
    const { prices, date } = dataPoint;

    let maxProfitPortfolio = portfolios[0];

    const googleFinalDaySellPrice = prices.GOOGLE.sellPrice;
    const amazonFinalDaySellPrice = prices.AMAZON.sellPrice;

    for (let i = 0; i < portfolios.length; i += 1) {
      const portfolio = portfolios[i];

      portfolio.sellAllShares(
        googleFinalDaySellPrice,
        amazonFinalDaySellPrice,
        date
      );

      if (portfolio.getProfit() > maxProfitPortfolio.getProfit()) {
        maxProfitPortfolio = portfolio;
      }
    }

    return maxProfitPortfolio;
  }

  public static findMaxProfit(
    googlePrices: DailyStockPrices[],
    amazonPrices: DailyStockPrices[]
  ) {
    const dataPoints = DataParser.buildDataPoints(googlePrices, amazonPrices);

    let outcomes: Portfolio[] = [new Portfolio()];

    for (let i = 0; i < dataPoints.length - 1; i += 1) {
      const dataPoint = dataPoints[i];

      outcomes = OutcomesGenerator.from(outcomes, dataPoint);
      outcomes = this.filterWeakCashOnlyPortfolios(outcomes);
    }

    const lastDataPoint = dataPoints[dataPoints.length - 1];
    const maxProfitPortfolio = this.findPortfolioWithMaxProfit(
      outcomes,
      lastDataPoint
    );

    return {
      profit: maxProfitPortfolio.getProfit(),
      transactions: maxProfitPortfolio.entries,
    };
  }
}

export default StockProfitMaximizer;
