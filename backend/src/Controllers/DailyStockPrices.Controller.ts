import CompanyModel from "../Models/Company.Model";
import { DailyStockPrice } from "../Types/Model.types";

import { Response } from "./Helpers/Response.types";
import { ResponseBuilder } from "./Helpers/ResponseBuilder";

export const getCompanyOptimalSolution = async (
  companyName: string
): Promise<Response<DailyStockPrice[], string>> =>
  ResponseBuilder(async () => {
    const company = await CompanyModel.findOne({
      where: { name: companyName },
      select: {
        stockPrices: true,
        name: true,
      },
    });

    if (!company) {
      throw new Error(`Company ${companyName} not found.`);
    }

    return company.stockPrices?.sort((a, b) => a.date - b.date) || [];
  }, "While retrieving company optimal solution.");

export default {
  getCompanyOptimalSolution,
};
