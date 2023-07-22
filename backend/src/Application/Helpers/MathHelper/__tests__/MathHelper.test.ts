import MathHelper from "../MathHelper";

describe("MathHelper", () => {
  describe("Calculating the maximum amount of shares possible to buy", () => {
    it("should return the maximum amount that can be bought given the balance and price", () => {
      const balance = 100;
      const price = 20;
      const maxAmount = MathHelper.maxAmountToBuy(balance, price);
      expect(maxAmount).toEqual(5);
    });

    it("should return 0 when the balance is less than the price", () => {
      const balance = 10;
      const price = 20;
      const maxAmount = MathHelper.maxAmountToBuy(balance, price);
      expect(maxAmount).toEqual(0);
    });
  });

  describe("Rounding floating number into two decimals", () => {
    it("should round the number to two decimal places", () => {
      const num = 3.14159;
      const roundedNum = MathHelper.roundToTwo(num);
      expect(roundedNum).toEqual(3.14);
    });

    it("should round the number to two decimal places when the input has more than two decimal places", () => {
      const num = 3.14999;
      const roundedNum = MathHelper.roundToTwo(num);
      expect(roundedNum).toEqual(3.15);
    });
  });
});
