import findMaxProfit, {
  BuildTransactions,
  findBuyAndSellIndexes,
} from "../findMaxProfit";

describe("find buy and sell indexes", () => {
  it("should pass 1", () => {
    const prices = [
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 600,
        lowestPriceOfTheDay: 600,
        timestamp: 1641186000000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 110,
        lowestPriceOfTheDay: 110,
        timestamp: 1641272400000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 167,
        lowestPriceOfTheDay: 164,
        timestamp: 1641358800000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 410,
        lowestPriceOfTheDay: 410,
        timestamp: 1641445200000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 200,
        lowestPriceOfTheDay: 200,
        timestamp: 1641445200000,
        n: 187695,
      },
    ];

    expect(findBuyAndSellIndexes(prices).buyIndex).toEqual(1);
    expect(findBuyAndSellIndexes(prices).sellIndex).toEqual(4);
    expect(findBuyAndSellIndexes(prices).profit).toEqual(300);
  });

  it("should pass 2", () => {
    const prices = [
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 600,
        lowestPriceOfTheDay: 600,
        timestamp: 1641186000000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 110,
        lowestPriceOfTheDay: 110,
        timestamp: 1641272400000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 167,
        lowestPriceOfTheDay: 164,
        timestamp: 1641358800000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 410,
        lowestPriceOfTheDay: 410,
        timestamp: 1641445200000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 200,
        lowestPriceOfTheDay: 200,
        timestamp: 1641445200000,
        n: 187695,
      },

      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 50,
        lowestPriceOfTheDay: 50,
        timestamp: 1641445200000,
        n: 187695,
      },

      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 400,
        lowestPriceOfTheDay: 400,
        timestamp: 1641445200000,
        n: 187695,
      },
    ];

    expect(findBuyAndSellIndexes(prices).buyIndex).toEqual(5);
    expect(findBuyAndSellIndexes(prices).sellIndex).toEqual(6);
    expect(findBuyAndSellIndexes(prices).profit).toEqual(350);
  });

  it("should pass 3", () => {
    const prices = [
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 600,
        lowestPriceOfTheDay: 600,
        timestamp: 1641186000000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 110,
        lowestPriceOfTheDay: 110,
        timestamp: 1641272400000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 100,
        lowestPriceOfTheDay: 100,
        timestamp: 1641358800000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 80,
        lowestPriceOfTheDay: 80,
        timestamp: 1641445200000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 50,
        lowestPriceOfTheDay: 50,
        timestamp: 1641445200000,
        n: 187695,
      },
    ];

    expect(findBuyAndSellIndexes(prices).buyIndex).toEqual(-1);
    expect(findBuyAndSellIndexes(prices).sellIndex).toEqual(-1);
    expect(findBuyAndSellIndexes(prices).profit).toEqual(0);
  });
});

describe("Build transactions", () => {
  it("should pass 1", () => {
    const buyPrices = {
      v: 6.386914e7,
      vw: 169.4552,
      o: 167.55,
      c: 170.4045,
      highestPriceOfTheDay: 110,
      lowestPriceOfTheDay: 110,
      timestamp: 1641186000000,
      n: 187695,
    };
    const sellPrices = {
      v: 6.386914e7,
      vw: 169.4552,
      o: 167.55,
      c: 170.4045,

      highestPriceOfTheDay: 600,
      lowestPriceOfTheDay: 600,
      timestamp: 1641272400000,
      n: 187695,
    };

    const transactions = BuildTransactions(buyPrices, sellPrices, "GOOGLE");

    expect(transactions[0]).toEqual({
      date: "03/01/2022",
      action: "ACHAT",
      name: "GOOGLE",
      numShares: 909,
      unitPrice: 110,
      total: 99990,
      portfolioAmount: 10,
    });

    expect(transactions[1]).toEqual({
      date: "04/01/2022",
      action: "VENTE",
      name: "GOOGLE",
      numShares: 909,
      portfolioAmount: 545410,
      total: 545400,
      unitPrice: 600,
    });
  });
});

