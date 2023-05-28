/* eslint-disable import/prefer-default-export */
import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";

import { ServerSuccessfullResponse } from "./index.types";
import solution from "./solution/index";

const AmazonStockPrices = JSON.parse(
  fs.readFileSync("./data/AmazonStockPrices.json", "utf8")
);
const GoogleStockPrices = JSON.parse(
  fs.readFileSync("./data/GoogleStockPrices.json", "utf8")
);

const app = express();
const port = process.env.NODE_ENV === "prod" ? 8080 : 3000;

// Disable CORS for development
app.use(cors());

// Default router handler
app.get("/", (req: Request, res: Response) => {
  const data: ServerSuccessfullResponse = {
    success: true,
    body: solution.findMaxProfit(GoogleStockPrices, AmazonStockPrices),
  };
  return res.json({ body: JSON.stringify(data) });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
