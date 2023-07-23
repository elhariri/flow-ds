/**
 * A utility class containing date formatting functions.
 *
 * @class
 */
class DateHelper {
  /**
   * Formats a Unix timestamp into a string with the format "DD/MM/YYYY".
   *
   * @static
   * @param {number} timestamp - The Unix timestamp to be formatted.
   * @returns {string} The formatted date string in the format "DD/MM/YYYY".
   */
  static format(timestamp: number): string {
    const date = new Date(timestamp);

    const day = date.getDate();
    const printedDay = day < 10 ? `0${day}` : day;

    const month = date.getMonth() + 1;
    const printedMonth = month < 10 ? `0${month}` : month;

    const year = date.getFullYear();

    return `${printedDay}/${printedMonth}/${year}`;
  }
}

export default DateHelper;
