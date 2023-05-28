/* eslint-disable import/prefer-default-export */
import express, { Request, Response } from "express";
import cors from "cors";

import FinalSolution from ".";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) =>
  res.json({ body: JSON.stringify(FinalSolution()) })
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}.`);
});
