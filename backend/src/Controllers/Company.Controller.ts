import CompanyModel from "../Models/Company.Model";
import { ServerSuccessfullResponseBody } from "../index.types";
import { ExpressController } from "./Controllers.types";
import { ExpressResponseBuilder } from "./Helpers/ResponseBuilder";

export const getAllCompanies: ExpressController<
  { name: string; value: number }[],
  string
> = async (_req, res) =>
  ExpressResponseBuilder(
    res,
    CompanyModel.getAllCompanies,
    "While retrieving the companies list."
  );

export const getCompanyOptimalSolution: ExpressController<
  ServerSuccessfullResponseBody,
  string
> = async (req, res) =>
  ExpressResponseBuilder(
    res,
    async () => CompanyModel.getCompanyOptimalSolution(req.params.company),
    "While retrieving company optimal solution."
  );

export default {
  getAllCompanies,
  getCompanyOptimalSolution,
};
