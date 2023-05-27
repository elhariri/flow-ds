import { DailySharePrices, TransactionCompany } from "../../../index.types";
import Portfolio from "../../Shared/Portfolio/Portfolio";
import LocalMinMaxFilter from "../LocalMinMaxFilter/LocalMinMaxFilter";
import {
  DataPoint,
  StockDayAction,
} from "../LocalMinMaxFilter/LocalMinMaxFilter.types";

class DecisionsEnumerator {
  private static findPossibilitiesOnOneShare(
    portfolio: Portfolio,
    stockName: TransactionCompany,
    date: number,
    stockPossibleActions: StockDayAction[]
  ) {
    const newPortfolios: Portfolio[] = [];

    for (let i = 0; i < stockPossibleActions.length; i += 1) {
      const stockPossibleAction = stockPossibleActions[i];
      const newPortfolio = portfolio.clone();
      if (
        stockPossibleAction.action === "ACHAT" &&
        newPortfolio.cashAmount > 0
      ) {
        const numberOfSharesToBuy = Math.floor(
          newPortfolio.cashAmount / stockPossibleAction.price
        );
        if (numberOfSharesToBuy > 0) {
          newPortfolio.buyShares(
            stockName,
            Math.floor(newPortfolio.cashAmount / stockPossibleAction.price),
            stockPossibleAction.price,
            date
          );
        }
      } else if (
        stockPossibleAction.action === "VENTE" &&
        newPortfolio.totalShares[stockName] > 0
      ) {
        newPortfolio.sellShares(
          stockName,
          newPortfolio.totalShares[stockName],
          stockPossibleAction.price,
          date
        );
      }

      newPortfolios.push(newPortfolio);
    }

    return newPortfolios;
  }

  private static findPossibilitiesOnBothShares(
    portfolio: Portfolio,
    dataPoint: DataPoint
  ) {
    const newPortfolios: Portfolio[] = [];

    for (let i = 0; i < dataPoint.GOOGLE.length; i += 1) {
      for (let j = 0; j < dataPoint.AMAZON.length; j += 1) {
        const googleAction = dataPoint.GOOGLE[i];
        const amazonAction = dataPoint.AMAZON[j];

        const newPortfolio = portfolio.clone();

        if (googleAction.action !== amazonAction.action) {
          let actionToBuy: TransactionCompany = "GOOGLE";

          if (
            googleAction.action === "VENTE" &&
            newPortfolio.googleShares > 0
          ) {
            newPortfolio.sellShares(
              "GOOGLE",
              newPortfolio.googleShares,
              googleAction.price,
              dataPoint.date
            );
            actionToBuy = "AMAZON";
          }

          if (
            amazonAction.action === "VENTE" &&
            newPortfolio.amazonShares > 0
          ) {
            newPortfolio.sellShares(
              "AMAZON",
              newPortfolio.amazonShares,
              amazonAction.price,
              dataPoint.date
            );
            actionToBuy = "GOOGLE";
          }

          if (newPortfolio.cashAmount > 0) {
            let { price } = googleAction;
            if (actionToBuy === "AMAZON") {
              price = amazonAction.price;
            }
            const numberOfSharesToBuy = Math.floor(
              newPortfolio.cashAmount / price
            );

            if (numberOfSharesToBuy > 0) {
              newPortfolio.buyShares(
                actionToBuy,
                Math.floor(newPortfolio.cashAmount / price),
                price,
                dataPoint.date
              );
            }
          }
        } else if (googleAction.action === "VENTE") {
          newPortfolio.sellAllShares(
            googleAction.price,
            amazonAction.price,
            dataPoint.date
          );
        }

        newPortfolios.push(newPortfolio);
      }
    }

    return newPortfolios;
  }

  private static findAllDataPointPossibilities(
    portfolios: Portfolio[],
    dataPoint: DataPoint
  ) {
    let newPortfolios: Portfolio[] = [];

    for (let j = 0; j < portfolios.length; j += 1) {
      const portfolio = portfolios[j];

      if (dataPoint.GOOGLE) {
        newPortfolios = newPortfolios.concat(
          this.findPossibilitiesOnOneShare(
            portfolio,
            "GOOGLE",
            dataPoint.date,
            dataPoint.GOOGLE
          )
        );
      }

      if (dataPoint.AMAZON) {
        newPortfolios = newPortfolios.concat(
          this.findPossibilitiesOnOneShare(
            portfolio,
            "AMAZON",
            dataPoint.date,
            dataPoint.AMAZON
          )
        );
      }

      if (dataPoint.GOOGLE && dataPoint.AMAZON) {
        newPortfolios = newPortfolios.concat(
          this.findPossibilitiesOnBothShares(portfolio, dataPoint)
        );
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

    console.log("filteredDataPoints.length", filteredDataPoints.length);

    let finalDayPortfolios: Portfolio[] = [new Portfolio()];

    for (let i = 0; i < filteredDataPoints.length - 1; i += 1) {
      const dataPoint = filteredDataPoints[i];

      finalDayPortfolios = finalDayPortfolios.concat(
        this.findAllDataPointPossibilities(finalDayPortfolios, dataPoint)
      );

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

      for (let j = 1; j < cashOnlyPortfolios.length; j += 1) {
        const portfolio = cashOnlyPortfolios[j];
        if (portfolio.cashAmount > maxPortfolio.cashAmount) {
          maxPortfolio = portfolio;
        }
      }

      filteredPortfolios.push(maxPortfolio);

      finalDayPortfolios = filteredPortfolios;

      console.log("finalDayPortfolios", finalDayPortfolios.length);
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
