import CompanyModel from "../Models/Company.Model";
import { Response } from "./Helpers/Response.types";
import { ResponseBuilder } from "./Helpers/ResponseBuilder";

export const getAllCompanies = async (): Promise<Response<string[], string>> =>
  ResponseBuilder(async () => {
    const companies = await CompanyModel.findAll();
    return companies.map((company) => company.name);
  }, "While retrieving the companies list.");

export default {
  getAllCompanies,
};
