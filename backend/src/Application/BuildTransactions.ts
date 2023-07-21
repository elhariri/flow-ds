import TransactionBuilder from "../Helpers/TransactionBuilder/TransactionBuilder";
import { DailyStockPrice } from "../Types/Model.types";
import Config from "../config";
import { Transaction } from "../index.types";

export default function BuildTransactions(
  buyPrices: DailyStockPrice,
  sellPrices: DailyStockPrice
): [Transaction, Transaction] {
  const { InitialInvestment } = Config;
  const { company, date: buyDate, lowestPrice } = buyPrices;
  const { date: sellDate, highestPrice } = sellPrices;
  const numShares = Math.floor(InitialInvestment / buyPrices.lowestPrice);

  const buyTransaction = TransactionBuilder(
    company,
    buyDate,
    "ACHAT",
    lowestPrice,
    numShares,
    InitialInvestment
  );

  const sellTransaction = TransactionBuilder(
    company,
    sellDate,
    "VENTE",
    highestPrice,
    numShares,
    InitialInvestment - numShares * buyPrices.lowestPrice
  );

  return [buyTransaction, sellTransaction];
}
