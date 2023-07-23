import { Transaction, TransactionType } from "../../../index.types";
import DateHelper from "../DateHelper/DateHelper";
import MathHelper from "../MathHelper/MathHelper";
import Config from "../../../config";
import { DailyStockPrice } from "../../../Types/Model.types";

export default class TransactionsBuilder {
  static build(
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

  static buildBuyTransaction(
    company: string,
    date: number,
    price: number,
    numShares: number,
    portfolioAmount: number
  ): Transaction {
    return this.build(
      company,
      date,
      "ACHAT",
      price,
      numShares,
      portfolioAmount
    );
  }

  static buildSellTransaction(
    company: string,
    date: number,
    price: number,
    numShares: number,
    portfolioAmount: number
  ): Transaction {
    return this.build(
      company,
      date,
      "VENTE",
      price,
      numShares,
      portfolioAmount
    );
  }

  static buildOptimalSolution(
    buyPrices: DailyStockPrice,
    sellPrices: DailyStockPrice
  ): [Transaction, Transaction] {
    const { InitialInvestment } = Config;

    const { company, date: buyDate, lowestPrice } = buyPrices;
    const { date: sellDate, highestPrice } = sellPrices;
    const numShares = Math.floor(InitialInvestment / buyPrices.lowestPrice);

    const buyTransaction = this.buildBuyTransaction(
      company,
      buyDate,
      lowestPrice,
      numShares,
      InitialInvestment
    );

    const sellTransaction = this.buildSellTransaction(
      company,
      sellDate,
      highestPrice,
      numShares,
      InitialInvestment - numShares * buyPrices.lowestPrice
    );

    return [buyTransaction, sellTransaction];
  }
}
