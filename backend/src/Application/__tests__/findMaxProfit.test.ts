import DailyStockPriceBuilder from "../../Helpers/DailyStockPriceBuilder/DailyStockPriceBuilder";
import StockPricesBuilder from "../../Helpers/DailyStockPriceBuilder/StockPricesBuilder";
import BuildTransactions from "../BuildTransactions";
import FindBuyAndSellIndexes from "../FindBuyAndSellIndexes";
import FindMaxProfit from "../FindMaxProfit";

describe("find buy and sell indexes", () => {
  it("should pass 1", () => {
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 110, 110],
      [1641358800000, 167, 164],
      [1641445200000, 410, 410],
      [1641531600000, 200, 200],
    ]);

    expect(FindBuyAndSellIndexes(prices).buyIndex).toEqual(1);
    expect(FindBuyAndSellIndexes(prices).sellIndex).toEqual(4);
    expect(FindBuyAndSellIndexes(prices).profit).toEqual(300);
  });

  it("should pass 2", () => {
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 110, 110],
      [1641358800000, 167, 164],
      [1641445200000, 410, 410],
      [1641531600000, 200, 200],
      [1641618000000, 50, 50],
      [1641704400000, 400, 400],
    ]);

    expect(FindBuyAndSellIndexes(prices).buyIndex).toEqual(5);
    expect(FindBuyAndSellIndexes(prices).sellIndex).toEqual(6);
    expect(FindBuyAndSellIndexes(prices).profit).toEqual(350);
  });

  it("should pass 3", () => {
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 110, 110],
      [1641358800000, 100, 100],
      [1641445200000, 80, 80],
      [1641531600000, 50, 50],
    ]);

    expect(FindBuyAndSellIndexes(prices).buyIndex).toEqual(-1);
    expect(FindBuyAndSellIndexes(prices).sellIndex).toEqual(-1);
    expect(FindBuyAndSellIndexes(prices).profit).toEqual(0);
  });
});

describe("Build transactions", () => {
  it("should pass 1", () => {
    const buyPrices = DailyStockPriceBuilder("GOOGLE", 1641186000000, 110, 110);
    const sellPrices = DailyStockPriceBuilder(
      "GOOGLE",
      1641272400000,
      600,
      600
    );

    const transactions = BuildTransactions(buyPrices, sellPrices);

    expect(transactions[0]).toEqual({
      date: "03/01/2022",
      action: "ACHAT",
      company: "GOOGLE",
      numShares: 909,
      unitPrice: 110,
      total: 99990,
      portfolioAmount: 10,
    });

    expect(transactions[1]).toEqual({
      date: "04/01/2022",
      action: "VENTE",
      company: "GOOGLE",
      numShares: 909,
      portfolioAmount: 545410,
      total: 545400,
      unitPrice: 600,
    });
  });
});

describe("find Max Profit", () => {
  it("should pass 1", () => {
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 110, 110],
      [1641358800000, 167, 164],
      [1641445200000, 200, 200],
    ]);

    expect(FindMaxProfit(prices).transactions[0]).toEqual({
      date: "04/01/2022",
      action: "ACHAT",
      company: "GOOGLE",
      numShares: 909,
      unitPrice: 110,
      total: 99990,
      portfolioAmount: 10,
    });

    expect(FindMaxProfit(prices).transactions[1]).toEqual({
      date: "06/01/2022",
      action: "VENTE",
      company: "GOOGLE",
      numShares: 909,
      portfolioAmount: 181810,
      total: 181800,
      unitPrice: 200,
    });
  });

  it("should pass 2", () => {
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 110, 110],
      [1641358800000, 167, 164],
      [1641445200000, 410, 410],
      [1641531600000, 200, 200],
      [1641618000000, 50, 50],
      [1641704400000, 400, 400],
    ]);

    expect(FindMaxProfit(prices).transactions[0]).toEqual({
      action: "ACHAT",
      company: "GOOGLE",
      date: "08/01/2022",
      numShares: 2000,
      portfolioAmount: 0,
      total: 100000,
      unitPrice: 50,
    });

    expect(FindMaxProfit(prices).transactions[1]).toEqual({
      action: "VENTE",
      company: "GOOGLE",
      date: "09/01/2022",
      numShares: 2000,
      portfolioAmount: 800000,
      total: 800000,
      unitPrice: 400,
    });
  });

  it("should pass 2", () => {
    const prices = StockPricesBuilder("GOOGLE", [
      [1641186000000, 600, 600],
      [1641272400000, 110, 110],
      [1641358800000, 167, 164],
      [1641445200000, 410, 410],
      [1641531600000, 200, 200],
      [1641618000000, 50, 50],
      [1641704400000, 400, 400],
    ]);

    expect(FindMaxProfit(prices).transactions[0]).not.toEqual({
      date: "06/01/2022",
      action: "VENTE",
      name: "AMAZON",
      numShares: 2000,
      portfolioAmount: 0,
      total: 100000,
      unitPrice: 50,
    });

    expect(FindMaxProfit(prices).transactions[1]).not.toEqual({
      date: "06/01/2022",
      action: "ACHAT",
      name: "GOOGLE",
      numShares: 2400,
      portfolioAmount: 80500,
      total: 40,
      unitPrice: 400,
    });
  });
});
