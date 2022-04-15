import { render, screen, fireEvent, within } from "@testing-library/react";

import { tableData } from "../testUtils/testData";
import ReactDataTable from "../lib/ReactDataTable";

test("next page button", () => {
  render(
    <ReactDataTable columns={[{ name: "Column one", dataKey: "string" }]}>
      {tableData}
    </ReactDataTable>
  );

  const nextButton = screen.getByRole("button", { name: /Next/ });
  fireEvent.click(nextButton);

  const tableBody = screen.getByTestId("table-body");
  const rows = within(tableBody).getAllByRole("row");
  const eleventhCell = screen.getByText(/eleven/);
  const twelvethCell = screen.getByText(/twelve/);

  expect(rows.length).toBe(2);
  expect(eleventhCell).toBeInTheDocument();
  expect(twelvethCell).toBeInTheDocument();
});

test("previous page button", () => {
  render(
    <ReactDataTable columns={[{ name: "Column one", dataKey: "string" }]}>
      {tableData}
    </ReactDataTable>
  );

  const nextButton = screen.getByRole("button", { name: /Next/ });
  const previousButton = screen.getByRole("button", { name: /Previous/ });

  fireEvent.click(nextButton);
  fireEvent.click(previousButton);

  const tableBody = screen.getByTestId("table-body");
  const rows = within(tableBody).getAllByRole("row");
  const eleventhCell = screen.queryByText(/eleven/);
  const twelvethCell = screen.queryByText(/twelve/);

  expect(rows.length).toBe(10);
  expect(eleventhCell).toBe(null);
  expect(twelvethCell).toBe(null);
});

test("direct page access", () => {
  render(
    <ReactDataTable
      columns={[{ name: "Column one", dataKey: "string" }]}
      initialEntriesNumber={2}
    >
      {tableData}
    </ReactDataTable>
  );

  const page3Button = screen.getByRole("button", { name: /3/ });
  fireEvent.click(page3Button);

  const tableBody = screen.getByTestId("table-body");
  const rows = within(tableBody).getAllByRole("row");
  const five = screen.getByText(/five/);
  const six = screen.getByText(/six/);

  expect(rows.length).toBe(2);
  expect(five).toBeInTheDocument();
  expect(six).toBeInTheDocument();
});

test("previous page button is disabled on first page", () => {
  render(
    <ReactDataTable columns={[{ name: "Column one", dataKey: "string" }]}>
      {tableData}
    </ReactDataTable>
  );
  const previous = screen.getByRole("button", { name: /Previous/ });

  expect(previous).toBeDisabled();
});

test("next page button is disabled on last page", () => {
  render(
    <ReactDataTable columns={[{ name: "Column one", dataKey: "string" }]}>
      {tableData}
    </ReactDataTable>
  );
  const nextButton = screen.getByRole("button", { name: /Next/ });
  fireEvent.click(nextButton);

  expect(nextButton).toBeDisabled();
});
