import "@testing-library/jest-dom";
import { cleanup, screen, render } from "@testing-library/react";

import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "../App";

afterEach(cleanup);

describe("UI tests", () => {
  test("Check if the static texts are all displayed", () => {
    render(<App />);
    expect(
      screen.getByText("Meilleur moment pour acheter ou pour vendre")
    ).toBeInTheDocument();

    expect(
      screen.getByText("List des achats et ventes quotidien d'Erwan")
    ).toBeInTheDocument();
    const regex = /Temps total d'exécution : \d+ minutes et \d+ secondes/i;
    expect(screen.getByText(regex)).toBeInTheDocument();
  });

  test("renders a table component", () => {
    render(<App />);
    const tableComponent = screen.getByRole("table");
    expect(tableComponent).toBeInTheDocument();

    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Prix unitaire")).toBeInTheDocument();
    expect(screen.getByText("Nombre d'actions")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Portefeuille")).toBeInTheDocument();
  });
});

describe.only("Server call", () => {
  const server = setupServer(
    rest.get("/", (_req, res, ctx) =>
      res(
        ctx.json({
          success: true,
          body: {
            executionTime: 96,
            transactions: [],
          },
        })
      )
    )
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("check if loaders are displayed when calling the server at first render", async () => {
    render(<App />);

    expect(screen.getByTestId("table-body-loader")).toBeInTheDocument();
    expect(screen.getByTestId("execution-time-loader")).toBeInTheDocument();
  });

  test("check if an error screen is displayed when the server returns an error", async () => {
    server.use(
      rest.get("/", (_req, res, ctx) =>
        res(
          ctx.json({
            success: false,
            body: "A server internal error occured",
          })
        )
      )
    );

    render(<App />);

    expect(
      await screen.findByText("Oops something bad happened!!")
    ).toBeInTheDocument();
  });

  test("Check if the server is called", async () => {
    render(<App />);

    expect(
      screen.queryByText("Oops something bad happened!!")
    ).not.toBeInTheDocument();
  });
});
