import { TransactionCompany } from "../../../index.types";
import Decision from "../Decision/Decision";

class Portfolio {
  private cash: number = 100000;

  private shares: { GOOGLE: number; AMAZON: number } = {
    GOOGLE: 0,
    AMAZON: 0,
  };

  addCash(amount: number) {
    if (amount < 0) {
      throw new Error("Cannot add negative amount of cash");
    }
    this.cash += amount;
  }

  withdrawCash(amount: number) {
    if (amount > this.cash) {
      throw new Error(`Not enough cash to withdraw ${amount}`);
    }
    this.cash -= amount;
  }

  buyShares(name: TransactionCompany, numShares: number, unitPrice: number) {
    Decision.testIfValid("ACHAT", name, numShares, unitPrice);

    const total = numShares * unitPrice;
    this.withdrawCash(total);
    this.shares[name] = (this.shares[name] || 0) + numShares;
  }

  sellShares(name: TransactionCompany, numShares: number, unitPrice: number) {
    Decision.testIfValid("VENTE", name, numShares, unitPrice);

    const total = numShares * unitPrice;
    if (this.shares[name] < numShares) {
      throw new Error(`Not enough shares to sell ${numShares}`);
    }
    this.addCash(total);
    this.shares[name] -= numShares;
  }

  get cashAmount() {
    return this.cash;
  }

  get googleShares() {
    return this.shares.GOOGLE;
  }

  get amazonShares() {
    return this.shares.AMAZON;
  }
}

export default Portfolio;
