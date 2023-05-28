import { DailySharePrices } from "../../../index.types";
import Portfolio from "../../Shared/Portfolio/Portfolio";
import LocalMinMaxFilter from "../LocalMinMaxFilter/LocalMinMaxFilter";
import { DataPoint } from "../LocalMinMaxFilter/LocalMinMaxFilter.types";

class DecisionsEnumerator {
  private static findAllDataPointPossibilities(
    portfolios: Portfolio[],
    dataPoint: DataPoint
  ) {
    const newPortfolios: Portfolio[] = [];

    const googleDataPoint = dataPoint.GOOGLE || [];
    const amazonDataPoint = dataPoint.AMAZON || [];

    const canSellGoogle = googleDataPoint.filter(
      (a) => a.action === "VENTE"
    )[0];
    const canSellAmazon = amazonDataPoint.filter(
      (a) => a.action === "VENTE"
    )[0];

    const canBuyGoogle = googleDataPoint.filter((a) => a.action === "ACHAT")[0];
    const canBuyAmazon = amazonDataPoint.filter((a) => a.action === "ACHAT")[0];

    for (let j = 0; j < portfolios.length; j += 1) {
      const portfolio = portfolios[j].clone();

      if (
        canSellGoogle &&
        canSellAmazon &&
        portfolio.googleShares > 0 &&
        portfolio.amazonShares > 0
      ) {
        portfolio.sellAllShares(
          canSellGoogle.price,
          canSellAmazon.price,
          dataPoint.date
        );
        newPortfolios.push(portfolio);
      } else if (canSellAmazon && portfolio.amazonShares > 0) {
        portfolio.sellShares(
          "AMAZON",
          portfolio.amazonShares,
          canSellAmazon.price,
          dataPoint.date
        );

        if (canBuyGoogle && portfolio.cashAmount > 0) {
          const numberOfSharesToBuy = Math.floor(
            portfolio.cashAmount / canBuyGoogle.price
          );
          if (numberOfSharesToBuy > 0) {
            portfolio.buyShares(
              "GOOGLE",
              numberOfSharesToBuy,
              canBuyGoogle.price,
              dataPoint.date
            );
          }
        }

        newPortfolios.push(portfolio);
      } else if (canSellGoogle && portfolio.googleShares > 0) {
        portfolio.sellShares(
          "GOOGLE",
          portfolio.googleShares,
          canSellGoogle.price,
          dataPoint.date
        );

        if (canBuyAmazon && portfolio.cashAmount > 0) {
          const numberOfSharesToBuy = Math.floor(
            portfolio.cashAmount / canBuyAmazon.price
          );
          if (numberOfSharesToBuy > 0) {
            portfolio.buyShares(
              "AMAZON",
              numberOfSharesToBuy,
              canBuyAmazon.price,
              dataPoint.date
            );
          }
        }

        newPortfolios.push(portfolio);
      } else if ((canBuyGoogle || canBuyAmazon) && portfolio.cashAmount > 0) {
        const willBuyBoth = canBuyGoogle && canBuyAmazon;

        if (canBuyAmazon) {
          let portfolioToUse = portfolio;

          if (willBuyBoth) {
            portfolioToUse = portfolio.clone();
          }

          const numberOfSharesToBuy = Math.floor(
            portfolioToUse.cashAmount / canBuyAmazon.price
          );
          if (numberOfSharesToBuy > 0) {
            portfolioToUse.buyShares(
              "AMAZON",
              numberOfSharesToBuy,
              canBuyAmazon.price,
              dataPoint.date
            );

            if (willBuyBoth) {
              newPortfolios.push(portfolioToUse);
            }
          }
        }

        if (canBuyGoogle) {
          const numberOfSharesToBuy = Math.floor(
            portfolio.cashAmount / canBuyGoogle.price
          );
          if (numberOfSharesToBuy > 0) {
            portfolio.buyShares(
              "GOOGLE",
              numberOfSharesToBuy,
              canBuyGoogle.price,
              dataPoint.date
            );
          }
        }

        newPortfolios.push(portfolio);
      } else {
        newPortfolios.push(portfolio);
      }
    }

    return newPortfolios;
  }

  public static findMaxProfit(
    googlePrices: DailySharePrices[],
    amazonPrices: DailySharePrices[]
  ) {
    const startTime = process.hrtime.bigint();

    const filteredDataPoints = LocalMinMaxFilter.filter(
      googlePrices,
      amazonPrices
    );

    let finalDayPortfolios: Portfolio[] = [new Portfolio()];

    for (let i = 0; i < filteredDataPoints.length - 1; i += 1) {
      const dataPoint = filteredDataPoints[i];

      const newPossibilities = this.findAllDataPointPossibilities(
        finalDayPortfolios,
        dataPoint
      );

      finalDayPortfolios = newPossibilities;

      const filteredPortfolios: Portfolio[] = [];
      const cashOnlyPortfolios: Portfolio[] = [];

      for (let j = 0; j < finalDayPortfolios.length; j += 1) {
        const portfolio = finalDayPortfolios[j];
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

      finalDayPortfolios = filteredPortfolios;
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