describe("find Max Profit", () => {
  it("should pass 1", () => {
    const prices = [
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 600,
        lowestPriceOfTheDay: 600,
        timestamp: 1641186000000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 110,
        lowestPriceOfTheDay: 110,
        timestamp: 1641272400000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 167,
        lowestPriceOfTheDay: 164,
        timestamp: 1641358800000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 410,
        lowestPriceOfTheDay: 410,
        timestamp: 1641445200000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 200,
        lowestPriceOfTheDay: 200,
        timestamp: 1641445200000,
        n: 187695,
      },
    ];

    expect(findMaxProfit(prices, "GOOGLE").transactions[0]).toEqual({
      date: "04/01/2022",
      action: "ACHAT",
      name: "GOOGLE",
      numShares: 909,
      unitPrice: 110,
      total: 99990,
      portfolioAmount: 10,
    });

    expect(findMaxProfit(prices, "GOOGLE").transactions[1]).toEqual({
      date: "06/01/2022",
      action: "VENTE",
      name: "GOOGLE",
      numShares: 909,
      portfolioAmount: 181810,
      total: 181800,
      unitPrice: 200,
    });
  });

  it("should pass 2", () => {
    const prices = [
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 600,
        lowestPriceOfTheDay: 600,
        timestamp: 1641186000000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 110,
        lowestPriceOfTheDay: 110,
        timestamp: 1641272400000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 167,
        lowestPriceOfTheDay: 164,
        timestamp: 1641358800000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 410,
        lowestPriceOfTheDay: 410,
        timestamp: 1641445200000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 200,
        lowestPriceOfTheDay: 200,
        timestamp: 1641445200000,
        n: 187695,
      },

      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 50,
        lowestPriceOfTheDay: 50,
        timestamp: 1641445200000,
        n: 187695,
      },

      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 400,
        lowestPriceOfTheDay: 400,
        timestamp: 1641445200000,
        n: 187695,
      },
    ];

    expect(findMaxProfit(prices, "GOOGLE").transactions[0]).toEqual({
      date: "06/01/2022",
      action: "ACHAT",
      name: "GOOGLE",
      numShares: 2000,
      portfolioAmount: 0,
      total: 100000,
      unitPrice: 50,
    });

    expect(findMaxProfit(prices, "GOOGLE").transactions[1]).toEqual({
      date: "06/01/2022",
      action: "VENTE",
      name: "GOOGLE",
      numShares: 2000,
      portfolioAmount: 800000,
      total: 800000,
      unitPrice: 400,
    });
  });

  it("should pass 2", () => {
    const prices = [
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 600,
        lowestPriceOfTheDay: 600,
        timestamp: 1641186000000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 110,
        lowestPriceOfTheDay: 110,
        timestamp: 1641272400000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 167,
        lowestPriceOfTheDay: 164,
        timestamp: 1641358800000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 410,
        lowestPriceOfTheDay: 410,
        timestamp: 1641445200000,
        n: 187695,
      },
      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 200,
        lowestPriceOfTheDay: 200,
        timestamp: 1641445200000,
        n: 187695,
      },

      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 50,
        lowestPriceOfTheDay: 50,
        timestamp: 1641445200000,
        n: 187695,
      },

      {
        v: 6.386914e7,
        vw: 169.4552,
        o: 167.55,
        c: 170.4045,
        highestPriceOfTheDay: 400,
        lowestPriceOfTheDay: 400,
        timestamp: 1641445200000,
        n: 187695,
      },
    ];

    expect(findMaxProfit(prices, "GOOGLE").transactions[0]).not.toEqual({
      date: "06/01/2022",
      action: "VENTE",
      name: "AMAZON",
      numShares: 2000,
      portfolioAmount: 0,
      total: 100000,
      unitPrice: 50,
    });

    expect(findMaxProfit(prices, "GOOGLE").transactions[1]).not.toEqual({
      date: "06/01/2022",
      action: "ACHAT",
      name: "GOOGLE",
      numShares: 2400,
      portfolioAmount: 80500,
      total: 40,
      unitPrice: 400,
    });
  });
});
