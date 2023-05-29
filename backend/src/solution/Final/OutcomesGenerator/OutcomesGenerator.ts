import { Stocks } from "../../../index.types";
import Portfolio from "../../Shared/Portfolio/Portfolio";
import { Datapoint } from "../DataParser/DataParser.types";

class OutcomesGenerator {
  private static sellStock(
    portfolio: Portfolio,
    stock: Stocks,

    dataPoint: Datapoint
  ) {
    const { prices, date } = dataPoint;
    const stockToBuy: Stocks = stock === "AMAZON" ? "GOOGLE" : "AMAZON";

    portfolio.sellAllOf(stock, prices[stock].sellPrice, date);

    portfolio.buyMaxShares(stockToBuy, prices[stockToBuy].buyPrice, date);
  }

  private static buyMaxSharesAndPushOutcome(
    portfolio: Portfolio,
    stock: Stocks,
    dataPoint: Datapoint,
    newPortfolios: Portfolio[]
  ) {
    const outcomePortfolio = portfolio.clone();
    const { prices, date } = dataPoint;

    const boughtStock = outcomePortfolio.buyMaxShares(
      stock,
      prices[stock].buyPrice,
      date
    );

    if (boughtStock) {
      newPortfolios.push(outcomePortfolio);
    }
  }

  private static handleBuyScenario(
    portfolio: Portfolio,
    dataPoint: Datapoint,
    newPortfolios: Portfolio[]
  ) {
    this.buyMaxSharesAndPushOutcome(
      portfolio,
      "AMAZON",
      dataPoint,
      newPortfolios
    );
    this.buyMaxSharesAndPushOutcome(
      portfolio,
      "GOOGLE",
      dataPoint,
      newPortfolios
    );
  }

  private static handleSellScenario(
    portfolio: Portfolio,
    dataPoint: Datapoint,
    newPortfolios: Portfolio[]
  ) {
    const stock = portfolio.amazonShares > 0 ? "AMAZON" : "GOOGLE";

    this.sellStock(portfolio, stock, dataPoint);

    newPortfolios.push(portfolio);
  }

  static from(portfolios: Portfolio[], dataPoint: Datapoint) {
    const newPortfolios: Portfolio[] = [];

    for (let j = 0; j < portfolios.length; j += 1) {
      const portfolio = portfolios[j].clone();

      if (portfolio.googleShares + portfolio.amazonShares > 0) {
        this.handleSellScenario(portfolio, dataPoint, newPortfolios);
      } else {
        this.handleBuyScenario(portfolio, dataPoint, newPortfolios);
      }
    }

    return newPortfolios;
  }
}

export default OutcomesGenerator;
