/* eslint-disable import/prefer-default-export */
import fs from "fs";

import { ServerSuccessfullResponse } from "./index.types";
import StockProfitMaximizer from "./solution/Final/StockProfitMaximizer/StockProfitMaximizer";
import Timer from "./solution/Shared/Timer/Timer";

export default function FinalSolution(): ServerSuccessfullResponse {
  const AmazonStockPrices = JSON.parse(
    fs.readFileSync("./data/AmazonStockPrices.json", "utf8")
  );
  const GoogleStockPrices = JSON.parse(
    fs.readFileSync("./data/GoogleStockPrices.json", "utf8")
  );

  const timer = new Timer();

  timer.start();
  const result = StockProfitMaximizer.findMaxProfit(
    GoogleStockPrices,
    AmazonStockPrices
  );
  timer.stop();

  return {
    success: true,
    result: {
      ...result,
      executionTime: timer.getElapsedTime(),
    },
  };
}
