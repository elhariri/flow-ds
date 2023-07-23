import { Company, DailyStockPrice } from "../../../Types/Model.types";
import DBClient from "../Client/DBClient";
import RepositoryWrapper from "./Wrappers";
import { SchemaType } from "./repository.types";

export const CompanyRepository = new RepositoryWrapper<SchemaType<Company>>(
  DBClient.company
);

export const DailyStockPriceRepository = new RepositoryWrapper<
  SchemaType<DailyStockPrice, { companyId: number }>
>(DBClient.dailyStockPrice);
