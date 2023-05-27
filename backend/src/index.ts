import express, { Request, Response } from "express";
import cors from "cors";
// import fs from "fs";

import { ServerSuccessfullResponse } from "./index.types";
/* import StockProfitMaximizer from "./solution/V1/StockProfitMaximizerV1/StockProfitMaximizerV1";

const AmazonStockPrices = JSON.parse(
  fs.readFileSync("data/AmazonStockPrices.json", "utf8")
);
const GoogleStockPrices = JSON.parse(
  fs.readFileSync("data/GoogleStockPrices.json", "utf8")
); */

const app = express();
const port = process.env.NODE_ENV === "prod" ? 8080 : 3000;

// Disable CORS for development
app.use(cors());

// Default router handler
app.get("/", (req: Request, res: Response) => {
  const data: ServerSuccessfullResponse = {
    success: true,
    body: {
      transactions: [
        {
          date: "01/01/2020",
          action: "ACHAT",
          name: "GOOGLE",
          unit_price: 100,
          num_shares: 10,
          total: 1000,
          portfolio_amount: 1000,
        },
        {
          date: "01/01/2020",
          action: "VENTE",
          name: "AMAZON",
          unit_price: 100,
          num_shares: 10,
          total: 1000,
          portfolio_amount: 1000,
        },
        {
          date: "02/01/2020",
          action: "ACHAT",
          name: "GOOGLE",
          unit_price: 200,
          num_shares: 5,
          total: 1000,
          portfolio_amount: 2000,
        },
        {
          date: "02/01/2020",
          action: "VENTE",
          name: "AMAZON",
          unit_price: 200,
          num_shares: 5,
          total: 1000,
          portfolio_amount: 2000,
        },
        {
          date: "01/01/2020",
          action: "ACHAT",
          name: "GOOGLE",
          unit_price: 100,
          num_shares: 10,
          total: 1000,
          portfolio_amount: 1000,
        },
        {
          date: "01/01/2020",
          action: "VENTE",
          name: "AMAZON",
          unit_price: 100,
          num_shares: 10,
          total: 1000,
          portfolio_amount: 1000,
        },
        {
          date: "02/01/2020",
          action: "ACHAT",
          name: "GOOGLE",
          unit_price: 200,
          num_shares: 5,
          total: 1000,
          portfolio_amount: 2000,
        },
        {
          date: "02/01/2020",
          action: "VENTE",
          name: "AMAZON",
          unit_price: 200,
          num_shares: 5,
          total: 1000,
          portfolio_amount: 2000,
        },
        {
          date: "01/01/2020",
          action: "ACHAT",
          name: "GOOGLE",
          unit_price: 100,
          num_shares: 10,
          total: 1000,
          portfolio_amount: 1000,
        },
        {
          date: "01/01/2020",
          action: "VENTE",
          name: "AMAZON",
          unit_price: 100,
          num_shares: 10,
          total: 1000,
          portfolio_amount: 1000,
        },
        {
          date: "02/01/2020",
          action: "ACHAT",
          name: "GOOGLE",
          unit_price: 200,
          num_shares: 5,
          total: 1000,
          portfolio_amount: 2000,
        },
        {
          date: "02/01/2020",
          action: "VENTE",
          name: "AMAZON",
          unit_price: 200,
          num_shares: 5,
          total: 1000,
          portfolio_amount: 2000,
        },
      ],
      executionTime: {
        seconds: 50,
        minutes: 0,
      },
    },
  };

  res.json(data);
});

/* const result = StockProfitMaximizer.findMaxProfit(
  GoogleStockPrices,
  AmazonStockPrices
);

console.log(result); */

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
