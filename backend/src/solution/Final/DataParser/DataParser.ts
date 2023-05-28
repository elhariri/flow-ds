import { DailyStockPrices } from "../../../index.types";
import { Datapoint } from "../index.types";

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

  public static filter(
    googleStocks: DailyStockPrices[],
    amazonStocks: DailyStockPrices[]
  ) {
    this.areValidStocksInputs(googleStocks, amazonStocks);

    const dataLength = googleStocks.length;

    const dataPoints: Datapoint[] = [];

    dataPoints.push(this.buildDataPoint(googleStocks[0], amazonStocks[0]));

    for (let i = 1; i < dataLength - 1; i += 1) {
      dataPoints.push(this.buildDataPoint(googleStocks[i], amazonStocks[i]));
    }

    dataPoints.push(
      this.buildDataPoint(
        googleStocks[dataLength - 1],
        amazonStocks[dataLength - 1]
      )
    );

    return dataPoints;
  }
}

export default DataParser;
