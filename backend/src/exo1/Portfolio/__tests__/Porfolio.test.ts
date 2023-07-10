import DateHelper from "../../Utilities/DateHelper";
import Portfolio from "../Portfolio";

describe("Cash operations", () => {
  it("should be initialized with an initial amount of 100 000, a stock of both shares 0  and a profit 0", () => {
    const portfolio = new Portfolio();

    expect(portfolio.cashAmount).toBe(100000);
  });

  it("should allow withdrawing cash", () => {
    const portfolio = new Portfolio();

    portfolio.withdrawCash(1000);

    expect(portfolio.cashAmount).toBe(99000);
  });

  it("should not allow withdrawing cash if the amount is greater than the cash amount", () => {
    const portfolio = new Portfolio();

    expect(() => {
      portfolio.withdrawCash(100001);
    }).toThrowError("Not enough cash to withdraw 100001");
  });

  it("should allow adding cash", () => {
    const portfolio = new Portfolio();

    portfolio.addCash(1000);

    expect(portfolio.cashAmount).toBe(101000);
  });

  it("should not allow adding cash if the amount is negative", () => {
    const portfolio = new Portfolio();

    expect(() => {
      portfolio.addCash(-1000);
    }).toThrowError("Cannot add negative amount of cash");
  });
});

describe("Shares operations", () => {
  describe("Buying shares", () => {
    it("should allow buying shares", () => {
      const portfolio = new Portfolio();

      portfolio.buyShares("GOOGLE", 10, 100, 12345);

      portfolio.buyShares("AMAZON", 5, 200, 12345);

      expect(portfolio.googleShares).toEqual(10);
      expect(portfolio.amazonShares).toEqual(5);
    });

    it('should throw an error if the share name is not "GOOGLE" or "AMAZON"', () => {
      const portfolio = new Portfolio();

      expect(() => {
        // @ts-ignore
        portfolio.buyShares("APPLE", 10, 100, 12345);
      }).toThrowError("Invalid share name");

      expect(() => {
        // @ts-ignore
        portfolio.buyShares("TESLA", 10, 100, 12345);
      }).toThrowError("Invalid share name");
    });

    it("should not allow buying shares if the amount is greater than the cash amount", () => {
      const portfolio = new Portfolio();

      expect(() => {
        portfolio.buyShares("GOOGLE", 1001, 100, 12345);
      }).toThrowError("Not enough cash to withdraw 100100");

      expect(() => {
        portfolio.buyShares("AMAZON", 1001, 100, 12345);
      }).toThrowError("Not enough cash to withdraw 100100");
    });

    it("should not allow buying shares if the amount is negative", () => {
      const portfolio = new Portfolio();

      expect(() => {
        portfolio.buyShares("AMAZON", -10, 100, 12345);
      }).toThrowError("Cannot buy negative number of shares");
    });

    it("should not allow buying shares if the share price is negative", () => {
      const portfolio = new Portfolio();

      expect(() => {
        portfolio.buyShares("GOOGLE", 10, -100, 12345);
      }).toThrowError("Cannot buy shares at a negative price");

      expect(() => {
        portfolio.buyShares("AMAZON", 10, -100, 12345);
      }).toThrowError("Cannot buy shares at a negative price");
    });

    it("should not allow buying shares if the number of shares is not an integer", () => {
      const portfolio = new Portfolio();

      expect(() => {
        portfolio.buyShares("GOOGLE", 10.5, 100, 12345);
      }).toThrowError("Cannot buy a fractional number of shares");
    });
  });

  describe("Selling shares", () => {
    it("should allow selling shares", () => {
      const portfolio = new Portfolio();

      portfolio.buyShares("GOOGLE", 10, 100, 12345);

      portfolio.sellShares("GOOGLE", 5, 200, 12345);

      expect(portfolio.googleShares).toEqual(5);
    });

    it("should not allow selling shares if the amount is greater than the cash amount", () => {
      const portfolio = new Portfolio();

      portfolio.buyShares("GOOGLE", 5, 100, 12345);

      portfolio.buyShares("AMAZON", 5, 100, 12345);

      expect(() => {
        portfolio.sellShares("GOOGLE", 10, 100, 12345);
      }).toThrowError("Not enough shares to sell 10");

      expect(() => {
        portfolio.sellShares("AMAZON", 10, 100, 12345);
      }).toThrowError("Not enough shares to sell 10");
    });

    it("should not allow selling shares if the amount is negative", () => {
      const portfolio = new Portfolio();

      expect(() => {
        portfolio.sellShares("AMAZON", -10, 100, 12345);
      }).toThrowError("Cannot sell negative number of shares");
    });

    it("should not allow selling shares if the share price is negative", () => {
      const portfolio = new Portfolio();

      expect(() => {
        portfolio.sellShares("GOOGLE", 10, -100, 12345);
      }).toThrowError("Cannot sell shares at a negative price");

      expect(() => {
        portfolio.sellShares("AMAZON", 10, -100, 12345);
      }).toThrowError("Cannot sell shares at a negative price");
    });

    it("should not allow selling shares if the number of shares is not an integer", () => {
      const portfolio = new Portfolio();

      expect(() => {
        portfolio.sellShares("GOOGLE", 10.5, 100, 12345);
      }).toThrowError("Cannot sell a fractional number of shares");
    });

    it("should allow selling all the shares", () => {
      const portfolio = new Portfolio();

      portfolio.buyShares("GOOGLE", 10, 100, 12345);

      portfolio.buyShares("AMAZON", 10, 200, 12345);

      portfolio.sellAllShares(200, 400, 12345);

      expect(portfolio.googleShares).toEqual(0);
      expect(portfolio.amazonShares).toEqual(0);
      expect(portfolio.cashAmount).toEqual(103000);
    });
  });
});

