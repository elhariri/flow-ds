import { DailyStockPriceRepository } from "./Database/Repositories/Repository";

class DailyStockPricesModel {
  static async getCompanyOptimalSolution(companyId: number) {
    try {
      const companyDailyPrices = await DailyStockPriceRepository.find({
        where: { companyId },
      });

      return companyDailyPrices;
    } catch (error) {
      return error;
    }
  }
}

export default DailyStockPricesModel;
