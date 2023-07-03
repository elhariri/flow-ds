/* eslint-disable import/prefer-default-export */
import fs from "fs";

import { ServerSuccessfullResponse, Stocks } from "./index.types";
import StockProfitMaximizer from "./exo1/StockProfitMaximizer/StockProfitMaximizer";
import Timer from "./exo1/Timer/Timer";
import findMaxProfit from "./exo2/findMaxProfit";

export function Exo1Solution(): ServerSuccessfullResponse {
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

function Exo2SolutionWrapper(stock: Stocks) {
  const shareStockPrices = JSON.parse(
    fs.readFileSync(
      `./data/${stock[0]}${stock.slice(1).toLowerCase()}StockPrices.json`,
      "utf8"
    )
  );

  const timer = new Timer();

  timer.start();
  const result = findMaxProfit(shareStockPrices, stock);
  timer.stop();

  return {
    success: true,
    result: {
      ...result,
      executionTime: timer.getElapsedTime(),
    },
  };
}

export function Exo2GoogleSolution(): ServerSuccessfullResponse {
  return Exo2SolutionWrapper("GOOGLE");
}

export function Exo2AmazonSolution(): ServerSuccessfullResponse {
  return Exo2SolutionWrapper("AMAZON");
}

export function Exo2BothSharesSolution(): ServerSuccessfullResponse {
  const amazonMaxProfit = Exo2SolutionWrapper("AMAZON");
  const googleMaxProfit = Exo2SolutionWrapper("GOOGLE");

  if (amazonMaxProfit.result.profit > googleMaxProfit.result.profit) {
    return amazonMaxProfit;
  }

  return googleMaxProfit;
}

export default {
  Exo1Solution,
  Exo2GoogleSolution,
  Exo2AmazonSolution,
  Exo2BothSharesSolution,
};
