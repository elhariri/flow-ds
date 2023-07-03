class DateHelper {
  static format(timestamp: number) {
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
