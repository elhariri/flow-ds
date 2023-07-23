/**
 * A utility class containing helpful math-related functions.
 *
 * @class
 */
class MathHelper {
  /**
   * Calculates the maximum number of shares that can be bought with the given balance at the specified price.
   *
   * @static
   * @param {number} balance - The available balance for buying shares.
   * @param {number} price - The price of one share.
   * @returns {number} The maximum number of shares that can be bought.
   */
  static maxAmountToBuy(balance: number, price: number): number {
    return Math.floor(balance / price);
  }

  /**
   * Rounds a number to two decimal places.
   *
   * @static
   * @param {number} num - The number to be rounded.
   * @returns {number} The rounded number with two decimal places.
   */
  static roundToTwo(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
}

export default MathHelper;
