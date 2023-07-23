import StockPricesBuilder from "../StockPricesBuilder";

describe("StockPricesBuilder", () => {
  it("should build a single daily stock price data point correctly", () => {
    const company = "GOOGLE";
    const date = 1641186000000;
    const lowestPrice = 110;
    const highestPrice = 120;

    const dataPoint = StockPricesBuilder.buildPoint(
      company,
      date,
      lowestPrice,
      highestPrice
    );

    expect(dataPoint).toEqual({
      company,
      date,
      lowestPrice,
      highestPrice,
    });
  });

  it("should build an array of daily stock price data points correctly", () => {
    const company = "GOOGLE";
    const values: [number, number, number][] = [
      [1641186000000, 110, 120],
      [1641272400000, 130, 140],
      // Add more data points as needed...
    ];

    const dataPoints = StockPricesBuilder.buildSeries(company, values);

    expect(dataPoints).toHaveLength(values.length);
    expect(dataPoints[0]).toEqual({
      company,
      date: 1641186000000,
      lowestPrice: 110,
      highestPrice: 120,
    });
    expect(dataPoints[1]).toEqual({
      company,
      date: 1641272400000,
      lowestPrice: 130,
      highestPrice: 140,
    });
    // Add more assertions for other data points...
  });
});
