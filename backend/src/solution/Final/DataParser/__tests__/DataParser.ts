// WARNING: the order of the expected objects is very important up the the keys of the objects
// if we keep comparing with JSON.stringify
// We could do a deep equality but it would take more time

import { DailyStockPrices } from "../../../../index.types";
import DataParser from "../DataParser";

it("should given google and amazon daily prices return the local min max and possible actions following the rules", () => {
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
      highestPriceOfTheDay: 110,
      lowestPriceOfTheDay: 90,
      timestamp: 1641272400000,
      n: 216278,
    },
    {
      v: 6.430272e7,
      vw: 165.6015,
      o: 166.883,
      c: 164.357,
      highestPriceOfTheDay: 150,
      lowestPriceOfTheDay: 150,
      timestamp: 1641358800000,
      n: 209498,
    },
    {
      v: 6.430272e7,
      vw: 165.6015,
      o: 166.883,
      c: 164.357,
      highestPriceOfTheDay: 180,
      lowestPriceOfTheDay: 154,
      timestamp: 1641360000000,
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
      v: 7.072516e7,
      vw: 167.9275,
      o: 170.438,
      c: 167.522,
      highestPriceOfTheDay: 50,
      lowestPriceOfTheDay: 50,
      timestamp: 1641358800000,
      n: 216278,
    },
    {
      v: 6.430272e7,
      vw: 165.6015,
      o: 166.883,
      c: 164.357,
      highestPriceOfTheDay: 300,
      lowestPriceOfTheDay: 300,
      timestamp: 1641360000000,
      n: 209498,
    },
  ];

  const expected = [
    {
      date: 1641186000000,
      prices: {
        GOOGLE: { buyPrice: 100, sellPrice: 100 },
        AMAZON: { buyPrice: 100, sellPrice: 100 },
      },
    },
    {
      date: 1641272400000,
      prices: {
        GOOGLE: { buyPrice: 200, sellPrice: 200 },
        AMAZON: { buyPrice: 90, sellPrice: 110 },
      },
    },
    {
      date: 1641358800000,
      prices: {
        GOOGLE: { buyPrice: 50, sellPrice: 50 },
        AMAZON: { buyPrice: 150, sellPrice: 150 },
      },
    },
    {
      date: 1641360000000,
      prices: {
        GOOGLE: { buyPrice: 300, sellPrice: 300 },
        AMAZON: { buyPrice: 154, sellPrice: 180 },
      },
    },
  ];

  const result = DataParser.buildDataPoints(googleStocks1, amazonStocks1);

  expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
});

it("should throw an error if the stocks are not of the same length", () => {
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
  ];

  const googleStocks1: DailyStockPrices[] = [];

  expect(() =>
    DataParser.buildDataPoints(googleStocks1, amazonStocks1)
  ).toThrowError("Stocks must have the same length");
});

it("should throw an error if the stocks length are inferior to 2", () => {
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
  ];

  expect(() =>
    DataParser.buildDataPoints(googleStocks1, amazonStocks1)
  ).toThrowError("Stocks must have at least 2 data points");
});
