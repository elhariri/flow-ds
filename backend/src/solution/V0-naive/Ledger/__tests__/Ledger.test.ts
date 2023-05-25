import Ledger from "../Leger";

it("should allow adding a buy entry", () => {
  const ledger = new Ledger();

  ledger.addEntry(12345, "ACHAT", "GOOGLE", 10, 100, 1000);

  expect(ledger.allEntries).toEqual(
    expect.arrayContaining([
      {
        date: "12345",
        action: "ACHAT",
        name: "GOOGLE",
        num_shares: 10,
        unit_price: 100,
        total: 1000,
        portfolio_amount: 1000,
      },
    ])
  );
});

it("Should allow cloning the Ledger", () => {
  const ledger = new Ledger();

  ledger.addEntry(12345, "ACHAT", "GOOGLE", 10, 100, 1000);

  const ledger2 = ledger.clone();

  ledger.addEntry(12345, "ACHAT", "AMAZON", 5, 200, 1000);
  ledger2.addEntry(12345, "VENTE", "AMAZON", 5, 200, 1000);

  expect(ledger2.allEntries).toEqual(
    expect.arrayContaining([
      {
        date: "12345",
        action: "ACHAT",
        name: "GOOGLE",
        num_shares: 10,
        unit_price: 100,
        total: 1000,
        portfolio_amount: 1000,
      },
      {
        date: "12345",
        action: "VENTE",
        name: "AMAZON",
        num_shares: 5,
        unit_price: 200,
        total: 1000,
        portfolio_amount: 1000,
      },
    ])
  );
});

it("should allow adding a sell entry", () => {
  const ledger = new Ledger();

  ledger.addEntry(12345, "ACHAT", "GOOGLE", 10, 100, 1000);

  ledger.addEntry(12345, "VENTE", "GOOGLE", 5, 200, 1000);

  expect(ledger.allEntries).toEqual(
    expect.arrayContaining([
      {
        date: "12345",
        action: "ACHAT",
        name: "GOOGLE",
        num_shares: 10,
        unit_price: 100,
        total: 1000,
        portfolio_amount: 1000,
      },
      {
        date: "12345",
        action: "VENTE",
        name: "GOOGLE",
        num_shares: 5,
        unit_price: 200,
        total: 1000,
        portfolio_amount: 1000,
      },
    ])
  );
});

it("should throw an error if the share name is not 'GOOGLE' or 'AMAZON'", () => {
  const ledger = new Ledger();

  expect(() => {
    // @ts-ignore
    ledger.addEntry(12345, "ACHAT", "APPLE", 10, 100, 1000);
  }).toThrowError("Invalid share name");

  expect(() => {
    // @ts-ignore
    ledger.addEntry(12345, "ACHAT", "TESLA", 10, 100, 1000);
  }).toThrowError("Invalid share name");
});

it("should throw an error if the transaction type is not 'ACHAT' or 'VENTE'", () => {
  const ledger = new Ledger();

  expect(() => {
    // @ts-ignore
    ledger.addEntry(12345, "FAKE", "GOOGLE", 10, 100, 1000);
  }).toThrowError("Invalid transaction type");
});

it("should throw an error if the number of shares is negative", () => {
  const ledger = new Ledger();

  expect(() => {
    ledger.addEntry(12345, "ACHAT", "GOOGLE", -1, 100, 1000);
  }).toThrowError("Cannot buy negative number of shares");

  expect(() => {
    ledger.addEntry(12345, "VENTE", "GOOGLE", -10, 100, 1000);
  }).toThrowError("Cannot sell negative number of shares");
});

it("should throw an error if the share price is negative", () => {
  const ledger = new Ledger();

  expect(() => {
    ledger.addEntry(12345, "ACHAT", "GOOGLE", 1, -100, 1000);
  }).toThrowError("Cannot buy shares at a negative price");

  expect(() => {
    ledger.addEntry(12345, "VENTE", "GOOGLE", 10, -100, 1000);
  }).toThrowError("Cannot sell shares at a negative price");
});

it("should throw an error if the number of shares is not an integer", () => {
  const ledger = new Ledger();

  expect(() => {
    ledger.addEntry(12345, "ACHAT", "GOOGLE", 1.5, 100, 1000);
  }).toThrowError("Cannot buy a fractional number of shares");

  expect(() => {
    ledger.addEntry(12345, "VENTE", "GOOGLE", 10.5, 100, 1000);
  }).toThrowError("Cannot sell a fractional number of shares");
});

it("should throw an error if the portfolio amount is negative", () => {
  const ledger = new Ledger();

  expect(() => {
    ledger.addEntry(12345, "ACHAT", "GOOGLE", 1, 100, -1000);
  }).toThrowError("Portfolio amount cannot be negative");

  expect(() => {
    ledger.addEntry(12345, "VENTE", "GOOGLE", 10, 100, -1000);
  }).toThrowError("Portfolio amount cannot be negative");
});
