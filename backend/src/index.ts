import fs from "fs";
import StockProfitMaximizer from "./solution/V0-naive/StockProfitMaximizer/StockProfitMaximizer";

const AmazonStockPrices = JSON.parse(
  fs.readFileSync("data/AmazonStockPrices.json", "utf8")
);
const GoogleStockPrices = JSON.parse(
  fs.readFileSync("data/GoogleStockPrices.json", "utf8")
);

/* import express, { Request, Response } from "express";
import cors from "cors";
import { ServerSuccessfullResponse } from "./index.types";

const app = express();
const port = 3000;

// Disable CORS for development
app.use(cors());

// Default router handler
app.get("/", (req: Request, res: Response) => {
  const data: ServerSuccessfullResponse = {
    success: true,
    body: {
      transactions: [
        {
          date: "2020-01-01",
          action: "ACHAT",
          name: "GOOGLE",
          unit_price: 100,
          num_shares: 10,
          total: 1000,
          portfolio_amount: 1000,
        },
        {
          date: "2020-01-02",
          action: "ACHAT",
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

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
 */

const profit = StockProfitMaximizer.findMaxProfit(
  GoogleStockPrices,
  AmazonStockPrices
);

fs.writeFileSync("./", JSON.stringify(profit));
