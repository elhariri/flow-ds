import { Stocks, TransactionType } from "../../../../../index.types";
import Portfolio from "../../../../Shared/Portfolio/Portfolio";
import DecisionsEnumerator from "../DecisionsEnumerator";
import comparePossibilities from "../testHelper";

// Maybe i should add more use cases

it("should enumerate all possible decisions given the but and sell prices of both shares as well as the current portfolio", () => {
  const portfolio = new Portfolio();

  const prices1 = {
    GOOGLE: {
      buyPrice: 100001,
      sellPrice: 200,
    },
    AMAZON: {
      buyPrice: 100001,
      sellPrice: 200,
    },
  };

  const prices2 = {
    GOOGLE: {
      buyPrice: 100000,
      sellPrice: 200,
    },
    AMAZON: {
      buyPrice: 100001,
      sellPrice: 200,
    },
  };

  const prices3 = {
    GOOGLE: {
      buyPrice: 50000,
      sellPrice: 50000,
    },
    AMAZON: {
      buyPrice: 50000,
      sellPrice: 50000,
    },
  };

  expect(DecisionsEnumerator.possibilitiesFrom(portfolio, prices1)).toEqual([]);

  expect(DecisionsEnumerator.possibilitiesFrom(portfolio, prices2)).toEqual([
    [
      {
        type: "ACHAT",
        share: "GOOGLE",
        amount: 1,
      },
    ],
  ]);

  const possibilities3 = DecisionsEnumerator.possibilitiesFrom(
    portfolio,
    prices3
  );
  const expectedResult3 = [
    [
      {
        type: "ACHAT",
        share: "GOOGLE",
        amount: 1,
      },
    ],

    [
      {
        type: "ACHAT",
        share: "AMAZON",
        amount: 1,
      },
    ],

    [
      {
        type: "ACHAT",
        share: "GOOGLE",
        amount: 1,
      },
      {
        type: "ACHAT",
        share: "AMAZON",
        amount: 1,
      },
    ],
    [
      {
        type: "ACHAT",
        share: "AMAZON",
        amount: 2,
      },
    ],
    [
      {
        type: "ACHAT",
        share: "GOOGLE",
        amount: 2,
      },
    ],
  ];

  expect(possibilities3).toEqual(expect.arrayContaining(expectedResult3));
  expect(possibilities3.length).toEqual(expectedResult3.length);

  portfolio.buyShares("GOOGLE", 1, prices3.GOOGLE.buyPrice, 1234);

  const possibilities4 = DecisionsEnumerator.possibilitiesFrom(
    portfolio,
    prices3
  );
  const expectedResult4: {
    type: TransactionType;
    share: Stocks;
    amount: number;
  }[][] = [
    [
      {
        type: "ACHAT",
        share: "GOOGLE",
        amount: 1,
      },
    ],

    [
      {
        type: "ACHAT",
        share: "AMAZON",
        amount: 1,
      },
    ],
    [
      {
        type: "VENTE",
        share: "GOOGLE",
        amount: 1,
      },
      {
        type: "ACHAT",
        share: "AMAZON",
        amount: 2,
      },
    ],
    [
      {
        type: "VENTE",
        share: "GOOGLE",
        amount: 1,
      },
      {
        type: "ACHAT",
        share: "AMAZON",
        amount: 1,
      },
    ],
    [
      {
        type: "VENTE",
        share: "GOOGLE",
        amount: 1,
      },
    ],
  ];

  expect(comparePossibilities(possibilities4, expectedResult4)).toEqual(true);
  expect(possibilities4.length).toEqual(expectedResult4.length);

  portfolio.buyShares("AMAZON", 1, prices3.GOOGLE.buyPrice, 1234);

  const possibilities5 = DecisionsEnumerator.possibilitiesFrom(
    portfolio,
    prices3
  );
  const expectedResult5: {
    type: TransactionType;
    share: Stocks;
    amount: number;
  }[][] = [
    [
      {
        type: "VENTE",
        share: "GOOGLE",
        amount: 1,
      },
      {
        type: "ACHAT",
        share: "AMAZON",
        amount: 1,
      },
    ],
    [
      {
        type: "VENTE",
        share: "AMAZON",
        amount: 1,
      },
      {
        type: "ACHAT",
        share: "GOOGLE",
        amount: 1,
      },
    ],
    [
      {
        type: "VENTE",
        share: "GOOGLE",
        amount: 1,
      },
    ],

    [
      {
        type: "VENTE",
        share: "AMAZON",
        amount: 1,
      },
    ],

    [
      {
        type: "VENTE",
        share: "GOOGLE",
        amount: 1,
      },

      {
        type: "VENTE",
        share: "AMAZON",
        amount: 1,
      },
    ],
  ];

  expect(comparePossibilities(possibilities5, expectedResult5)).toEqual(true);
  expect(possibilities5.length).toEqual(expectedResult5.length);
});
