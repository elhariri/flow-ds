/* eslint-disable import/prefer-default-export */
import express, { Request, Response } from "express";

import cors from "cors";
import CompanyController from "./Controllers/Company.Controller";
import DBClient from "./Models/Database/Client/DBClient";
import DailyStockPricesController from "./Controllers/DailyStockPrices.Controller";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", async (req: Request, res: Response) =>
  res.json({
    body: JSON.stringify(await CompanyController.getAllCompanies()),
  })
);

app.get("/optimalSolution/:company", async (req: Request, res: Response) =>
  res.json({
    body: JSON.stringify(
      await DailyStockPricesController.getCompanyOptimalSolution(
        req.params.company
      )
    ),
  })
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}.`);
});

async function main() {
  // test
}

main()
  .then(async () => {
    await DBClient.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await DBClient.$disconnect();
    process.exit(1);
  });
