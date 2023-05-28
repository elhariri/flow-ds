import { Stocks } from "../../../../index.types";
import Portfolio from "../../../Shared/Portfolio/Portfolio";

export type PoolState = {
  cash: Portfolio;
} & {
  [key in Stocks]?: Portfolio;
};
