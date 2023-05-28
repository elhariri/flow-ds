import { DailyStockPrices } from "../../../index.types";
import Portfolio from "../../Shared/Portfolio/Portfolio";
import LocalMinMaxFilter from "../LocalMinMaxFilter/LocalMinMaxFilter";
import OutcomesGenerator from "../OutcomesGenerator/OutcomesGenerator";

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

  public static findMaxProfit(
    googlePrices: DailyStockPrices[],
    amazonPrices: DailyStockPrices[]
  ) {
    const startTime = process.hrtime.bigint();

    const filteredDataPoints = LocalMinMaxFilter.filter(
      googlePrices,
      amazonPrices
    );

    let finalDayPortfolios: Portfolio[] = [new Portfolio()];

    for (let i = 0; i < filteredDataPoints.length - 1; i += 1) {
      const dataPoint = filteredDataPoints[i];

      finalDayPortfolios = OutcomesGenerator.from(
        finalDayPortfolios,
        dataPoint
      );

      finalDayPortfolios = this.filterWeakPortfolios(finalDayPortfolios);
    }

    let maxProfit = 0;
    let maxProfitPortfolio = finalDayPortfolios[0];

    const googleFinalDaySellPrice =
      googlePrices[googlePrices.length - 1].highestPriceOfTheDay;
    const amazonFinalDaySellPrice =
      amazonPrices[amazonPrices.length - 1].highestPriceOfTheDay;

    const finalDayDate = googlePrices[googlePrices.length - 1].timestamp;

    for (let i = 0; i < finalDayPortfolios.length; i += 1) {
      const portfolio = finalDayPortfolios[i];

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

    const endTime = process.hrtime.bigint();

    const elapsedTime = Number(endTime - startTime) / 1e9; // Convert to seconds

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = Math.round(elapsedTime % 60);

    return {
      profit: maxProfit,
      transactions: maxProfitPortfolio.entries,
      executionTime: { minutes, seconds },
    };
  }
}

export default DecisionsEnumerator;
