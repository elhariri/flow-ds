import "@testing-library/jest-dom";
import { cleanup, screen, render } from "@testing-library/react";
import App from "../App";

afterEach(cleanup);

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
});
