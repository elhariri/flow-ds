import CompanyModel from "../Models/Company.Model";
import { ExpressController } from "./Controllers.types";
import { ExpressResponseBuilder } from "./Helpers/ResponseBuilder";

export const getAllCompanies: ExpressController<
  { name: string; value: number }[],
  string
> = async (_req, res) =>
  ExpressResponseBuilder(
    res,
    CompanyModel.getAllCompanies,
    "while retrieving the companies list."
  );

export default {
  getAllCompanies,
};
