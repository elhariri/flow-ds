import { DailyStockPrices } from "../../../index.types";
import { Datapoint } from "./DataParser.types";

class DataParser {
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

  private static buildDataPoint(
    googlePrices: DailyStockPrices,
    amazonPrices: DailyStockPrices
  ): Datapoint {
    return {
      date: googlePrices.timestamp,
      prices: {
        GOOGLE: {
          buyPrice: googlePrices.lowestPriceOfTheDay,
          sellPrice: googlePrices.highestPriceOfTheDay,
        },
        AMAZON: {
          buyPrice: amazonPrices.lowestPriceOfTheDay,
          sellPrice: amazonPrices.highestPriceOfTheDay,
        },
      },
    };
  }

  public static buildDataPoints(
    googleStocks: DailyStockPrices[],
    amazonStocks: DailyStockPrices[]
  ) {
    this.areValidStocksInputs(googleStocks, amazonStocks);

    const dataPoints: Datapoint[] = [];

    for (let i = 0; i < googleStocks.length; i += 1) {
      dataPoints.push(this.buildDataPoint(googleStocks[i], amazonStocks[i]));
    }

    return dataPoints;
  }
}

export default DataParser;
