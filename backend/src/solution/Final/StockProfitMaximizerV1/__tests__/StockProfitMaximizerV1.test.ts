// import AmazonStockPrices from "../../../../data/AmazonStockPrices.json";
// import GoogleStockPrices from "../../../../data/GoogleStockPrices.json";

import Config from "../../../../config";
import StockProfitMaximizer from "../StockProfitMaximizer";

// @ts-ignore
Config.InitialInvestment = 100;

it("should pass 1", () => {
  const amazonStocks1 = [
    {
      v: 6.386914e7,
      vw: 169.4552,
      o: 167.55,
      c: 170.4045,
      highestPriceOfTheDay: 100,
      lowestPriceOfTheDay: 100,
      timestamp: 1641186000000,
      n: 187695,
    },
    {
      v: 7.072516e7,
      vw: 167.9275,
      o: 170.438,
      c: 167.522,
      highestPriceOfTheDay: 100,
      lowestPriceOfTheDay: 100,
      timestamp: 1641272400000,
      n: 216278,
    },
    {
      v: 6.430272e7,
      vw: 165.6015,
      o: 166.883,
      c: 164.357,
      highestPriceOfTheDay: 100,
      lowestPriceOfTheDay: 100,
      timestamp: 1641358800000,
      n: 209498,
    },
  ];

  const googleStocks1 = [
    {
      v: 6.386914e7,
      vw: 169.4552,
      o: 167.55,
      c: 170.4045,
      highestPriceOfTheDay: 100,
      lowestPriceOfTheDay: 100,
      timestamp: 1641186000000,
      n: 187695,
    },
    {
      v: 7.072516e7,
      vw: 167.9275,
      o: 170.438,
      c: 167.522,
      highestPriceOfTheDay: 200,
      lowestPriceOfTheDay: 200,
      timestamp: 1641272400000,
      n: 216278,
    },
    {
      v: 6.430272e7,
      vw: 165.6015,
      o: 166.883,
      c: 164.357,
      highestPriceOfTheDay: 300,
      lowestPriceOfTheDay: 300,
      timestamp: 1641358800000,
      n: 209498,
    },
  ];

  expect(
    StockProfitMaximizer.findMaxProfit(googleStocks1, amazonStocks1).profit
  ).toBe(100);
});

it("should pass 2", () => {
  const amazonStocks1 = [
    {
      v: 6.386914e7,
      vw: 169.4552,
      o: 167.55,
      c: 170.4045,
      highestPriceOfTheDay: 100,
      lowestPriceOfTheDay: 100,
      timestamp: 0,
      n: 187695,
    },
    {
      v: 7.072516e7,
      vw: 167.9275,
      o: 170.438,
      c: 167.522,
      highestPriceOfTheDay: 110,
      lowestPriceOfTheDay: 110,
      timestamp: 1,
      n: 216278,
    },
    {
      v: 6.430272e7,
      vw: 165.6015,
      o: 166.883,
      c: 164.357,
      highestPriceOfTheDay: 150,
      lowestPriceOfTheDay: 150,
      timestamp: 2,
      n: 209498,
    },
    {
      v: 6.430272e7,
      vw: 165.6015,
      o: 166.883,
      c: 164.357,
      highestPriceOfTheDay: 200,
      lowestPriceOfTheDay: 150,
      timestamp: 3,
      n: 209498,
    },
  ];

  const googleStocks1 = [
    {
      v: 6.386914e7,
      vw: 169.4552,
      o: 167.55,
      c: 170.4045,
      highestPriceOfTheDay: 100,
      lowestPriceOfTheDay: 100,
      timestamp: 0,
      n: 187695,
    },
    {
      v: 7.072516e7,
      vw: 167.9275,
      o: 170.438,
      c: 167.522,
      highestPriceOfTheDay: 200,
      lowestPriceOfTheDay: 200,
      timestamp: 1,
      n: 216278,
    },
    {
      v: 7.072516e7,
      vw: 167.9275,
      o: 170.438,
      c: 167.522,
      highestPriceOfTheDay: 50,
      lowestPriceOfTheDay: 50,
      timestamp: 2,
      n: 216278,
    },
    {
      v: 6.430272e7,
      vw: 165.6015,
      o: 166.883,
      c: 164.357,
      highestPriceOfTheDay: 300,
      lowestPriceOfTheDay: 300,
      timestamp: 3,
      n: 209498,
    },
  ];
  const result = StockProfitMaximizer.findMaxProfit(
    googleStocks1,
    amazonStocks1
  );

  expect(result.profit).toBe(1140);
});

