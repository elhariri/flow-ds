/* eslint-disable import/prefer-default-export */

import FinalSolution from ".";

export const handler = async () => ({ body: JSON.stringify(FinalSolution()) });
