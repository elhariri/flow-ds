import { DailyStockPrices } from "../../../index.types";
import Portfolio from "../../Shared/Portfolio/Portfolio";
import DataParser from "../DataParser/DataParser";
import OutcomesGenerator from "../OutcomesGenerator/OutcomesGenerator";
import { Datapoint } from "../index.types";

class DecisionsEnumerator {
  private static filterWeakPortfolios(portfolios: Portfolio[]) {
    const filteredPortfolios: Portfolio[] = [];
    const cashOnlyPortfolios: Portfolio[] = [];

    for (let j = 0; j < portfolios.length; j += 1) {
      const portfolio = portfolios[j];
      if (portfolio.googleShares + portfolio.amazonShares > 0) {
        filteredPortfolios.push(portfolio);
      } else {
        cashOnlyPortfolios.push(portfolio);
      }
    }

    let maxPortfolio = cashOnlyPortfolios[0];

    if (maxPortfolio) {
      for (let j = 1; j < cashOnlyPortfolios.length; j += 1) {
        const portfolio = cashOnlyPortfolios[j];
        if (portfolio.cashAmount > maxPortfolio.cashAmount) {
          maxPortfolio = portfolio;
        }
      }

      filteredPortfolios.push(maxPortfolio);
    }

    return filteredPortfolios;
  }

  private static findPortfolioWithMaxProfit(
    portfolios: Portfolio[],
    dataPoint: Datapoint
  ) {
    const { prices, date } = dataPoint;

    let maxProfit = 0;
    let maxProfitPortfolio = portfolios[0];

    const googleFinalDaySellPrice = prices.GOOGLE.sellPrice;
    const amazonFinalDaySellPrice = prices.AMAZON.sellPrice;

    const finalDayDate = date;

    for (let i = 0; i < portfolios.length; i += 1) {
      const portfolio = portfolios[i];

      portfolio.sellAllShares(
        googleFinalDaySellPrice,
        amazonFinalDaySellPrice,
        finalDayDate
      );

      const profit = portfolio.getProfit();

      if (profit > maxProfit) {
        maxProfit = profit;
        maxProfitPortfolio = portfolio;
      }
    }

    return maxProfitPortfolio;
  }

  public static findMaxProfit(
    googlePrices: DailyStockPrices[],
    amazonPrices: DailyStockPrices[]
  ) {
    const dataPoints = DataParser.filter(googlePrices, amazonPrices);

    let finalDayPortfolios: Portfolio[] = [new Portfolio()];

    for (let i = 0; i < dataPoints.length - 1; i += 1) {
      const dataPoint = dataPoints[i];

      finalDayPortfolios = OutcomesGenerator.from(
        finalDayPortfolios,
        dataPoint
      );

      finalDayPortfolios = this.filterWeakPortfolios(finalDayPortfolios);
    }

    const maxProfitPortfolio = this.findPortfolioWithMaxProfit(
      finalDayPortfolios,
      dataPoints[dataPoints.length - 1]
    );

    return {
      profit: maxProfitPortfolio.getProfit(),
      transactions: maxProfitPortfolio.entries,
    };
  }
}

export default DecisionsEnumerator;
