import { DailyStockPrices, TransactionType } from "../../../index.types";
import { Datapoint } from "../index.types";

class LocalMinMaxFilter {
  private static isLocalMin(
    stockPrice: number,
    stockPriceBefore: number,
    stockPriceAfter: number
  ) {
    return stockPrice < stockPriceBefore && stockPrice < stockPriceAfter;
  }

  private static isLocalMax(
    stockPrice: number,
    stockPriceBefore: number,
    stockPriceAfter: number
  ) {
    return stockPrice > stockPriceBefore && stockPrice > stockPriceAfter;
  }

  private static shouldBuyOnFirstDay(
    firstDayStockPrices: DailyStockPrices,
    secondDayStockPrices: DailyStockPrices
  ): boolean {
    if (
      firstDayStockPrices.lowestPriceOfTheDay <
        secondDayStockPrices.lowestPriceOfTheDay ||
      firstDayStockPrices.highestPriceOfTheDay <
        secondDayStockPrices.highestPriceOfTheDay
    ) {
      return true;
    }
    return false;
  }

  private static hasMinMax(
    stockPrices: DailyStockPrices[],
    index: number
  ): TransactionType[] {
    const stockPrice = stockPrices[index];
    const stockPriceBefore = stockPrices[index - 1];
    const stockPriceAfter = stockPrices[index + 1];

    const possibleActions: TransactionType[] = [];

    if (
      this.isLocalMin(
        stockPrice.lowestPriceOfTheDay,
        stockPriceBefore.lowestPriceOfTheDay,
        stockPriceAfter.lowestPriceOfTheDay
      ) ||
      this.isLocalMin(
        stockPrice.highestPriceOfTheDay,
        stockPriceBefore.highestPriceOfTheDay,
        stockPriceAfter.highestPriceOfTheDay
      )
    ) {
      possibleActions.push("ACHAT");
    }

    if (
      this.isLocalMax(
        stockPrice.highestPriceOfTheDay,
        stockPriceBefore.highestPriceOfTheDay,
        stockPriceAfter.highestPriceOfTheDay
      )
    ) {
      possibleActions.push("VENTE");
    }

    return possibleActions;
  }

  private static buildDatapoint(
    googleActions: TransactionType[],
    amazonActions: TransactionType[],
    googleData: DailyStockPrices,
    amazonData: DailyStockPrices
  ): Datapoint {
    if (googleActions.length === 0 && amazonActions.length === 0) {
      throw new Error("No actions");
    }

    return {
      date: googleData.timestamp,
      prices: {
        GOOGLE: {
          buyPrice: googleData.lowestPriceOfTheDay,
          sellPrice: googleData.highestPriceOfTheDay,
        },
        AMAZON: {
          buyPrice: amazonData.lowestPriceOfTheDay,
          sellPrice: amazonData.highestPriceOfTheDay,
        },
      },
      possibilities: {
        GOOGLE: googleActions,
        AMAZON: amazonActions,
      },
    };
  }

  private static buildFirstDayDatapoint(
    googleData: { firstDay: DailyStockPrices; secondDay: DailyStockPrices },
    amazonData: { firstDay: DailyStockPrices; secondDay: DailyStockPrices }
  ): Datapoint | null {
    const firstDayGoogleAction = this.shouldBuyOnFirstDay(
      googleData.firstDay,
      googleData.secondDay
    );
    const firstDayAmazonAction = this.shouldBuyOnFirstDay(
      amazonData.firstDay,
      amazonData.secondDay
    );

    if (!firstDayGoogleAction && !firstDayAmazonAction) {
      return null;
    }

    return this.buildDatapoint(
      firstDayGoogleAction ? ["ACHAT"] : [],
      firstDayAmazonAction ? ["ACHAT"] : [],
      googleData.firstDay,
      amazonData.firstDay
    );
  }

  private static buildLastDayDatapoint(
    googleData: DailyStockPrices,
    amazonData: DailyStockPrices
  ): Datapoint {
    return {
      date: googleData.timestamp,
      prices: {
        GOOGLE: {
          buyPrice: googleData.lowestPriceOfTheDay,
          sellPrice: googleData.highestPriceOfTheDay,
        },
        AMAZON: {
          buyPrice: amazonData.lowestPriceOfTheDay,
          sellPrice: amazonData.highestPriceOfTheDay,
        },
      },
      possibilities: {
        GOOGLE: ["VENTE"],
        AMAZON: ["VENTE"],
      },
    };
  }

  public static filter(
    googleStocks: DailyStockPrices[],
    amazonStocks: DailyStockPrices[]
  ) {
    const dataPoints: Datapoint[] = [];

    if (googleStocks.length !== amazonStocks.length) {
      throw new Error("Stocks must have the same length");
    }

    if (googleStocks.length < 2) {
      throw new Error("Stocks must have at least 2 data points");
    }

    const firstDayDatapoint = this.buildFirstDayDatapoint(
      { firstDay: googleStocks[0], secondDay: googleStocks[1] },
      { firstDay: amazonStocks[0], secondDay: amazonStocks[1] }
    );

    if (firstDayDatapoint) {
      dataPoints.push(firstDayDatapoint);
    }

    for (let i = 1; i < googleStocks.length - 1; i += 1) {
      const googleActions = this.hasMinMax(googleStocks, i);

      const amazonActions = this.hasMinMax(amazonStocks, i);

      if (googleActions.length > 0 || amazonActions.length > 0) {
        dataPoints.push(
          this.buildDatapoint(
            googleActions,
            amazonActions,
            googleStocks[i],
            amazonStocks[i]
          )
        );
      }
    }
    dataPoints.push(
      this.buildLastDayDatapoint(
        googleStocks[googleStocks.length - 1],
        amazonStocks[amazonStocks.length - 1]
      )
    );

    return dataPoints;
  }
}

export default LocalMinMaxFilter;
