import Timer from "../Application/Helpers/Timer/Timer";
import ProfitOptimizer from "../Application/ProfitOptimizer";
import ApplicationError from "../Helpers/ApplicationError";
import { DailyStockPrice } from "../Types/Model.types";
import { ServerSuccessfullResponseBody } from "../index.types";
import {
  CompanyRepository,
  DailyStockPriceRepository,
} from "./Database/Repositories/Repository";

class DailyStockPricesModel {
  static async getCompanyOptimalSolution(companyId: number) {
    try {
      const companyPrices = await DailyStockPriceRepository.find({
        where: { companyId },
        include: { company: true },
        orderBy: {
          date: "asc",
        },
      });

      if (!companyPrices.length) {
        const company = await CompanyRepository.findById(companyId.toString());

        if (!company) {
          throw new ApplicationError(
            404,
            `Company with id: ${companyId} not found.`
          );
        }
      }

      const companyDailyPrices: DailyStockPrice[] = companyPrices.map(
        (dailyStockPrice) => ({
          ...dailyStockPrice,
          company: dailyStockPrice.company.name,
          date: Number(dailyStockPrice.date),
        })
      );

      const timer = new Timer();

      timer.start();
      const result = ProfitOptimizer.FindMaxProfit(companyDailyPrices);
      timer.stop();

      return {
        ...result,
        executionTime: timer.getElapsedTime(),
      };
    } catch (error) {
      return error;
    }
  }

  static async getAllCompaniesOptimalSolution() {
    try {
      const companyPrices = await DailyStockPriceRepository.findAll({
        include: { company: true },
        orderBy: {
          date: "asc",
        },
      });

      if (!companyPrices.length) {
        const company = await CompanyRepository.findAll();

        if (company.length === 0) {
          throw new ApplicationError(404, `No company found.`);
        }
      }

      const companyDailyPrices: { [company: string]: DailyStockPrice[] } = {};
      const companyNames: string[] = [];

      const timer = new Timer();

      timer.start();
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
      let profit: Omit<ServerSuccessfullResponseBody, "executionTime"> = {
        profit: 0,
        transactions: [],
      };
      for (let i = 0; i < companyNames.length; i += 1) {
        const companyProfit = ProfitOptimizer.FindMaxProfit(
          companyDailyPrices[companyNames[i]]
        );
        if (companyProfit.profit > profit.profit) profit = companyProfit;
      }

      timer.stop();

      return {
        ...profit,
        executionTime: timer.getElapsedTime(),
      };
    } catch (error) {
      return error;
    }
  }
}

export default DailyStockPricesModel;
