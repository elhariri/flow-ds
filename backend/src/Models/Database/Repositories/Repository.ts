import { Company, DailyStockPrice } from "../../../Types/Model.types";
import DBClient from "../Client/DBClient";
import RepositoryWrapper from "./Wrappers";

export const CompanyRepository = new RepositoryWrapper<Company>(
  DBClient.company
);

export const DailyStockPriceRepository = new RepositoryWrapper<DailyStockPrice>(
  DBClient.dailyStockPrice
);
