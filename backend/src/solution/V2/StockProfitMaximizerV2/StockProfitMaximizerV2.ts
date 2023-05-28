import { DailySharePrices } from "../../../index.types";

import LocalMinMaxFilter from "../LocalMinMaxFilter/LocalMinMaxFilter";

import OutcomesGenerator from "../OutcomesGenerator/OutcomesGenerator";
import PorfoliosPool from "../PorfoliosPool/PorfoliosPool";

class DecisionsEnumerator {
  public static findMaxProfit(
    googlePrices: DailySharePrices[],
    amazonPrices: DailySharePrices[]
  ) {
    const filteredDatapoints = LocalMinMaxFilter.filter(
      googlePrices,
      amazonPrices
    );

    const finalDayPortfolios = new PorfoliosPool();

    for (let i = 0; i < filteredDatapoints.length; i += 1) {
      const dataPoint = filteredDatapoints[i];
      const portfolios = finalDayPortfolios.getPortfolios();

      for (let j = 0; j < portfolios.length; j += 1) {
        const outcoms = OutcomesGenerator.from(portfolios[j], dataPoint);

        finalDayPortfolios.push(outcoms);
      }
    }

    const finalPortfolios = finalDayPortfolios.getPortfolios();
    let maxPortfolio = finalPortfolios[0];

    for (let i = 0; i < finalPortfolios.length; i += 1) {
      const portfolio = finalPortfolios[i];
      portfolio.sellAllShares(
        filteredDatapoints[filteredDatapoints.length - 1].prices.GOOGLE
          .sellPrice,
        filteredDatapoints[filteredDatapoints.length - 1].prices.AMAZON
          .sellPrice,
        filteredDatapoints[filteredDatapoints.length - 1].date
      );
      if (portfolio.getProfit() > maxPortfolio.getProfit()) {
        maxPortfolio = portfolio;
      }
    }

    return {
      profit: maxPortfolio.getProfit(),
      transactions: maxPortfolio.entries,
    };
  }
}

export default DecisionsEnumerator;
