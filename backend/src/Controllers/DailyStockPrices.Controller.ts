import DailyStockPricesModel from "../Models/DailyStockPrices.Model";
import { ServerSuccessfullResponseBody } from "../index.types";
import { ExpressController } from "./Controllers.types";
import { ExpressResponseBuilder } from "./Helpers/ResponseBuilder";

export const getCompanyOptimalSolution: ExpressController<
  ServerSuccessfullResponseBody,
  string
> = async (req, res) =>
  ExpressResponseBuilder(
    res,
    async () =>
      DailyStockPricesModel.getCompanyOptimalSolution(
        parseInt(req.params.companyId, 10)
      ),
    "while retrieving company optimal solution."
  );

export const getAllCompaniesOptimalSolution: ExpressController<
  ServerSuccessfullResponseBody,
  string
> = async (req, res) =>
  ExpressResponseBuilder(
    res,
    DailyStockPricesModel.getAllCompaniesOptimalSolution,
    "While retrieving all companies optimal solution."
  );

export default { getCompanyOptimalSolution, getAllCompaniesOptimalSolution };
