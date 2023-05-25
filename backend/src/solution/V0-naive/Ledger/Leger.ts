import {
  Transaction,
  TransactionCompany,
  TransactionType,
} from "../../../index.types";
import Decision from "../Decision/Decision";

class Ledger {
  private entries: Transaction[] = [];

  addEntry(
    date: number,
    action: TransactionType,
    share: TransactionCompany,
    numShares: number,
    unitPrice: number,
    portfolioAmount: number
  ) {
    Decision.testIfValid(action, share, numShares, unitPrice);

    if (portfolioAmount < 0) {
      throw new Error("Portfolio amount cannot be negative");
    }

    this.entries.push({
      date: date.toString(),
      action,
      name: share,
      num_shares: numShares,
      unit_price: unitPrice,
      total: numShares * unitPrice,
      portfolio_amount: portfolioAmount,
    });
  }

  addEntries(entries: Transaction[]) {
    this.entries = this.entries.concat(entries);
  }

  clone(): Ledger {
    const clone = new Ledger();
    clone.addEntries(this.allEntries);
    return clone;
  }

  get allEntries(): Transaction[] {
    return JSON.parse(JSON.stringify(this.entries));
  }
}

export default Ledger;
