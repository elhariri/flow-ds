import Portfolio from "../../Shared/Portfolio/Portfolio";
import { DataPoint } from "../LocalMinMaxFilter/LocalMinMaxFilter.types";

class OutcomesGenerator {
  static from(portfolios: Portfolio[], dataPoint: DataPoint) {
    const newPortfolios: Portfolio[] = [];

    const googleDataPoint = dataPoint.GOOGLE || [];
    const amazonDataPoint = dataPoint.AMAZON || [];

    const { date } = dataPoint;

    const canSellGoogle = googleDataPoint.filter(
      (a) => a.action === "VENTE"
    )[0];
    const canSellAmazon = amazonDataPoint.filter(
      (a) => a.action === "VENTE"
    )[0];

    const canBuyGoogle = googleDataPoint.filter((a) => a.action === "ACHAT")[0];
    const canBuyAmazon = amazonDataPoint.filter((a) => a.action === "ACHAT")[0];

    for (let j = 0; j < portfolios.length; j += 1) {
      const portfolio = portfolios[j].clone();

      if (
        canSellGoogle &&
        canSellAmazon &&
        portfolio.googleShares > 0 &&
        portfolio.amazonShares > 0
      ) {
        portfolio.sellAllShares(canSellGoogle.price, canSellAmazon.price, date);
        newPortfolios.push(portfolio);
      } else if (canSellAmazon && portfolio.amazonShares > 0) {
        portfolio.sellAllOf("AMAZON", canSellAmazon.price, date);

        if (canBuyGoogle) {
          portfolio.buyMaxShares("GOOGLE", canBuyGoogle.price, date);
        }

        newPortfolios.push(portfolio);
      } else if (canSellGoogle && portfolio.googleShares > 0) {
        portfolio.sellAllOf("GOOGLE", canSellGoogle.price, date);

        if (canBuyAmazon) {
          portfolio.buyMaxShares("AMAZON", canBuyAmazon.price, date);
        }

        newPortfolios.push(portfolio);
      } else if ((canBuyGoogle || canBuyAmazon) && portfolio.cashAmount > 0) {
        const willBuyBoth = canBuyGoogle && canBuyAmazon;

        if (canBuyAmazon) {
          let portfolioToUse = portfolio;

          if (willBuyBoth) {
            portfolioToUse = portfolio.clone();
          }

          portfolioToUse.buyMaxShares("AMAZON", canBuyAmazon.price, date);

          if (willBuyBoth) {
            newPortfolios.push(portfolioToUse);
          }
        }

        if (canBuyGoogle) {
          portfolio.buyMaxShares("GOOGLE", canBuyGoogle.price, date);
        }

        newPortfolios.push(portfolio);
      }
    }

    return newPortfolios;
  }
}

export default OutcomesGenerator;
