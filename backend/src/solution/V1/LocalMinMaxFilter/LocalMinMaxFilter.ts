import { DailySharePrices } from "../../../index.types";
import { DataPoint, StockDayAction } from "./LocalMinMaxFilter.types";

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
    stockPrices: DailySharePrices[]
  ): StockDayAction | null {
    if (
      stockPrices[0].lowestPriceOfTheDay < stockPrices[1].lowestPriceOfTheDay ||
      stockPrices[0].highestPriceOfTheDay < stockPrices[1].highestPriceOfTheDay
    ) {
      return {
        action: "ACHAT",
        price: stockPrices[0].lowestPriceOfTheDay,
      };
    }
    return null;
  }

  private static hasMinMax(
    stockPrices: DailySharePrices[],
    index: number
  ): StockDayAction[] {
    const stockPrice = stockPrices[index];
    const stockPriceBefore = stockPrices[index - 1];
    const stockPriceAfter = stockPrices[index + 1];

    const possibleActions: StockDayAction[] = [];

    if (
      this.isLocalMin(
        stockPrice.lowestPriceOfTheDay,
        stockPriceBefore.lowestPriceOfTheDay,
        stockPriceAfter.lowestPriceOfTheDay
      )
    ) {
      possibleActions.push({
        action: "ACHAT",
        price: stockPrice.lowestPriceOfTheDay,
      });
    } else if (
      this.isLocalMin(
        stockPrice.highestPriceOfTheDay,
        stockPriceBefore.highestPriceOfTheDay,
        stockPriceAfter.highestPriceOfTheDay
      )
    ) {
      possibleActions.push({
        action: "ACHAT",
        price: stockPrice.lowestPriceOfTheDay,
      });
    }

    if (
      this.isLocalMax(
        stockPrice.highestPriceOfTheDay,
        stockPriceBefore.highestPriceOfTheDay,
        stockPriceAfter.highestPriceOfTheDay
      )
    ) {
      possibleActions.push({
        action: "VENTE",
        price: stockPrice.highestPriceOfTheDay,
      });
    } else if (
      this.isLocalMax(
        stockPrice.lowestPriceOfTheDay,
        stockPriceBefore.lowestPriceOfTheDay,
        stockPriceAfter.lowestPriceOfTheDay
      )
    ) {
      possibleActions.push({
        action: "VENTE",
        price: stockPrice.highestPriceOfTheDay,
      });
    }

    return possibleActions;
  }

  private static buildDataPoint(
    googleActions: StockDayAction[],
    amazonActions: StockDayAction[],
    timestamp: number,
    dataPoints: DataPoint[]
  ) {
    const dataPoint: any = {};

    let datapointHasActions = false;

    if (googleActions.length > 0) {
      dataPoint.GOOGLE = googleActions;
      datapointHasActions = true;
    }

    if (amazonActions.length > 0) {
      dataPoint.AMAZON = amazonActions;
      datapointHasActions = true;
    }

    if (datapointHasActions) {
      dataPoint.date = timestamp;
      dataPoints.push(dataPoint);
    }
  }

  public static filter(
    googleStocks: DailySharePrices[],
    amazonStocks: DailySharePrices[]
  ) {
    const dataPoints: DataPoint[] = [];

    if (googleStocks.length !== amazonStocks.length) {
      throw new Error("Stocks must have the same length");
    }

    if (googleStocks.length < 2) {
      throw new Error("Stocks must have at least 2 data points");
    }

    const firstDayGoogleAction = this.shouldBuyOnFirstDay(googleStocks);
    const firstDayAmazonAction = this.shouldBuyOnFirstDay(amazonStocks);

    this.buildDataPoint(
      firstDayGoogleAction ? [firstDayGoogleAction] : [],
      firstDayAmazonAction ? [firstDayAmazonAction] : [],
      googleStocks[0].timestamp,
      dataPoints
    );

    for (let i = 1; i < googleStocks.length - 1; i += 1) {
      const googleActions = this.hasMinMax(googleStocks, i);

      const amazonActions = this.hasMinMax(amazonStocks, i);

      this.buildDataPoint(
        googleActions,
        amazonActions,
        googleStocks[i].timestamp,
        dataPoints
      );
    }

    dataPoints.push({
      GOOGLE: [
        {
          action: "VENTE",
          price: googleStocks[googleStocks.length - 1].highestPriceOfTheDay,
        },
      ],
      AMAZON: [
        {
          action: "VENTE",
          price: amazonStocks[amazonStocks.length - 1].highestPriceOfTheDay,
        },
      ],
      date: googleStocks[googleStocks.length - 1].timestamp,
    });

    return dataPoints;
  }
}

export default LocalMinMaxFilter;
