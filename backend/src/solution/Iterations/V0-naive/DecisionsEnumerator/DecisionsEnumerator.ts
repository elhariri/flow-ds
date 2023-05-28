import Portfolio from "../../../Shared/Portfolio/Portfolio";
import { Possibility, SharesDayPrices } from "./DecisionsEnumerator.types";

class DecisionsEnumerator {
  // get all the poosible decisions from a portfolio and a set of prices
  static possibilitiesFrom(
    portfolio: Portfolio,
    sharesPrices: SharesDayPrices
  ) {
    const possibilities: Possibility[][] = [];
    const maximumBuyableGoogleShares = Math.floor(
      portfolio.cashAmount / sharesPrices.GOOGLE.buyPrice
    );
    const maximumBuyableAmazonShares = Math.floor(
      portfolio.cashAmount / sharesPrices.AMAZON.buyPrice
    );

    // this is a memoization object to avoid computing the same combination twice
    // this can be avoided if we use amore distict cases
    // but lets accept this for now
    // this whole block needs to be refactored
    const memory: { [key: string]: true } = {};

    // get all possibile combination when buying google shares
    for (let i = 1; i <= maximumBuyableGoogleShares; i += 1) {
      const remainingCachAmountAfterBuy =
        portfolio.cashAmount - i * sharesPrices.GOOGLE.buyPrice;
      const maximumBuyableAmazonSharesAfterBuy = Math.floor(
        remainingCachAmountAfterBuy / sharesPrices.AMAZON.buyPrice
      );

      // Handle no buying or seeling of google shares

      if (!memory[`ACHAT-GOOGLE-${i}`]) {
        possibilities.push([
          {
            type: "ACHAT",
            share: "GOOGLE",
            amount: i,
          },
        ]);

        memory[`ACHAT-GOOGLE-${i}`] = true;
      }

      for (let j = 1; j <= maximumBuyableAmazonSharesAfterBuy; j += 1) {
        if (!memory[`ACHAT-GOOGLE-${i}_ACHAT-AMAZON-${j}`]) {
          possibilities.push([
            {
              type: "ACHAT",
              share: "GOOGLE",
              amount: i,
            },
            {
              type: "ACHAT",
              share: "AMAZON",
              amount: j,
            },
          ]);

          memory[`ACHAT-GOOGLE-${i}_ACHAT-AMAZON-${j}`] = true;
        }
      }

      for (let j = 1; j <= portfolio.amazonShares; j += 1) {
        if (!memory[`ACHAT-GOOGLE-${i}_VENTE-AMAZON-${j}`]) {
          possibilities.push([
            {
              type: "ACHAT",
              share: "GOOGLE",
              amount: i,
            },
            {
              type: "VENTE",
              share: "AMAZON",
              amount: j,
            },
          ]);

          memory[`ACHAT-GOOGLE-${i}_VENTE-AMAZON-${j}`] = true;
        }
      }
    }

    // get all possibile combination when buyin amazon shares
    for (let i = 1; i <= maximumBuyableAmazonShares; i += 1) {
      const remainingCachAmountAfterBuy =
        portfolio.cashAmount - i * sharesPrices.AMAZON.buyPrice;
      const maximumBuyableGoogleSharesAfterBuy = Math.floor(
        remainingCachAmountAfterBuy / sharesPrices.GOOGLE.buyPrice
      );

      // Handle no buying or seeling of google shares
      if (!memory[`ACHAT-AMAZON-${i}`]) {
        possibilities.push([
          {
            type: "ACHAT",
            share: "AMAZON",
            amount: i,
          },
        ]);

        memory[`ACHAT-AMAZON-${i}`] = true;
      }

      for (let j = 1; j <= maximumBuyableGoogleSharesAfterBuy; j += 1) {
        if (!memory[`ACHAT-GOOGLE-${j}_ACHAT-AMAZON-${i}`]) {
          possibilities.push([
            {
              type: "ACHAT",
              share: "AMAZON",
              amount: i,
            },
            {
              type: "ACHAT",
              share: "GOOGLE",
              amount: j,
            },
          ]);

          memory[`ACHAT-GOOGLE-${j}_ACHAT-AMAZON-${i}`] = true;
        }
      }

      for (let j = 1; j <= portfolio.googleShares; j += 1) {
        if (!memory[`VENTE-GOOGLE-${j}_ACHAT-AMAZON-${i}`]) {
          possibilities.push([
            {
              type: "ACHAT",
              share: "AMAZON",
              amount: i,
            },
            {
              type: "VENTE",
              share: "GOOGLE",
              amount: j,
            },
          ]);

          memory[`VENTE-GOOGLE-${j}_ACHAT-AMAZON-${i}`] = true;
        }
      }
    }

    // get all possibile combination when selling amazon shares
    for (let i = 1; i <= portfolio.amazonShares; i += 1) {
      const remainingCachAmountAfterSell =
        portfolio.cashAmount + i * sharesPrices.AMAZON.sellPrice;
      const maximumBuyableGoogleSharesAfterBuy = Math.floor(
        remainingCachAmountAfterSell / sharesPrices.GOOGLE.buyPrice
      );

      // Handle no buying or seeling of google shares
      if (!memory[`VENTE-AMAZON-${i}`]) {
        possibilities.push([
          {
            type: "VENTE",
            share: "AMAZON",
            amount: i,
          },
        ]);

        memory[`VENTE-AMAZON-${i}`] = true;
      }

      for (let j = 1; j <= maximumBuyableGoogleSharesAfterBuy; j += 1) {
        if (!memory[`ACHAT-GOOGLE-${j}_VENTE-AMAZON-${i}`]) {
          possibilities.push([
            {
              type: "VENTE",
              share: "AMAZON",
              amount: i,
            },
            {
              type: "ACHAT",
              share: "GOOGLE",
              amount: j,
            },
          ]);

          memory[`ACHAT-GOOGLE-${j}_VENTE-AMAZON-${i}`] = true;
        }
      }

      for (let j = 1; j <= portfolio.googleShares; j += 1) {
        if (!memory[`VENTE-GOOGLE-${j}_VENTE-AMAZON-${i}`]) {
          possibilities.push([
            {
              type: "VENTE",
              share: "AMAZON",
              amount: i,
            },
            {
              type: "VENTE",
              share: "GOOGLE",
              amount: j,
            },
          ]);

          memory[`VENTE-GOOGLE-${j}_VENTE-AMAZON-${i}`] = true;
        }
      }
    }

    // get all possibile combination when selling google shares
    for (let i = 1; i <= portfolio.googleShares; i += 1) {
      const remainingCachAmountAfterSell =
        portfolio.cashAmount + i * sharesPrices.GOOGLE.sellPrice;
      const maximumBuyableAmazonSharesAfterSell = Math.floor(
        remainingCachAmountAfterSell / sharesPrices.AMAZON.buyPrice
      );

      // Handle no buying or seeling of google shares
      if (!memory[`VENTE-GOOGLE-${i}`]) {
        possibilities.push([
          {
            type: "VENTE",
            share: "GOOGLE",
            amount: i,
          },
        ]);

        memory[`VENTE-GOOGLE-${i}`] = true;
      }

      for (let j = 1; j <= maximumBuyableAmazonSharesAfterSell; j += 1) {
        if (!memory[`VENTE-GOOGLE-${i}_ACHAT-AMAZON-${j}`]) {
          possibilities.push([
            {
              type: "VENTE",
              share: "GOOGLE",
              amount: i,
            },
            {
              type: "ACHAT",
              share: "AMAZON",
              amount: j,
            },
          ]);

          memory[`VENTE-GOOGLE-${i}_ACHAT-AMAZON-${j}`] = true;
        }
      }

      for (let j = 1; j <= portfolio.amazonShares; j += 1) {
        if (!memory[`VENTE-GOOGLE-${i}_VENTE-AMAZON-${j}`]) {
          possibilities.push([
            {
              type: "VENTE",
              share: "GOOGLE",
              amount: i,
            },
            {
              type: "VENTE",
              share: "AMAZON",
              amount: j,
            },
          ]);

          memory[`VENTE-GOOGLE-${i}_VENTE-AMAZON-${j}`] = true;
        }
      }
    }

    return possibilities;
  }
}

export default DecisionsEnumerator;
