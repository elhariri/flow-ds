import Timer from "../Application/Helpers/Timer/Timer";
import ProfitOptimizer from "../Application/ProfitOptimizer";
import Error from "../Helpers/ApplicationError";
import { CompanyRepository } from "./Database/Repositories/Repository";

class CompanyModel {
  static async getAllCompanies() {
    const companies = await CompanyRepository.findAll();
    return companies.map(({ name, id }) => ({ name, value: id }));
  }

  static async getCompanyOptimalSolution(companyName: string) {
    const company = await CompanyRepository.findOne({
      where: { name: companyName },
      select: {
        stockPrices: true,
        name: true,
      },
    });

    if (!company) {
      throw new Error(404, `Company ${companyName} not found.`);
    }

    const stockPrices = (company.stockPrices || [])
      .map((dailyStockPrice) => ({
        ...dailyStockPrice,
        company: companyName,
        date: Number(dailyStockPrice.date),
      }))
      .sort((a, b) => a.date - b.date);

    const timer = new Timer();

    timer.start();
    const result = ProfitOptimizer.FindMaxProfit(stockPrices);
    timer.stop();

    return {
      ...result,
      executionTime: timer.getElapsedTime(),
    };
  }
}

export default CompanyModel;
