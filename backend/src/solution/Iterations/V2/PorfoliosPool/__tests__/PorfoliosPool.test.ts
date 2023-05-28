import Portfolio from "../../../../Shared/Portfolio/Portfolio";
import PorfoliosPool from "../PorfoliosPool";

it("should only keep the chash only portfolio that has the max cash amount", () => {
  const portfolio1 = new Portfolio();
  const portfolio2 = new Portfolio();

  portfolio1.buyShares("GOOGLE", 1, 100, 0);
  portfolio2.buyShares("GOOGLE", 1, 100, 0);

  portfolio1.sellAllShares(100, 100, 1);
  portfolio2.sellAllShares(10, 10, 1);

  const potfoliosPool = new PorfoliosPool();

  potfoliosPool.push([portfolio1, portfolio2]);

  const portfolios = potfoliosPool.getPortfolios();

  expect(portfolios.length).toEqual(1);

  expect(portfolios[0].cashAmount).toEqual(100000);
});

it("should only keep the portfolio with the max number of a share", () => {
  const portfolio1 = new Portfolio();
  const portfolio2 = new Portfolio();
  const portfolio3 = new Portfolio();
  const portfolio4 = new Portfolio();
  const portfolio5 = new Portfolio();

  portfolio1.buyShares("GOOGLE", 1, 100, 0);
  portfolio2.buyShares("GOOGLE", 2, 100, 0);

  portfolio4.buyShares("AMAZON", 5, 100, 0);
  portfolio5.buyShares("AMAZON", 6, 100, 0);

  const potfoliosPool = new PorfoliosPool();

  potfoliosPool.push([
    portfolio1,
    portfolio2,
    portfolio3,
    portfolio4,
    portfolio5,
  ]);

  const portfolios = potfoliosPool.getPortfolios();

  expect(portfolios.length).toEqual(3);

  const googleShares = [];
  const amazonShares = [];

  for (let i = 0; i < portfolios.length; i += 1) {
    const portfolio = portfolios[i];
    if (portfolio.googleShares > 0) googleShares.push(portfolio.googleShares);
    if (portfolio.amazonShares > 0) amazonShares.push(portfolio.amazonShares);
  }

  expect(googleShares[0]).toEqual(2);
  expect(amazonShares[0]).toEqual(6);
  expect(googleShares).not.toContain(1);
});

it("should only keep the portfolios with max number of shares and cash exclusivley", () => {
  const portfolio1 = new Portfolio();
  const portfolio2 = new Portfolio();
  const portfolio3 = new Portfolio();
  const portfolio4 = new Portfolio();
  const portfolio5 = new Portfolio();
  const portfolio6 = new Portfolio(150000);

  portfolio1.buyShares("GOOGLE", 1, 100, 0);
  portfolio2.buyShares("GOOGLE", 2, 100, 0);

  portfolio4.buyShares("AMAZON", 5, 100, 0);
  portfolio5.buyShares("AMAZON", 6, 100, 0);

  const potfoliosPool = new PorfoliosPool();

  potfoliosPool.push([
    portfolio1,
    portfolio2,
    portfolio3,
    portfolio4,
    portfolio5,
    portfolio6,
  ]);

  const portfolios = potfoliosPool.getPortfolios();

  const googleShares = [];
  const amazonShares = [];
  let cashAmount = 0;

  for (let i = 0; i < portfolios.length; i += 1) {
    const portfolio = portfolios[i];
    if (portfolio.googleShares > 0) googleShares.push(portfolio.googleShares);
    if (portfolio.amazonShares > 0) amazonShares.push(portfolio.amazonShares);
    if (portfolio.googleShares === 0 && portfolio.amazonShares === 0)
      cashAmount = portfolio.cashAmount;
  }

  expect(googleShares[0]).toEqual(2);
  expect(amazonShares[0]).toEqual(6);
  expect(googleShares).not.toContain(1);

  expect(cashAmount).toEqual(150000);
});
