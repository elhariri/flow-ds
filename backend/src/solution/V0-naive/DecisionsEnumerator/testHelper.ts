import { Stocks, TransactionType } from "../../../index.types";

// function thst compares two possibilities

export function compareTwoPossibilities(
  expectedResult: {
    type: TransactionType;
    share: Stocks;
    amount: number;
  }[],
  actualResult: {
    type: TransactionType;
    share: Stocks;
    amount: number;
  }[]
) {
  for (let i = 0; i < actualResult.length; i += 1) {
    let found: boolean = false;
    for (let j = 0; j < expectedResult.length; j += 1) {
      if (
        expectedResult[j].type === actualResult[i].type &&
        expectedResult[j].share === actualResult[i].share &&
        expectedResult[j].amount === actualResult[i].amount
      ) {
        found = true;
      }
    }

    if (!found) {
      return false;
    }
  }
  return true;
}

// function thst compares the expected result with the actual result of possibilities
export default function comparePossibilities(
  expectedResult: {
    type: TransactionType;
    share: Stocks;
    amount: number;
  }[][],
  actualResult: {
    type: TransactionType;
    share: Stocks;
    amount: number;
  }[][]
) {
  for (let i = 0; i < actualResult.length; i += 1) {
    let found: boolean = false;
    for (let j = 0; j < expectedResult.length; j += 1) {
      found =
        found || compareTwoPossibilities(expectedResult[j], actualResult[i]);
    }
    if (!found) {
      return false;
    }
  }

  return true;
}
