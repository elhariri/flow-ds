import Config from "../../../config";
import { TransactionCompany } from "../../../index.types";
import Decision from "../Decision/Decision";
import Ledger from "../Ledger/Leger";
import { SharesState } from "./Porfolio.types";

class Portfolio {
  private cash: number;

  private shares: SharesState;

  private ledger: Ledger;

  constructor(
    amount: number = Config.InitialInvestment,
    shares: SharesState = {
      GOOGLE: 0,
      AMAZON: 0,
    },
    ledger: Ledger = new Ledger()
  ) {
    this.cash = amount;
    this.shares = shares;
    this.ledger = ledger;
  }

  addCash(amount: number) {
    if (amount < 0) {
      throw new Error("Cannot add negative amount of cash");
    }
    this.cash += amount;
  }

  withdrawCash(amount: number): void {
    if (amount > this.cash) {
      throw new Error(`Not enough cash to withdraw ${amount}`);
    }
    this.cash -= amount;
  }

  buyShares(
    name: TransactionCompany,
    numShares: number,
    unitPrice: number,
    date: number
  ): void {
    Decision.testIfValid("ACHAT", name, numShares, unitPrice);

    const total = numShares * unitPrice;
    this.withdrawCash(total);

    this.shares[name] += numShares;

    this.ledger.addEntry(
      date,
      "ACHAT",
      name,
      numShares,
      unitPrice,
      this.cashAmount
    );
  }

  sellShares(
    name: TransactionCompany,
    numShares: number,
    unitPrice: number,
    date: number
  ): void {
    Decision.testIfValid("VENTE", name, numShares, unitPrice);

    if (this.shares[name] < numShares) {
      throw new Error(`Not enough shares to sell ${numShares}`);
    }

    const total = numShares * unitPrice;
    this.addCash(total);

    this.shares[name] -= numShares;

    this.ledger.addEntry(
      date,
      "VENTE",
      name,
      numShares,
      unitPrice,
      this.cashAmount
    );
  }

  sellAllShares(
    googleSellPrice: number,
    amazonSellPrice: number,
    date: number
  ) {
    if (this.googleShares > 0) {
      this.sellShares("GOOGLE", this.googleShares, googleSellPrice, date);
    }
    if (this.amazonShares > 0) {
      this.sellShares("AMAZON", this.amazonShares, amazonSellPrice, date);
    }
  }

  getProfit(): number {
    return this.cashAmount - Config.InitialInvestment;
  }

  clone(): Portfolio {
    const sharesDeepCopy = JSON.parse(JSON.stringify(this.shares));
    const ledgerDeepCopy = this.ledger.clone();

    return new Portfolio(this.cash, sharesDeepCopy, ledgerDeepCopy);
  }

  get cashAmount(): number {
    return this.cash;
  }

  get googleShares(): number {
    return this.shares.GOOGLE;
  }

  get amazonShares(): number {
    return this.shares.AMAZON;
  }

  get totalShares(): { GOOGLE: number; AMAZON: number } {
    return JSON.parse(JSON.stringify(this.shares));
  }

  get entries() {
    return this.ledger.allEntries;
  }
}

export default Portfolio;
