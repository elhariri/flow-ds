// WARNING: the order of the expected objects is very important up the the keys of the objects
// if we keep comparing with JSON.stringify
// We could do a deep equality but it would take more time

import { DailyStockPrices } from "../../../../index.types";
import LocalMinMaxFilter from "../LocalMinMaxFilter";

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
      GOOGLE: [{ action: "ACHAT", price: 100 }],
      AMAZON: [{ action: "ACHAT", price: 100 }],
    },
    {
      date: 1641272400000,
      GOOGLE: [{ action: "VENTE", price: 200 }],
      AMAZON: [{ action: "ACHAT", price: 90 }],
    },
    {
      date: 1641358800000,
      GOOGLE: [{ action: "ACHAT", price: 50 }],
      AMAZON: [
        { action: "ACHAT", price: 150 },
        { action: "VENTE", price: 150 },
      ],
    },
    {
      date: 1641360000000,
      GOOGLE: [{ action: "VENTE", price: 300 }],
      AMAZON: [{ action: "VENTE", price: 180 }],
    },
  ];

  const result = LocalMinMaxFilter.filter(googleStocks1, amazonStocks1);

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
    LocalMinMaxFilter.filter(googleStocks1, amazonStocks1)
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
    LocalMinMaxFilter.filter(googleStocks1, amazonStocks1)
  ).toThrowError("Stocks must have at least 2 data points");
});
