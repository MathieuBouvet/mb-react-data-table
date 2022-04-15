import { render, screen, fireEvent, within } from "@testing-library/react";

import { filteringTestData } from "../testUtils/testData";
import ReactDataTable from "../lib/ReactDataTable";

test("the user can filter the results", () => {
  render(
    <ReactDataTable columns={[{ name: "Column one", dataKey: "string" }]}>
      {filteringTestData}
    </ReactDataTable>
  );
  const searchInput = screen.getByRole("searchbox");
  fireEvent.input(searchInput, { target: { value: "match" } });

  const tableBody = screen.getByTestId("table-body");
  const rows = within(tableBody).getAllByRole("row");

  expect(rows.length).toBe(6);
});

test("the filtering works with the data formater", () => {
  render(
    <ReactDataTable
      columns={[
        { name: "Column one", dataKey: "object", formater: data => data.test },
      ]}
    >
      {filteringTestData}
    </ReactDataTable>
  );
  const searchInput = screen.getByRole("searchbox");
  fireEvent.input(searchInput, { target: { value: "match" } });

  const tableBody = screen.getByTestId("table-body");
  const rows = within(tableBody).getAllByRole("row");

  expect(rows.length).toBe(4);
});

test("displays the no results found message", () => {
  render(
    <ReactDataTable columns={[{ name: "Column one", dataKey: "string" }]}>
      {filteringTestData}
    </ReactDataTable>
  );
  const searchInput = screen.getByRole("searchbox");
  fireEvent.input(searchInput, { target: { value: "blblabbklaba" } });

  const noResultMessage = screen.getByText(/No matching record found/);

  expect(noResultMessage).toBeInTheDocument();
});
