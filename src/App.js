import "./App.css";
import ReactDataTable from "./lib/ReactDataTable";

function App() {
  const testHeader = [
    { name: "test 1", dataKey: "one" },
    { name: "test 2", dataKey: "two" },
    { name: "test 3", dataKey: "three" },
  ];
  const testData = [
    { one: "1", two: "second value", three: 3 },
    { one: "2", two: "second value", three: "row 2 but 3" },
    { one: "3", two: "value of 2", three: 42 },
    { one: "4", two: "second value", three: 3 },
    { one: "5", two: "second value", three: 3 },
    { one: "6", two: "second value", three: 3 },
    { one: "7", two: "second value", three: "row 2 but 3" },
    { one: "8", two: "value of 2", three: 42 },
    { one: "9", two: "second value", three: 3 },
    { one: "10", two: "second value", three: 3 },
    { one: "11", two: "second value", three: 3 },
    { one: "12", two: "second value", three: "row 2 but 3" },
    { one: "13", two: "value of 2", three: 42 },
    { one: "14", two: "second value", three: 3 },
    { one: "15", two: "second value", three: 3 },
    { one: "16", two: "second value", three: 3 },
    { one: "17", two: "second value", three: "row 2 but 3" },
    { one: "18", two: "value of 2", three: 42 },
    { one: "19", two: "second value", three: 3 },
    { one: "20", two: "second value", three: 3 },
  ];
  return (
    <div className="App">
      <ReactDataTable
        columns={testHeader}
        className="table"
        initialEntriesNumber={3}
      >
        {testData}
      </ReactDataTable>
    </div>
  );
}

export default App;
