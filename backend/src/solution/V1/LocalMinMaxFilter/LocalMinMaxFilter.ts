import fs from "fs";

import { DailyStockPrices } from "../../../index.types";
import { DataPoint, StockDayAction } from "./LocalMinMaxFilter.types";

class LocalMinMaxFilter {
  private static areValidStocksInputs(
    googleStocks: DailyStockPrices[],
    amazonStocks: DailyStockPrices[]
  ) {
    if (googleStocks.length !== amazonStocks.length) {
      throw new Error("Stocks must have the same length");
    }

    if (googleStocks.length < 2) {
      throw new Error("Stocks must have at least 2 data points");
    }
  }

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
    stockPrices: DailyStockPrices[]
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
    stockPrices: DailyStockPrices[],
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
      ) ||
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
    }

    return possibleActions;
  }

  private static buildDataPoint(
    googleActions: StockDayAction[],
    amazonActions: StockDayAction[],
    timestamp: number
  ): DataPoint | null {
    const dataPoint: any = {};

    if (googleActions.length > 0 || amazonActions.length > 0) {
      dataPoint.date = timestamp;

      if (googleActions.length > 0) {
        dataPoint.GOOGLE = googleActions;
      }

      if (amazonActions.length > 0) {
        dataPoint.AMAZON = amazonActions;
      }

      return dataPoint;
    }

    return null;
  }

  private static buildFirstDayDataPoint(
    googleStocks: DailyStockPrices[],
    amazonStocks: DailyStockPrices[]
  ): DataPoint | null {
    const firstDayGoogleAction = this.shouldBuyOnFirstDay(googleStocks);
    const firstDayAmazonAction = this.shouldBuyOnFirstDay(amazonStocks);

    return this.buildDataPoint(
      firstDayGoogleAction ? [firstDayGoogleAction] : [],
      firstDayAmazonAction ? [firstDayAmazonAction] : [],
      googleStocks[0].timestamp
    );
  }

  private static buildLastDayDataPoint(
    googleStocks: DailyStockPrices[],
    amazonStocks: DailyStockPrices[]
  ): DataPoint {
    return {
      date: googleStocks[googleStocks.length - 1].timestamp,
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
    };
  }

  public static filter(
    googleStocks: DailyStockPrices[],
    amazonStocks: DailyStockPrices[]
  ) {
    const dataPoints: DataPoint[] = [];

    this.areValidStocksInputs(googleStocks, amazonStocks);

    const firstDayDataPoint = this.buildFirstDayDataPoint(
      googleStocks,
      amazonStocks
    );

    if (firstDayDataPoint) {
      dataPoints.push(firstDayDataPoint);
    }

    let lastPushedGoogleAction = true;
    let lastPushedAmazonAction = true;

    for (let i = 1; i < googleStocks.length - 1; i += 1) {
      const googleActions = this.hasMinMax(googleStocks, i);

      const amazonActions = this.hasMinMax(amazonStocks, i);

      // if No cash try to sell
      if (true) {
        amazonActions.push({
          action: "ACHAT",
          price: amazonStocks[i].lowestPriceOfTheDay,
        });
        lastPushedAmazonAction = true;
      }

      if (true) {
        googleActions.push({
          action: "ACHAT",
          price: googleStocks[i].lowestPriceOfTheDay,
        });
        lastPushedGoogleAction = true;
      }

      if (
        lastPushedAmazonAction &&
        amazonActions.filter(({ action }) => action === "VENTE").length === 0
      ) {
        amazonActions.push({
          action: "VENTE",
          price: amazonStocks[i].highestPriceOfTheDay,
        });
      }

      if (
        lastPushedGoogleAction &&
        googleActions.filter(({ action }) => action === "VENTE").length === 0
      ) {
        googleActions.push({
          action: "VENTE",
          price: googleStocks[i].highestPriceOfTheDay,
        });
      }

      const dataPoint = this.buildDataPoint(
        googleActions,
        amazonActions,
        googleStocks[i].timestamp
      );

      if (dataPoint) {
        dataPoints.push(dataPoint);
      }
    }

    dataPoints.push(this.buildLastDayDataPoint(googleStocks, amazonStocks));

    fs.writeFileSync("./datapoint.json", JSON.stringify(dataPoints));

    return dataPoints;
  }
}

export default LocalMinMaxFilter;
