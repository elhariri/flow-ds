/* eslint-disable import/prefer-default-export */
import fs from "fs";

import { ServerSuccessfullResponse } from "./index.types";
import StockProfitMaximizer from "./solution/V1/StockProfitMaximizerV1/StockProfitMaximizerV1";

export const handler = async () => {
  const AmazonStockPrices = JSON.parse(
    fs.readFileSync("./data/AmazonStockPrices.json", "utf8")
  );
  const GoogleStockPrices = JSON.parse(
    fs.readFileSync("./data/GoogleStockPrices.json", "utf8")
  );

  const data: ServerSuccessfullResponse = {
    success: true,
    body: StockProfitMaximizer.findMaxProfit(
      GoogleStockPrices,
      AmazonStockPrices
    ),
  };
  return { body: JSON.stringify(data) };
};
