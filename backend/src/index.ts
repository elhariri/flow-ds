import express, { Request, Response } from "express";
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

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
