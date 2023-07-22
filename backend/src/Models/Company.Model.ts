import Error from "../Helpers/ApplicationError";
import { CompanyRepository } from "./Database/Repositories/Repository";

class CompanyModel {
  static async getAllCompanies() {
    const companies = await CompanyRepository.findAll();
    return companies.map((company) => company.name);
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

    return company.stockPrices?.sort((a, b) => a.date - b.date) || [];
  }
}

export default CompanyModel;
