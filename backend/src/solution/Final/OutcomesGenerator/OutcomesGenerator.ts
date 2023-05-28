import Config from "../../../config";
import { Stocks } from "../../../index.types";
import Portfolio from "../../Shared/Portfolio/Portfolio";
import { Datapoint } from "../index.types";

class OutcomesGenerator {
  private static sellStock(
    portfolio: Portfolio,
    share: Stocks,
    shareToBuy: Stocks,
    date: number,
    sellPrice: number,
    buyPrice: number
  ) {
    portfolio.sellAllOf(share, sellPrice, date);

    portfolio.buyMaxShares(shareToBuy, buyPrice, date);
  }

  static from(portfolios: Portfolio[], dataPoint: Datapoint) {
    const newPortfolios: Portfolio[] = [];

    const { date } = dataPoint;

    for (let j = 0; j < portfolios.length; j += 1) {
      const portfolio = portfolios[j].clone();

      const portfolioTotalShares =
        portfolio.amazonShares + portfolio.googleShares;

      if (portfolioTotalShares > 0) {
        for (let i = 0; i < Config.Stocks.length; i += 1) {
          const stock = Config.Stocks[i];

          if (portfolio.totalShares[stock] > 0) {
            const { sellPrice } = dataPoint.prices[stock];

            const leftStocks = Config.Stocks.filter(
              (currStock) => currStock !== stock
            );

            for (let k = 0; k < leftStocks.length; k += 1) {
              const leftStock = leftStocks[k];
              const stockPortfolio = portfolio.clone();
              const { buyPrice } = dataPoint.prices[leftStock];

              this.sellStock(
                stockPortfolio,
                stock,
                leftStock,
                date,
                sellPrice,
                buyPrice
              );

              newPortfolios.push(stockPortfolio);
            }
          }
        }
      } else {
        for (let i = 0; i < Config.Stocks.length; i += 1) {
          const stock = Config.Stocks[i];
          const stockPortfolio = portfolio.clone();
          const { buyPrice } = dataPoint.prices[stock];

          const boughtStock = stockPortfolio.buyMaxShares(
            stock,
            buyPrice,
            date
          );

          if (boughtStock) {
            newPortfolios.push(stockPortfolio);
          }
        }
      }
    }

    return newPortfolios;
  }
}

export default OutcomesGenerator;
