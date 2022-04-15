import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { tableData } from "../testUtils/testData";
import ReactDataTable from "../lib/ReactDataTable";

test("restricts the number of displayed entries", () => {
  render(
    <ReactDataTable columns={[{ name: "Column one", dataKey: "number" }]}>
      {tableData}
    </ReactDataTable>
  );
  const tableBody = screen.getByTestId("table-body")
  const rows = within(tableBody).getAllByRole("row");

  expect(rows.length).toBe(10);
});

test("the initial number of displayed entries can be configured", () => {
  render(
    <ReactDataTable
      columns={[{ name: "Column one", dataKey: "number" }]}
      initialEntriesNumber={4}
    >
      {tableData}
    </ReactDataTable>
  );

  const tableBody = screen.getByTestId("table-body")
  const rows = within(tableBody).getAllByRole("row");

  expect(rows.length).toBe(4);
});

test("the user can change the number of displayed entries", async () => {
  render(
    <ReactDataTable
      columns={[{ name: "Column one", dataKey: "number" }]}
      initialEntriesNumber={4}
    >
      {tableData}
    </ReactDataTable>
  );

  const selectBox = screen.getByRole("combobox");
  const option = screen.getByRole("option", { name: "10" });

  await userEvent.selectOptions(selectBox, option);

  const tableBody = screen.getByTestId("table-body")
  const rows = within(tableBody).getAllByRole("row");

  expect(rows.length).toBe(10);
});
