import express from "express";
import CompanyController from "../Controllers/Company.Controller";

const CompanyRouter = express.Router();

CompanyRouter.get("/all", CompanyController.getAllCompanies);
CompanyRouter.get(
  "/optimalSolution/:company",
  CompanyController.getCompanyOptimalSolution
);

export default CompanyRouter;
