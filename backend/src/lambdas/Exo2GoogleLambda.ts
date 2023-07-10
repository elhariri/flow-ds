/* eslint-disable import/prefer-default-export */

import { Exo2GoogleSolution } from "..";

export const handler = async () => ({
  body: JSON.stringify(Exo2GoogleSolution()),
});
