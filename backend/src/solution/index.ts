import StockProfitMaximizer from "./Iterations/V0-naive/StockProfitMaximizer/StockProfitMaximizer";
import StockProfitMaximizerV1 from "./Final/StockProfitMaximizer/StockProfitMaximizer";
import StockProfitMaximizerV2 from "./Iterations/V2/StockProfitMaximizerV2/StockProfitMaximizerV2";

export const solutions = {
  bruteForce: StockProfitMaximizer,
  v1: StockProfitMaximizerV1,
  v2: StockProfitMaximizerV2,
};

export default StockProfitMaximizerV2;
