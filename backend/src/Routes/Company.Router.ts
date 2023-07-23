import express from "express";
import CompanyController from "../Controllers/Company.Controller";
import DailyStockPricesController from "../Controllers/DailyStockPrices.Controller";

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: API endpoints for managing companies
 */

const CompanyRouter = express.Router();

/**
 * @swagger
 * /company/all:
 *   get:
 *     summary: Get the list of all companies
 *     tags: [Company]
 *     responses:
 *       '200':
 *         description: Successful response. Returns the list of all companies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   value:
 *                     type: integer
 *       '500':
 *         description: Oops an error occured while retrieving the companies list.
 */
CompanyRouter.get("/all", CompanyController.getAllCompanies);

/**
 * @swagger
 * /company/optimal/all:
 *   get:
 *     summary: Get the optimal profit solution for all companies
 *     tags: [Company]
 *     responses:
 *       '200':
 *         description: Successful response. Returns the overall optimal profit solution for all companies.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerSuccessfullResponseBody'
 *       '404':
 *          description: No companies found.
 *       '500':
 *         description: Internal server error. Returns an error message.
 */
CompanyRouter.get(
  "/optimal/all",
  DailyStockPricesController.getAllCompaniesOptimalSolution
);

/**
 * @swagger
 * /company/optimal/{companyId}:
 *   get:
 *     summary: Get the optimal profit solution for a specific company
 *     tags: [Company]
 *     parameters:
 *       - name: companyId
 *         in: path
 *         description: The ID of the company.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Successful response. Returns the optimal profit solution for the specified company.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerSuccessfullResponseBody'
 *       '404':
 *         description: Company with id=companyId not found.
 *       '500':
 *         description: Oops an error occured while retrieving company optimal solution.
 */
CompanyRouter.get(
  "/optimal/:companyId",
  DailyStockPricesController.getCompanyOptimalSolution
);

// get the optimal solution for all company

export default CompanyRouter;
