import { Company } from "../Types/Model.types";
import { CompanyRepository } from "./Database/Repositories/Repository";
import { SchemaType } from "./Database/Repositories/repository.types";

/**
 * Represents a model for interacting with company data.
 *
 * @class
 */
class CompanyModel {
  /**
   * Retrieves all companies from the database and returns an array of company names and IDs.
   *
   * @static
   * @returns {Promise<{ name: string; value: number }[]>} A Promise that resolves to an array of company names and IDs.
   */
  static async getAllCompanies(): Promise<{ name: string; value: number }[]> {
    const companies: SchemaType<Company>[] = await CompanyRepository.findAll();
    return companies.map(({ name, id }) => ({ name, value: id }));
  }
}

export default CompanyModel;
