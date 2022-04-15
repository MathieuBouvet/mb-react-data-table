const simpleData = [{ number: 111, string: "only one" }];

const date = [{ date: new Date("2022-10-01") }];

const tableData = [
  { number: 111, string: "one", date: new Date("2022-12-01") },
  { number: 222, string: "two", date: new Date("2022-11-02") },
  { number: 333, string: "three", date: new Date("2022-10-03") },
  { number: 444, string: "four", date: new Date("2022-09-04") },
  { number: 555, string: "five", date: new Date("2022-08-05") },
  { number: 666, string: "six", date: new Date("2022-07-06") },
  { number: 777, string: "seven", date: new Date("2022-06-07") },
  { number: 888, string: "eight", date: new Date("2022-05-08") },
  { number: 999, string: "nine", date: new Date("2022-04-09") },
  { number: 1010, string: "ten", date: new Date("2022-03-10") },
  { number: 1111, string: "eleven", date: new Date("2022-02-11") },
  { number: 1212, string: "twelve", date: new Date("2022-01-12") },
];

const filteringTestData = [
  { string: "match row 1", object: { test: "format match 1" } },
  { string: "match row 2", object: { test: "format match 2" } },
  { string: "match row 3", object: { test: "no" } },
  { string: "match row 4", object: { test: "no" } },
  { string: "not in query 1", object: { test: "no" } },
  { string: "not in query 2", object: { test: "format match 3" } },
  { string: "not in query 3", object: { test: "no" } },
  { string: "not in query 4", object: { test: "no" } },
  { string: "match row 5", object: { test: "no" } },
  { string: "not in query 3", object: { test: "format match 4" } },
  { string: "not in query 4", object: { test: "no" } },
  { string: "match row 6", object: { test: "no" } },
];

const defaultSortingTestData = [
  { string: "c" },
  { string: "b" },
  { string: "a" },
  { string: "d" },
  { string: "f" },
  { string: "e" },
];

const customSortFunctionTestData = [
  { number: 3 },
  { number: 4 },
  { number: 1 },
  { number: 11 },
  { number: 2 },
  { number: 6 },
  { number: 5 },
];

export {
  simpleData,
  tableData,
  date,
  filteringTestData,
  defaultSortingTestData,
  customSortFunctionTestData,
};
