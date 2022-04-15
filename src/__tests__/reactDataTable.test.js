import { render, screen } from "@testing-library/react";

import { simpleData, date } from "../testUtils/testData";
import ReactDataTable from "../lib/ReactDataTable";

test("renders the data", () => {
  render(
    <ReactDataTable
      columns={[
        { name: "Column one", dataKey: "number" },
        { name: "Column two", dataKey: "string" },
      ]}
    >
      {simpleData}
    </ReactDataTable>
  );
  const columnOne = screen.getByText(/Column one/);
  const columnTwo = screen.getByText(/Column two/);

  const numberData = screen.getByText(/111/);
  const stringData = screen.getByText(/only one/);

  expect(columnOne).toBeInTheDocument();
  expect(columnTwo).toBeInTheDocument();
  expect(numberData).toBeInTheDocument();
  expect(stringData).toBeInTheDocument();
});

test("restricts the displayed data based on the columns", () => {
  render(
    <ReactDataTable columns={[{ name: "Column one", dataKey: "number" }]}>
      {simpleData}
    </ReactDataTable>
  );
  const numberData = screen.getByText(/111/);
  const stringData = screen.queryByText(/only one/);

  expect(numberData).toBeInTheDocument();
  expect(stringData).toBe(null);
});

test("formats the data", () => {
  render(
    <ReactDataTable
      columns={[
        {
          name: "Column one",
          dataKey: "date",
          formater: data => data.getTime(),
        },
      ]}
    >
      {date}
    </ReactDataTable>
  );

  const data = screen.getByText(/1664582400000/);
  expect(data).toBeInTheDocument();
});
