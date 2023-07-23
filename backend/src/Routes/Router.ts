import { Express } from "express";
import CompanyRouter from "./Company.Router";
import SwaggerRouter from "./InfraRoutes/Swagger.Router";

export default (app: Express) => {
  app.use("/company", CompanyRouter);
  app.use(SwaggerRouter);
};
