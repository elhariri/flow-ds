import StockPricesBuilder from "../../StockPricesBuilder/StockPricesBuilder";
import TransactionsBuilder from "../TransactionsBuilder";

describe("TransactionsBuilder - Build Optimal Solution", () => {
  it("should calculate correct transactions for a single buy and sell", () => {
    const buyPrices = StockPricesBuilder.buildPoint(
      "GOOGLE",
      1641186000000,
      110,
      110
    );
    const sellPrices = StockPricesBuilder.buildPoint(
      "GOOGLE",
      1641272400000,
      600,
      600
    );

    const transactions = TransactionsBuilder.buildOptimalSolution(
      buyPrices,
      sellPrices
    );

    expect(transactions[0]).toEqual({
      date: "03/01/2022",
      action: "ACHAT",
      company: "GOOGLE",
      numShares: 909,
      unitPrice: 110,
      total: 99990,
      portfolioAmount: 10,
    });

    expect(transactions[1]).toEqual({
      date: "04/01/2022",
      action: "VENTE",
      company: "GOOGLE",
      numShares: 909,
      portfolioAmount: 545410,
      total: 545400,
      unitPrice: 600,
    });
  });
});
