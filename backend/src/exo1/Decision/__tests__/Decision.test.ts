import Decision from "../Decision";

it("should throw an error if the action type is nor ACHAT or VENTE", () => {
  expect(() => {
    // @ts-ignore
    Decision.testIfValid("FAKE", "GOOGLE", 1, 1);
  }).toThrowError("Invalid transaction type");
});

it("should throw an error if the share name is not GOOGLE or AMAZON", () => {
  expect(() => {
    // @ts-ignore
    Decision.testIfValid("ACHAT", "APPLE", 1, 1);
  }).toThrowError("Invalid share name");

  expect(() => {
    // @ts-ignore
    Decision.testIfValid("VENTE", "TESLA", 1, 1);
  }).toThrowError("Invalid share name");
});

it("should throw an error if the number of shares is negative", () => {
  expect(() => {
    Decision.testIfValid("ACHAT", "GOOGLE", -1, 1);
  }).toThrowError("Cannot buy negative number of shares");

  expect(() => {
    Decision.testIfValid("VENTE", "AMAZON", -10, 1);
  }).toThrowError("Cannot sell negative number of shares");
});

it("should throw an error if the share price is negative", () => {
  expect(() => {
    Decision.testIfValid("ACHAT", "GOOGLE", 1, -1);
  }).toThrowError("Cannot buy shares at a negative price");

  expect(() => {
    Decision.testIfValid("VENTE", "AMAZON", 10, -1);
  }).toThrowError("Cannot sell shares at a negative price");
});

it("should throw an error if the number of shares is not an integer", () => {
  expect(() => {
    Decision.testIfValid("ACHAT", "GOOGLE", 1.5, 1);
  }).toThrowError("Cannot buy a fractional number of shares");

  expect(() => {
    Decision.testIfValid("VENTE", "AMAZON", 10.5, 1);
  }).toThrowError("Cannot sell a fractional number of shares");
});
