import formatPrice from "../formatPrice";

describe("formatPrice", () => {
  it("should format the price with thousands separator", () => {
    const price = 1234567.89;
    const formattedPrice = formatPrice(price);
    expect(formattedPrice).toEqual("1 234 567.89");
  });

  it("should format the price with decimal part only", () => {
    const price = 0.99;
    const formattedPrice = formatPrice(price);
    expect(formattedPrice).toEqual("0.99");
  });

  it("should format the price with integer part only", () => {
    const price = 9999;
    const formattedPrice = formatPrice(price);
    expect(formattedPrice).toEqual("9 999.");
  });

  it("should format the price with both integer and decimal parts", () => {
    const price = 1234.5678;
    const formattedPrice = formatPrice(price);
    expect(formattedPrice).toEqual("1 234.5678");
  });

  it("should format the price with no decimal part", () => {
    const price = 1000.0;
    const formattedPrice = formatPrice(price);
    expect(formattedPrice).toEqual("1 000.");
  });
});