describe("Ledger operations", () => {
  it("Should be initialized with an empty ledger", () => {
    const portfolio = new Portfolio();

    expect(portfolio.entries).toEqual([]);
  });

  it("Should add an entry to the ledger when buying shares", () => {
    const portfolio = new Portfolio();

    portfolio.buyShares("GOOGLE", 10, 100, 12345);

    expect(portfolio.entries).toEqual([
      {
        date: DateHelper.format(12345),
        action: "ACHAT",
        name: "GOOGLE",
        numShares: 10,
        unitPrice: 100,
        total: 1000,
        portfolioAmount: 99000,
      },
    ]);
  });

  it("Should add an entry to the ledger when selling shares", () => {
    const portfolio = new Portfolio();

    portfolio.buyShares("GOOGLE", 10, 100, 12345);

    portfolio.sellShares("GOOGLE", 5, 200, 12345);

    expect(portfolio.entries).toEqual([
      {
        date: DateHelper.format(12345),
        action: "ACHAT",
        name: "GOOGLE",
        numShares: 10,
        unitPrice: 100,
        total: 1000,
        portfolioAmount: 99000,
      },
      {
        date: DateHelper.format(12345),
        action: "VENTE",
        name: "GOOGLE",
        numShares: 5,
        unitPrice: 200,
        total: 1000,
        portfolioAmount: 100000,
      },
    ]);
  });
});

it("should allow cloning a portfolio", () => {
  const portfolio = new Portfolio();

  portfolio.buyShares("GOOGLE", 10, 100, 12345);

  portfolio.buyShares("AMAZON", 5, 200, 12345);

  const clonedPortfolio = portfolio.clone();

  expect(clonedPortfolio.googleShares).toEqual(10);
  expect(clonedPortfolio.amazonShares).toEqual(5);
  expect(clonedPortfolio.cashAmount).toEqual(98000);
});

it("should allow calculating the portfolio profit", () => {
  const portfolio = new Portfolio();

  portfolio.buyShares("GOOGLE", 10, 100, 12345);

  portfolio.buyShares("AMAZON", 5, 200, 12345);

  expect(portfolio.getProfit()).toEqual(-2000);

  portfolio.sellShares("GOOGLE", 5, 500, 12345);

  expect(portfolio.getProfit()).toEqual(500);
});
