/* eslint-disable import/prefer-default-export */
import express, { Request, Response } from "express";
import cors from "cors";

import {
  Exo1Solution,
  Exo2AmazonSolution,
  Exo2BothSharesSolution,
  Exo2GoogleSolution,
} from ".";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) =>
  res.json({ body: JSON.stringify(Exo1Solution()) })
);

app.get("/exo2/google", (req: Request, res: Response) =>
  res.json({ body: JSON.stringify(Exo2GoogleSolution()) })
);

app.get("/exo2/amazon", (req: Request, res: Response) =>
  res.json({ body: JSON.stringify(Exo2AmazonSolution()) })
);

app.get("/exo2/both", (req: Request, res: Response) =>
  res.json({ body: JSON.stringify(Exo2BothSharesSolution()) })
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}.`);
});
