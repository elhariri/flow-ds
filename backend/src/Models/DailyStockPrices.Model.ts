import ApplicationError from "../Application/Helpers/ApplicationError/ApplicationError";
import Timer from "../Application/Helpers/Timer/Timer";
import ProfitOptimizer from "../Application/ProfitOptimizer/ProfitOptimizer";

import { DailyStockPrice } from "../Types/Model.types";
import { ServerSuccessfullResponseBody } from "../index.types";
import {
  CompanyRepository,
  DailyStockPriceRepository,
} from "./Database/Repositories/Repository";

/**
 * Represents a model for handling daily stock prices and optimizing profits.
 *
 * @class
 */
class DailyStockPricesModel {
  /**
   * Retrieves the optimal profit solution for a specific company based on its daily stock prices.
   *
   * @static
   * @param {number} companyId - The identifier of the company.
   * @returns {Promise<ServerSuccessfullResponseBody>} A Promise that resolves to an object containing the optimal profit solution and execution time.
   * @throws {ApplicationError} Throws an error if the company or its daily stock prices are not found.
   */
  static async getCompanyOptimalSolution(
    companyId: number
  ): Promise<ServerSuccessfullResponseBody> {
    // Find all daily stock prices for the company and order them by date in ascending order.
    const companyPrices = await DailyStockPriceRepository.find({
      where: { companyId },
      include: { company: true },
      orderBy: {
        date: "asc",
      },
    });

    // If no daily stock prices are found, check if the company exists.
    if (!companyPrices.length) {
      const company = await CompanyRepository.findById(companyId.toString());

      // If the company does not exist, throw a 404 error.
      if (!company) {
        throw new ApplicationError(
          404,
          `Company with id=${companyId} not found.`
        );
      }
    }

    // Map the daily stock prices to a new array of daily stock prices with the company name as a string and the date as a number.
    const companyDailyPrices: DailyStockPrice[] = companyPrices.map(
      (dailyStockPrice) => ({
        ...dailyStockPrice,
        company: dailyStockPrice.company.name,
        date: Number(dailyStockPrice.date),
      })
    );

    // Create a new timer to measure the execution time.
    const timer = new Timer();

    // Start the timer.
    timer.start();

    // Find the optimal profit solution for the company.
    const result = ProfitOptimizer.FindMaxProfit(companyDailyPrices);

    // Stop the timer.
    timer.stop();

    return {
      ...result,
      executionTime: timer.getElapsedTime(),
    };
  }

  /**
   * Retrieves the optimal profit solutions for all companies based on their daily stock prices.
   *
   * @static
   * @returns {Promise<ServerSuccessfullResponseBody>} A Promise that resolves to an object containing the overall optimal profit solution and execution time.
   * @throws {ApplicationError} Throws an error if no companies or their daily stock prices are found.
   */
  static async getAllCompaniesOptimalSolution(): Promise<ServerSuccessfullResponseBody> {
    // Find all daily stock prices for all companies and order them by date in ascending order.
    const companyPrices = await DailyStockPriceRepository.findAll({
      include: { company: true },
      orderBy: {
        date: "asc",
      },
    });

    // If no daily stock prices are found, check if any companies exist.
    if (!companyPrices.length) {
      const company = await CompanyRepository.findAll();

      // If no companies exist, throw a 404 error.
      if (company.length === 0) {
        throw new ApplicationError(404, `No company found.`);
      }
    }

    // Create a new object to store the daily stock prices for each company.
    const companyDailyPrices: { [company: string]: DailyStockPrice[] } = {};
    // Create a new array to store the names of all companies.
    const companyNames: string[] = [];

    // Create a new timer to measure the execution time.
    const timer = new Timer();

    // Start the timer.
    timer.start();

    // Iterate through all daily stock prices. and create a map of company names to daily stock prices.
    for (let i = 0; i < companyPrices.length; i += 1) {
      const companyName = companyPrices[i].company.name;

      if (!companyNames.includes(companyName)) companyNames.push(companyName);

      companyDailyPrices[companyName] = companyDailyPrices[companyName] || [];

      companyDailyPrices[companyName].push({
        ...companyPrices[i],
        company: companyPrices[i].company.name,
        date: Number(companyPrices[i].date),
      });
    }

    // Create a new object to store the overall optimal profit solution.
    let profit: Omit<ServerSuccessfullResponseBody, "executionTime"> = {
      profit: 0,
      transactions: [],
    };

    // Iterate through all companies and find the optimal profit solution for each company.
    for (let i = 0; i < companyNames.length; i += 1) {
      const companyProfit = ProfitOptimizer.FindMaxProfit(
        companyDailyPrices[companyNames[i]]
      );

      // If the profit for the current company is greater than the overall profit, replace the overall profit with the current company's profit.
      if (companyProfit.profit > profit.profit) profit = companyProfit;
    }

    // Stop the timer.
    timer.stop();

    // Return the overall optimal profit solution and execution time.
    return {
      ...profit,
      executionTime: timer.getElapsedTime(),
    };
  }
}

export default DailyStockPricesModel;
