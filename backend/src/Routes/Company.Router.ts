import express from "express";
import CompanyController from "../Controllers/Company.Controller";
import DailyStockPricesController from "../Controllers/DailyStockPrices.Controller";

const CompanyRouter = express.Router();

// get the list of the companies
CompanyRouter.get("/all", CompanyController.getAllCompanies);

// get the optimal solution for all companies
CompanyRouter.get(
  "/optimal/all",
  DailyStockPricesController.getAllCompaniesOptimalSolution
);

// get the optimal solution for a company
CompanyRouter.get(
  "/optimal/:companyId",
  DailyStockPricesController.getCompanyOptimalSolution
);

// get the optimal solution for all company

export default CompanyRouter;
