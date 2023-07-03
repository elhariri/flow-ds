/* eslint-disable import/prefer-default-export */

import { Exo2AmazonSolution } from "..";

export const handler = async () => ({
  body: JSON.stringify(Exo2AmazonSolution()),
});
