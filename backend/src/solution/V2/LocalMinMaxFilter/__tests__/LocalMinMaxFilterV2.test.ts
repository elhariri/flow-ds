// WARNING: the order of the expected objects is very important up the the keys of the objects
// if we keep comparing with JSON.stringify
// We could do a deep equality but it would take more time

import { Datapoint } from "../../index.types";
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
      timestamp: 0,
      n: 187695,
    },
    {
      v: 7.072516e7,
      vw: 167.9275,
      o: 170.438,
      c: 167.522,
      highestPriceOfTheDay: 110,
      lowestPriceOfTheDay: 90,
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
      highestPriceOfTheDay: 180,
      lowestPriceOfTheDay: 154,
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

  const expected: Datapoint[] = [
    {
      date: 0,
      prices: {
        GOOGLE: {
          buyPrice: 100,
          sellPrice: 100,
        },
        AMAZON: {
          buyPrice: 100,
          sellPrice: 100,
        },
      },
      possibilities: {
        GOOGLE: ["ACHAT"],
        AMAZON: ["ACHAT"],
      },
    },
    {
      date: 1,
      prices: {
        GOOGLE: {
          buyPrice: 200,
          sellPrice: 200,
        },
        AMAZON: {
          buyPrice: 90,
          sellPrice: 110,
        },
      },
      possibilities: {
        GOOGLE: ["VENTE"],
        AMAZON: ["ACHAT"],
      },
    },
    {
      date: 2,
      prices: {
        GOOGLE: {
          buyPrice: 50,
          sellPrice: 50,
        },
        AMAZON: {
          buyPrice: 150,
          sellPrice: 150,
        },
      },
      possibilities: {
        GOOGLE: ["ACHAT"],
        AMAZON: [],
      },
    },
    {
      date: 3,
      prices: {
        GOOGLE: {
          buyPrice: 300,
          sellPrice: 300,
        },

        AMAZON: {
          buyPrice: 154,
          sellPrice: 180,
        },
      },
      possibilities: {
        GOOGLE: ["VENTE"],
        AMAZON: ["VENTE"],
      },
    },
  ];

  const result = LocalMinMaxFilter.filter(googleStocks1, amazonStocks1);

  expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
});
