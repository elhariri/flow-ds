import { Express } from "express";
import CompanyRouter from "./Company.Router";

export default (app: Express) => {
  app.use("/company", CompanyRouter);
};
