class MathHelper {
  static maxAmountToBuy(balance: number, price: number): number {
    return Math.floor(balance / price);
  }

  static roundToTwo(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
}

export default MathHelper;
