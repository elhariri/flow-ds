import { TransactionCompany, TransactionType } from "../../../index.types";

class Action {
  static testIfValid(
    type: TransactionType,
    name: TransactionCompany,

    numShares: number,
    unitPrice: number
  ) {
    if (type !== "ACHAT" && type !== "VENTE") {
      throw new Error("Invalid transaction type");
    }

    if (name !== "GOOGLE" && name !== "AMAZON") {
      throw new Error("Invalid share name");
    }

    const englishType = type === "ACHAT" ? "buy" : "sell";

    if (numShares < 0) {
      throw new Error(`Cannot ${englishType} negative number of shares`);
    }

    if (unitPrice < 0) {
      throw new Error(`Cannot ${englishType} shares at a negative price`);
    }

    if (!Number.isInteger(numShares)) {
      throw new Error(`Cannot ${englishType} a fractional number of shares`);
    }
  }
}

export default Action;
