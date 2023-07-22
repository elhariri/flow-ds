import express from "express";

import cors from "cors";
import DBClient from "./Models/Database/Client/DBClient";
import AppRouter from "./Routes/Router";

const app = express();
const port = 3000;

app.use(cors());

AppRouter(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}.`);
});

async function main() {
  // test
}

main()
  .then(async () => {
    await DBClient.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await DBClient.$disconnect();
    process.exit(1);
  });