it("should pass 3", () => {
  const amazonStocks1 = [
    {
      v: 6.386914e7,
      vw: 169.4552,
      o: 167.55,
      c: 170.4045,
      highestPriceOfTheDay: 100,
      lowestPriceOfTheDay: 100,
      timestamp: 0,
      n: 187695,
    },
    {
      v: 7.072516e7,
      vw: 167.9275,
      o: 170.438,
      c: 167.522,
      highestPriceOfTheDay: 110,
      lowestPriceOfTheDay: 110,
      timestamp: 1,
      n: 216278,
    },
    {
      v: 6.430272e7,
      vw: 165.6015,
      o: 166.883,
      c: 164.357,
      highestPriceOfTheDay: 150,
      lowestPriceOfTheDay: 150,
      timestamp: 2,
      n: 209498,
    },
    {
      v: 6.386914e7,
      vw: 169.4552,
      o: 167.55,
      c: 170.4045,
      highestPriceOfTheDay: 100,
      lowestPriceOfTheDay: 100,
      timestamp: 3,
      n: 187695,
    },
    {
      v: 7.072516e7,
      vw: 167.9275,
      o: 170.438,
      c: 167.522,
      highestPriceOfTheDay: 200,
      lowestPriceOfTheDay: 200,
      timestamp: 4,
      n: 216278,
    },
    {
      v: 6.430272e7,
      vw: 165.6015,
      o: 166.883,
      c: 164.357,
      highestPriceOfTheDay: 200,
      lowestPriceOfTheDay: 150,
      timestamp: 5,
      n: 209498,
    },
  ];

  const googleStocks1 = [
    {
      v: 6.386914e7,
      vw: 169.4552,
      o: 167.55,
      c: 170.4045,
      highestPriceOfTheDay: 100,
      lowestPriceOfTheDay: 100,
      timestamp: 0,
      n: 187695,
    },
    {
      v: 7.072516e7,
      vw: 167.9275,
      o: 170.438,
      c: 167.522,
      highestPriceOfTheDay: 200,
      lowestPriceOfTheDay: 200,
      timestamp: 1,
      n: 216278,
    },
    {
      v: 7.072516e7,
      vw: 167.9275,
      o: 170.438,
      c: 167.522,
      highestPriceOfTheDay: 50,
      lowestPriceOfTheDay: 50,
      timestamp: 2,
      n: 216278,
    },
    {
      v: 6.386914e7,
      vw: 169.4552,
      o: 167.55,
      c: 170.4045,
      highestPriceOfTheDay: 100,
      lowestPriceOfTheDay: 100,
      timestamp: 3,
      n: 187695,
    },
    {
      v: 7.072516e7,
      vw: 167.9275,
      o: 170.438,
      c: 167.522,
      highestPriceOfTheDay: 110,
      lowestPriceOfTheDay: 110,
      timestamp: 4,
      n: 216278,
    },
    {
      v: 6.430272e7,
      vw: 165.6015,
      o: 166.883,
      c: 164.357,
      highestPriceOfTheDay: 300,
      lowestPriceOfTheDay: 300,
      timestamp: 5,
      n: 209498,
    },
  ];

  const result = StockProfitMaximizer.findMaxProfit(
    googleStocks1,
    amazonStocks1
  );

  expect(result.profit).toBe(2070);
});
