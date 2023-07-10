import { Transaction, Stocks, TransactionType } from "../../index.types";
import Decision from "../Decision/Decision";
import DateHelper from "../Utilities/DateHelper";
import MathHelper from "../Utilities/MathHelper";

class Ledger {
  private entries: Transaction[] = [];

  addEntry(
    date: number,
    action: TransactionType,
    share: Stocks,
    numShares: number,
    unitPrice: number,
    portfolioAmount: number
  ) {
    Decision.testIfValid(action, share, numShares, unitPrice);

    if (portfolioAmount < 0) {
      throw new Error("Portfolio amount cannot be negative");
    }

    this.entries.push({
      date: DateHelper.format(date),
      action,
      name: share,
      numShares,
      unitPrice: MathHelper.roundToTwo(unitPrice),
      total: MathHelper.roundToTwo(numShares * unitPrice),
      portfolioAmount: MathHelper.roundToTwo(portfolioAmount),
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
    const entriesDeepCopy = JSON.parse(JSON.stringify(this.entries));
    return entriesDeepCopy;
  }
}

export default Ledger;
