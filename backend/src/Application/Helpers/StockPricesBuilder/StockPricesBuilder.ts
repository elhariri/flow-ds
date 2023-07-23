import { DailyStockPrice } from "../../../Types/Model.types";

/**
 * Helper class for building daily stock price data points and series.
 *
 * @class
 */
export default class DailyStockPriceBuilder {
  /**
   * Builds a single daily stock price data point.
   *
   * @static
   * @param {string} company - The name of the company.
   * @param {number} date - The timestamp of the date for the data point.
   * @param {number} lowestPrice - The lowest price of the stock for the day.
   * @param {number} highestPrice - The highest price of the stock for the day.
   * @returns {DailyStockPrice} The daily stock price data point.
   */
  static buildPoint(
    company: string,
    date: number,
    lowestPrice: number,
    highestPrice: number
  ): DailyStockPrice {
    return {
      company,
      date,
      lowestPrice,
      highestPrice,
    };
  }

  /**
   * Builds an array of daily stock price data points for a given company.
   *
   * @static
   * @param {string} company - The name of the company.
   * @param {[number, number, number][]} values - An array of tuples containing [date, lowestPrice, highestPrice] data.
   * @returns {DailyStockPrice[]} An array of daily stock price data points.
   */
  static buildSeries(
    company: string,
    values: [number, number, number][]
  ): DailyStockPrice[] {
    return values.map(([date, lowestPrice, highestPrice]) =>
      this.buildPoint(company, date, lowestPrice, highestPrice)
    );
  }
}
