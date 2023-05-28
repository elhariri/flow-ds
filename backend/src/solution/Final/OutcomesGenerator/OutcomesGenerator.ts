import Portfolio from "../../Shared/Portfolio/Portfolio";
import { Datapoint } from "../index.types";

class OutcomesGenerator {
  static from(portfolios: Portfolio[], dataPoint: Datapoint) {
    const newPortfolios: Portfolio[] = [];

    const {
      date,
      prices: { GOOGLE: googlePrices, AMAZON: amazonPrices },
    } = dataPoint;

    for (let j = 0; j < portfolios.length; j += 1) {
      const portfolio = portfolios[j].clone();

      // TO_DO: Refactor this
      if (portfolio.googleShares > 0 && portfolio.amazonShares > 0) {
        portfolio.sellAllShares(
          googlePrices.sellPrice,
          amazonPrices.sellPrice,
          date
        );
        newPortfolios.push(portfolio);
      } else if (portfolio.amazonShares > 0) {
        portfolio.sellAllOf("AMAZON", amazonPrices.sellPrice, date);

        portfolio.buyMaxShares("GOOGLE", googlePrices.buyPrice, date);

        newPortfolios.push(portfolio);
      } else if (portfolio.googleShares > 0) {
        portfolio.sellAllOf("GOOGLE", googlePrices.sellPrice, date);

        portfolio.buyMaxShares("AMAZON", amazonPrices.buyPrice, date);

        newPortfolios.push(portfolio);
      } else {
        const buyAmazonPortfolio = portfolio.clone();
        const buyGooglePortfolio = portfolio.clone();

        if (
          buyAmazonPortfolio.buyMaxShares("AMAZON", amazonPrices.buyPrice, date)
        ) {
          newPortfolios.push(buyAmazonPortfolio);
        }
        if (
          buyGooglePortfolio.buyMaxShares("GOOGLE", googlePrices.buyPrice, date)
        ) {
          newPortfolios.push(buyGooglePortfolio);
        }
      }
    }

    return newPortfolios;
  }
}

export default OutcomesGenerator;
