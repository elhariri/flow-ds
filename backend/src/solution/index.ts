import StockProfitMaximizer from "./V0-naive/StockProfitMaximizer/StockProfitMaximizer";
import StockProfitMaximizerV1 from "./V1/StockProfitMaximizerV1/StockProfitMaximizerV1";
import StockProfitMaximizerV2 from "./V2/StockProfitMaximizerV2/StockProfitMaximizerV2";

export const solutions = {
  bruteForce: StockProfitMaximizer,
  v1: StockProfitMaximizerV1,
  v2: StockProfitMaximizerV2,
};

export default StockProfitMaximizerV1;
