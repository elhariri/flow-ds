import DailyStockPricesModel from "../Models/DailyStockPrices.Model";
// import { ServerSuccessfullResponseBody } from "../index.types";
import { ExpressController } from "./Controllers.types";
import { ExpressResponseBuilder } from "./Helpers/ResponseBuilder";

export const getCompanyOptimalSolution: ExpressController<
  any, // ServerSuccessfullResponseBody,
  string
> = async (req, res) =>
  ExpressResponseBuilder(
    res,
    async () =>
      DailyStockPricesModel.getCompanyOptimalSolution(
        parseInt(req.params.companyId, 10)
      ),
    "While retrieving company optimal solution."
  );

export default { getCompanyOptimalSolution };
