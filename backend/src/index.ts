import fs from "fs";

import Timer from "./Helpers/Timer/Timer";
import FindMaxProfit from "./Application/FindMaxProfit";

function Exo2SolutionWrapper(company: string) {
  const shareStockPrices = JSON.parse(
    fs.readFileSync(
      `./data/${company[0]}${company.slice(1).toLowerCase()}StockPrices.json`,
      "utf8"
    )
  );

  const timer = new Timer();

  timer.start();
  const result = FindMaxProfit(shareStockPrices);
  timer.stop();

  return {
    success: true,
    result: {
      ...result,
      executionTime: timer.getElapsedTime(),
    },
  };
}

export default Exo2SolutionWrapper;
