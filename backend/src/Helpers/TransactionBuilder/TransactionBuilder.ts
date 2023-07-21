import { Transaction, TransactionType } from "../../index.types";
import DateHelper from "../DateHelper/DateHelper";
import MathHelper from "../MathHelper/MathHelper";

export default function TransactionBuilder(
  company: string,
  date: number,
  action: TransactionType,
  price: number,
  numShares: number,
  portfolioAmount: number
): Transaction {
  const total = numShares * price;

  return {
    date: DateHelper.format(date),
    action,
    company,
    numShares,
    unitPrice: MathHelper.roundToTwo(price),
    total: MathHelper.roundToTwo(total),
    portfolioAmount: MathHelper.roundToTwo(
      portfolioAmount + (action === "ACHAT" ? -1 : 1) * total
    ),
  };
}
