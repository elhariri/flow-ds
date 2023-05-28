import Config from "../../../config";
import { Stocks } from "../../../index.types";
import Portfolio from "../../Shared/Portfolio/Portfolio";
import { Datapoint } from "../index.types";

class OutcomesGenerator {
  private static canBuy(
    portfolio: Portfolio,
    stock: Stocks,
    dataPoint: Datapoint
  ): boolean {
    return (
      dataPoint.possibilities[stock].includes("ACHAT") &&
      portfolio.cashAmount >= dataPoint.prices[stock].buyPrice
    );
  }

  private static shouldSell(
    portfolio: Portfolio,
    stock: Stocks,
    dataPoint: Datapoint
  ): boolean {
    return (
      dataPoint.possibilities[stock].includes("VENTE") &&
      portfolio.totalShares[stock] > 0
    );
  }

  private static sellAllSellableStocks(
    portfolio: Portfolio,
    dataPoint: Datapoint
  ): { outcomePortfolio: Portfolio; selledStocks: Stocks[] } {
    const outcomePortfolio = portfolio.clone();

    const selledStocks: Stocks[] = [];

    for (let i = 0; i < Config.Stocks.length; i += 1) {
      const stock = Config.Stocks[i];

      if (this.shouldSell(portfolio, stock, dataPoint)) {
        outcomePortfolio.sellShares(
          stock,
          portfolio.totalShares[stock],
          dataPoint.prices[stock].sellPrice,
          dataPoint.date
        );
        selledStocks.push(stock);
      }
    }

    return { outcomePortfolio, selledStocks };
  }

  private static findAllBuyableStocks(
    portfolio: Portfolio,
    dataPoint: Datapoint
  ): Stocks[] {
    const buyableStocks: Stocks[] = [];

    for (let i = 0; i < Config.Stocks.length; i += 1) {
      const stock = Config.Stocks[i];

      if (this.canBuy(portfolio, stock, dataPoint)) {
        buyableStocks.push(stock);
      }
    }

    return buyableStocks;
  }

  private static generateOutcomesAfterBuying(
    portfolio: Portfolio,
    dataPoint: Datapoint,
    buyableStocks: Stocks[],
    selledStocks: Stocks[]
  ): Portfolio[] {
    const outcomes: Portfolio[] = [];

    // for each buyable stock we create a new Outcome
    for (let i = 0; i < buyableStocks.length; i += 1) {
      const outcomePortfolio = portfolio.clone();
      const stock = buyableStocks[i];

      // check if we can buy the stock
      if (
        this.canBuy(outcomePortfolio, stock, dataPoint) &&
        !selledStocks.includes(stock)
      ) {
        const buyingPortfolio = outcomePortfolio.clone();
        const otherStock = Config.Stocks.filter(
          (s) => s !== stock && !selledStocks.includes(s)
        );

        // sell all other stocks
        for (let j = 0; j < otherStock.length; j += 1) {
          const otherStockName = otherStock[j];

          if (buyingPortfolio.totalShares[otherStockName] > 0) {
            buyingPortfolio.sellShares(
              otherStockName,
              buyingPortfolio.totalShares[otherStockName],
              dataPoint.prices[otherStockName].buyPrice,
              dataPoint.date
            );
          }
        }

        buyingPortfolio.buyMaxShares(
          stock,
          dataPoint.prices[stock].buyPrice,
          dataPoint.date
        );

        outcomes.push(buyingPortfolio);
      }
    }

    return outcomes;
  }

  static from(portfolio: Portfolio, dataPoint: Datapoint): Portfolio[] {
    const outcomes: Portfolio[] = [];

    const { outcomePortfolio, selledStocks } = this.sellAllSellableStocks(
      portfolio,
      dataPoint
    );

    outcomes.push(outcomePortfolio.clone());

    const buyableStocks = this.findAllBuyableStocks(
      outcomePortfolio,
      dataPoint
    );

    if (buyableStocks.length > 0) {
      const buyingOutcomes = this.generateOutcomesAfterBuying(
        outcomePortfolio,
        dataPoint,
        buyableStocks.filter((stock) => !selledStocks.includes(stock)),
        selledStocks
      );

      buyingOutcomes.forEach((outcome) => {
        outcomes.push(outcome);
      });
    } else if (selledStocks.length > 0) {
      const unselledStocks = Config.Stocks.filter(
        (stock) => !selledStocks.includes(stock)
      );

      // for each unselled stock we create a new Outcome where we bought it
      for (let i = 0; i < unselledStocks.length; i += 1) {
        const stock = unselledStocks[i];

        if (outcomePortfolio.cashAmount > dataPoint.prices[stock].buyPrice) {
          const buyingPortfolio = outcomePortfolio.clone();

          buyingPortfolio.buyMaxShares(
            stock,
            dataPoint.prices[stock].buyPrice,
            dataPoint.date
          );

          outcomes.push(buyingPortfolio);
        }
      }
    }

    return outcomes;
  }
}

export default OutcomesGenerator;
