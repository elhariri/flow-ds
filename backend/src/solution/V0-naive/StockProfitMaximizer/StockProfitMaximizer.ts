import { DailySharePrices } from "../../../index.types";
import DecisionsEnumerator from "../DecisionsEnumerator/DecisionsEnumerator";
import { Possibility } from "../DecisionsEnumerator/DecisionsEnumerator.types";
import Portfolio from "../Portfolio/Portfolio";
import { DayPrices, MaximizerOutput } from "./StockProfitMaximizer.types";

class StockProfitMaximizer {
  public static sortPricesByTimestamp(prices: DailySharePrices[]) {
    prices.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      return 0;
    });
  }

  public static buildDayPricesObject(
    googlePrices: DailySharePrices,
    amazonPrices: DailySharePrices
  ): DayPrices {
    const {
      lowestPriceOfTheDay: googleBuyPrice,
      highestPriceOfTheDay: googleSellPrice,
      timestamp,
    } = googlePrices;
    const {
      lowestPriceOfTheDay: amazonBuyPrice,
      highestPriceOfTheDay: amazonSellPrice,
    } = amazonPrices;

    return {
      date: timestamp,
      GOOGLE: {
        buyPrice: googleBuyPrice,
        sellPrice: googleSellPrice,
      },
      AMAZON: {
        buyPrice: amazonBuyPrice,
        sellPrice: amazonSellPrice,
      },
    };
  }

  public static generatePossibilityPortfolio(
    portfolio: Portfolio,
    possibility: Possibility[],
    dayPrices: DayPrices
  ): Portfolio {
    const newPortfolio = portfolio.clone();

    for (let k = 0; k < possibility.length; k += 1) {
      const { share, type, amount } = possibility[k];
      if (type === "ACHAT") {
        const { buyPrice } = dayPrices[share];

        newPortfolio.buyShares(share, amount, buyPrice, dayPrices.date);
      } else {
        const { sellPrice } = dayPrices[share];

        newPortfolio.sellShares(share, amount, sellPrice, dayPrices.date);
      }
    }

    return newPortfolio;
  }

  public static generateAllPossiblePortfolios(
    portfolio: Portfolio,
    dayPrices: DayPrices
  ): Portfolio[] {
    const possiblePorfolios = [];

    const possibilities = DecisionsEnumerator.possibilitiesFrom(
      portfolio,
      dayPrices
    );

    for (let j = 0; j < possibilities.length; j += 1) {
      const newPortfolio = this.generatePossibilityPortfolio(
        portfolio,
        possibilities[j],
        dayPrices
      );

      possiblePorfolios.push(newPortfolio);
    }

    return possiblePorfolios;
  }

  public static generateAllPossiblePortfoliosAfterEachDay(
    googlePrices: DailySharePrices[],
    amazonPrices: DailySharePrices[]
  ) {
    let portfolios: Portfolio[] = [new Portfolio()];

    for (let i = 0; i < googlePrices.length - 1; i += 1) {
      const dayPrices = this.buildDayPricesObject(
        googlePrices[i],
        amazonPrices[i]
      );

      let newPortfolios: Portfolio[] = [];

      for (let j = 0; j < portfolios.length; j += 1) {
        const portfolio = portfolios[j];

        newPortfolios = newPortfolios.concat(
          this.generateAllPossiblePortfolios(portfolio, dayPrices)
        );
      }

      portfolios = portfolios.concat(newPortfolios);
    }

    return portfolios;
  }

  public static findMaxProfit(
    googlePrices: DailySharePrices[],
    amazonPrices: DailySharePrices[]
  ): MaximizerOutput {
    this.sortPricesByTimestamp(googlePrices);
    this.sortPricesByTimestamp(amazonPrices);

    const startTime = process.hrtime.bigint();
    const finalDayPortfolios = this.generateAllPossiblePortfoliosAfterEachDay(
      googlePrices,
      amazonPrices
    );

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

export default StockProfitMaximizer;
