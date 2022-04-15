import { render, screen, fireEvent, within } from "@testing-library/react";

import {
  defaultSortingTestData,
  customSortFunctionTestData,
} from "../testUtils/testData";
import ReactDataTable from "../lib/ReactDataTable";

test("sorting by default", () => {
  render(
    <ReactDataTable columns={[{ name: "strings", dataKey: "string" }]}>
      {defaultSortingTestData}
    </ReactDataTable>
  );

  const tableBody = screen.getByTestId("table-body");
  const stringColumnButton = screen.getByRole("button", { name: /strings/ });
  
  fireEvent.click(stringColumnButton);
  const rowsAsc = within(tableBody).getAllByRole("row");
  const sortedAsc = rowsAsc.map(row => row.textContent);
  expect(sortedAsc).toEqual(["a", "b", "c", "d", "e", "f"]);

  fireEvent.click(stringColumnButton);
  const rowsDesc = within(tableBody).getAllByRole("row");
  const sortedDesc = rowsDesc.map(row => row.textContent);
  expect(sortedDesc).toEqual(["f", "e", "d", "c", "b", "a"]);

  fireEvent.click(stringColumnButton);
  const rowsInitial = within(tableBody).getAllByRole("row");
  const initialOrder = rowsInitial.map(row => row.textContent);
  expect(initialOrder).toEqual(["c", "b", "a", "d", "f", "e"]);
});

test("sorting with custom sort function", () => {
  render(
    <ReactDataTable
      columns={[
        { name: "numbers", dataKey: "number", sortFn: (a, b) => a - b },
      ]}
    >
      {customSortFunctionTestData}
    </ReactDataTable>
  );

  const tableBody = screen.getByTestId("table-body");
  const numberColumnButton = screen.getByRole("button", { name: /numbers/ });

  fireEvent.click(numberColumnButton);
  const rowsAsc = within(tableBody).getAllByRole("row");
  const sortedAsc = rowsAsc.map(row => Number(row.textContent));
  expect(sortedAsc).toEqual([1, 2, 3, 4, 5, 6, 11]);

  fireEvent.click(numberColumnButton);
  const rowsDesc = within(tableBody).getAllByRole("row");
  const sortedDesc = rowsDesc.map(row => Number(row.textContent));
  expect(sortedDesc).toEqual([11, 6, 5, 4, 3, 2, 1]);

  fireEvent.click(numberColumnButton);
  const rowsInitial = within(tableBody).getAllByRole("row");
  const initialOrder = rowsInitial.map(row => Number(row.textContent));
  expect(initialOrder).toEqual([3, 4, 1, 11, 2, 6, 5]);
});
