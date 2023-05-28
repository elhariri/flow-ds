import Portfolio from "../../../../Shared/Portfolio/Portfolio";
import { Datapoint } from "../../index.types";
import OutcomesGenerator from "../OutcomesGenerator";

it("should always sell any stock that has a possibility of selling", () => {
  const portfolio = new Portfolio();

  portfolio.buyShares("GOOGLE", 1, 100, 0);
  portfolio.buyShares("AMAZON", 1, 100, 0);

  const dataPoint: Datapoint = {
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
      GOOGLE: ["VENTE"],
      AMAZON: ["VENTE"],
    },
  };

  const newOutcomes = OutcomesGenerator.from(portfolio, dataPoint);

  expect(newOutcomes.length).toEqual(1);

  for (let i = 0; i < newOutcomes.length; i += 1) {
    const outcomePortfolio = newOutcomes[i];
    expect(outcomePortfolio.googleShares).toEqual(0);
    expect(outcomePortfolio.amazonShares).toEqual(0);
  }
});

it("should sell the other stock before buying the other one", () => {
  const portfolio = new Portfolio();

  portfolio.buyShares("GOOGLE", 1, 100, 0);

  const dataPoint: Datapoint = {
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
      GOOGLE: [],
      AMAZON: ["ACHAT"],
    },
  };

  const newOutcomes = OutcomesGenerator.from(portfolio, dataPoint);

  expect(newOutcomes.length).not.toEqual(0);
  expect(newOutcomes.length).toEqual(2);

  let hasPortfolioWithNoGoogle = false;

  for (let i = 0; i < newOutcomes.length; i += 1) {
    const outcomePortfolio = newOutcomes[i];
    if (outcomePortfolio.googleShares === 0) {
      hasPortfolioWithNoGoogle = true;
    }
  }

  expect(hasPortfolioWithNoGoogle).toEqual(true);
});

it("should try buying each stock exclusively when it is possbile to buy them at the same time", () => {
  const portfolio = new Portfolio();

  const dataPoint: Datapoint = {
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
  };

  const newOutcomes = OutcomesGenerator.from(portfolio, dataPoint);

  expect(newOutcomes.length).toEqual(3);

  let hasPortfolioWithOnlyGoogle = false;
  let hasPortfolioWithOnlyAmazon = false;
  let hasPortfolioWithNeither = false;

  for (let i = 0; i < newOutcomes.length; i += 1) {
    const outcomePortfolio = newOutcomes[i];
    if (
      outcomePortfolio.googleShares > 0 &&
      outcomePortfolio.amazonShares === 0
    ) {
      hasPortfolioWithOnlyGoogle = true;
    } else if (
      outcomePortfolio.amazonShares > 0 &&
      outcomePortfolio.googleShares === 0
    ) {
      hasPortfolioWithOnlyAmazon = true;
    } else if (
      outcomePortfolio.googleShares === 0 &&
      outcomePortfolio.amazonShares === 0
    ) {
      hasPortfolioWithNeither = true;
    }
  }

  expect(hasPortfolioWithOnlyGoogle).toEqual(true);
  expect(hasPortfolioWithOnlyAmazon).toEqual(true);
  expect(hasPortfolioWithNeither).toEqual(true);
});

it("should try buying each stock exclusively when a sell has occured and no buying is possible", () => {
  const portfolio = new Portfolio();

  portfolio.buyShares("AMAZON", 1, 100, 0);

  const dataPoint: Datapoint = {
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
      GOOGLE: [],
      AMAZON: ["VENTE"],
    },
  };

  const newOutcomes = OutcomesGenerator.from(portfolio, dataPoint);

  expect(newOutcomes.length).toEqual(2);
});
