import { DailyStockPrice } from "../../Types/Model.types";
import DailyStockPriceBuilder from "../Helpers/DailyStockPriceBuilder/DailyStockPriceBuilder";
import StockPricesBuilder from "../Helpers/DailyStockPriceBuilder/StockPricesBuilder";
import ProfitOptimizer from "../ProfitOptimizer";

import TransactionsBuilder from "../TransactionsBuilder/TransactionsBuilder";

describe("Profit Optimizer", () => {
  it("should return a null result if given an empty array", () => {
    // given
    const prices: DailyStockPrice[] = [];

    // when
    const result = ProfitOptimizer.FindMaxProfit(prices);

    // then
    expect(result).toEqual({
      profit: 0,
      transactions: [],
    });
  });

  it("should return a null result if given an array with a single value", () => {
    // given
    const prices: DailyStockPrice[] = [
      DailyStockPriceBuilder("GOOGLE", 1641186000000, 600, 600),
    ];

    // when
    const result = ProfitOptimizer.FindMaxProfit(prices);

    // then
    expect(result).toEqual({
      profit: 0,
      transactions: [],
    });
  });

  it("should return a null result if given an array of descending prices", () => {
    // given
    const prices: DailyStockPrice[] = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 110, 110],
      [1641358800000, 100, 100],
      [1641445200000, 80, 80],
      [1641531600000, 50, 50],
    ]);

    // when
    const result = ProfitOptimizer.FindMaxProfit(prices);

    // then
    expect(result).toEqual({
      profit: 0,
      transactions: [],
    });
  });

  it("should return a null result if given an array of constant prices", () => {
    // given
    const prices: DailyStockPrice[] = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 600, 600],
      [1641358800000, 600, 600],
      [1641445200000, 600, 600],
      [1641531600000, 600, 600],
    ]);

    // when
    const result = ProfitOptimizer.FindMaxProfit(prices);

    // then
    expect(result).toEqual({
      profit: 0,
      transactions: [],
    });
  });

  it("should throw an error if given a negative price", () => {
    // given
    const prices: DailyStockPrice[] = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, -110, 110],
      [1641358800000, 100, 100],
      [1641445200000, 80, 80],
      [1641531600000, 50, 50],
    ]);

    // when
    try {
      ProfitOptimizer.FindMaxProfit(prices);

      // then
    } catch (e: any) {
      expect(e instanceof Error).toEqual(true);
      expect(e.message).toEqual("Prices cannot be null or negative");
    }
  });

  it("should throw an error if given a highest price smaller than the lowest price", () => {
    // given
    const prices: DailyStockPrice[] = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 120, 110],
      [1641358800000, 100, 100],
      [1641445200000, 80, 80],
      [1641531600000, 50, 50],
    ]);

    // when
    try {
      ProfitOptimizer.FindMaxProfit(prices);

      // then
    } catch (e: any) {
      expect(e instanceof Error).toEqual(true);
      expect(e.message).toEqual(
        "Highest price cannot be lower than lowest price"
      );
    }
  });

  it("should return a result from the first and last prices if given an array of ascending prices", () => {
    // given
    const prices: DailyStockPrice[] = StockPricesBuilder("GOOGLE", [
      [1641186000000, 50, 50],
      [1641272400000, 80, 80],
      [1641358800000, 100, 100],
      [1641445200000, 110, 110],
      [1641531600000, 600, 600],
    ]);

    // when
    const result = ProfitOptimizer.FindMaxProfit(prices);

    // then

    expect(result).toEqual({
      profit: 1100000,
      transactions: TransactionsBuilder.buildOptimalSolution(
        prices[0],
        prices[prices.length - 1]
      ),
    });
  });

  it("it should not pick a max price that precedes the min price", () => {
    // when
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 110, 110],
      [1641358800000, 164, 164],
      [1641445200000, 200, 200],
    ]);

    // given
    const optimalTransactions = TransactionsBuilder.buildOptimalSolution(
      prices[1],
      prices[3]
    );
    const result = ProfitOptimizer.FindMaxProfit(prices);

    // then
    expect(result).toEqual({
      profit: 81810,
      transactions: optimalTransactions,
    });
  });

  it("it should not pick the first min value it encounters", () => {
    // when
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 110, 110],
      [1641358800000, 164, 164],
      [1641445200000, 410, 410],
      [1641531600000, 200, 200],
      [1641618000000, 50, 50],
      [1641704400000, 400, 400],
    ]);

    // given
    const optimalTransactions = TransactionsBuilder.buildOptimalSolution(
      prices[5],
      prices[6]
    );
    const result = ProfitOptimizer.FindMaxProfit(prices);

    // then
    expect(result).toEqual({
      profit: 700000,
      transactions: optimalTransactions,
    });
  });

  it("should not pick the first max value it encounters", () => {
    // when
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 50, 50],
      [1641358800000, 164, 164],
      [1641445200000, 410, 410],
      [1641531600000, 200, 200],
      [1641618000000, 110, 110],
      [1641704400000, 400, 400],
    ]);

    // given
    const optimalTransactions = TransactionsBuilder.buildOptimalSolution(
      prices[1],
      prices[3]
    );
    const result = ProfitOptimizer.FindMaxProfit(prices);

    // then
    expect(result).toEqual({
      profit: 720000,
      transactions: optimalTransactions,
    });
  });

  it("should handle random prices", () => {
    // when
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 445, 445],
      [1641272400000, 36, 36],
      [1641358800000, 164, 164],
      [1641445200000, 523, 523],
      [1641531600000, 24, 24],
      [1641618000000, 304, 304],
      [1641704400000, 477, 477],
    ]);

    // given
    const optimalTransactions = TransactionsBuilder.buildOptimalSolution(
      prices[4],
      prices[6]
    );
    const result = ProfitOptimizer.FindMaxProfit(prices);

    // then
    expect(result).toEqual({
      profit: 1887198,
      transactions: optimalTransactions,
    });
  });
});

describe("find buy and sell indexes", () => {
  it("it should find the optimal solution when the global max is the first", () => {
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 110, 110],
      [1641358800000, 164, 164],
      [1641445200000, 410, 410],
      [1641531600000, 200, 200],
    ]);

    expect(ProfitOptimizer.FindBuyAndSellIndexes(prices).buyIndex).toEqual(1);
    expect(ProfitOptimizer.FindBuyAndSellIndexes(prices).sellIndex).toEqual(3);
    expect(ProfitOptimizer.FindBuyAndSellIndexes(prices).profit).toEqual(
      372690
    );
  });

  it("should pass 2", () => {
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 110, 110],
      [1641358800000, 164, 164],
      [1641445200000, 410, 410],
      [1641531600000, 200, 200],
      [1641618000000, 50, 50],
      [1641704400000, 400, 400],
    ]);

    expect(ProfitOptimizer.FindBuyAndSellIndexes(prices).buyIndex).toEqual(5);
    expect(ProfitOptimizer.FindBuyAndSellIndexes(prices).sellIndex).toEqual(6);
    expect(ProfitOptimizer.FindBuyAndSellIndexes(prices).profit).toEqual(
      800000
    );
  });

  it("should pass 3", () => {
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 110, 110],
      [1641358800000, 100, 100],
      [1641445200000, 80, 80],
      [1641531600000, 50, 50],
    ]);

    expect(ProfitOptimizer.FindBuyAndSellIndexes(prices).buyIndex).toEqual(-1);
    expect(ProfitOptimizer.FindBuyAndSellIndexes(prices).sellIndex).toEqual(-1);
    expect(ProfitOptimizer.FindBuyAndSellIndexes(prices).profit).toEqual(0);
  });
});
