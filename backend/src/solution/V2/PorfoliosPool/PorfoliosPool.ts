import Config from "../../../config";
import Portfolio from "../../Shared/Portfolio/Portfolio";
import { PoolState } from "./PortfoliosPool.types";

class PorfoliosPool {
  private state: PoolState;

  constructor() {
    this.state = {
      cash: new Portfolio(Config.InitialInvestment),
    };
  }

  push(portfolios: Portfolio[]) {
    if (portfolios.length === 0) {
      return;
    }

    for (let i = 0; i < portfolios.length; i += 1) {
      const currentPortfolio = portfolios[i];

      let hasActions = false;

      for (let j = 0; j < Config.Stocks.length; j += 1) {
        const stock = Config.Stocks[j];

        if (currentPortfolio.totalShares[stock] > 0) {
          const stockState = this.state[stock];
          if (
            stockState === undefined ||
            stockState.totalShares[stock] <= currentPortfolio.totalShares[stock]
          ) {
            this.state[stock] = currentPortfolio;
          } else if (
            stockState.totalShares[stock] ===
            currentPortfolio.totalShares[stock]
          ) {
            if (currentPortfolio.cashAmount > stockState.cashAmount) {
              this.state[stock] = currentPortfolio;
            }
          }

          hasActions = true;
        }
      }

      if (
        !hasActions &&
        currentPortfolio.cashAmount > this.state.cash.cashAmount
      ) {
        this.state.cash = currentPortfolio;
      }
    }
  }

  getPortfolios() {
    return Object.values(this.state);
  }
}

export default PorfoliosPool;
