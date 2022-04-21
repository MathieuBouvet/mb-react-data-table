# React Data Table

**WARNING : as this is a school project, I will not maintain nor provide support for it**

A simple react library for displaying data as an html table. Features pagination, filtering results and column sorting with realtive ease of style customization.

## Installation

```console
npm i mb-react-data-table
```

## Basic usage

### Import the component:

```js
import DataTable from "mb-react-data-table";
```

### Define your data as an array of object :

```js
const data = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 32,
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    age: 26,
  },
];
```

### Configure your columns

the **_name_** attribute will be displayed as column header, the **_dataKey_** attribute will reference the attribute of the data object

```js
const columns = [
  {
    name: "First Name",
    dataKey: "firstName",
  },
  {
    name: "Last Name",
    dataKey: "lastName",
  },
  {
    name: "Age",
    dataKey: "age",
  },
];
```

### Use the component

```js
import DataTable from "mb-react-data-table";

const App = () => {
  const data = [
    {
      firstName: "John",
      lastName: "Doe",
      age: 32,
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      age: 26,
    },
  ];

  const columns = [
    {
      name: "First Name",
      dataKey: "firstName",
    },
    {
      name: "Last Name",
      dataKey: "lastName",
    },
    {
      name: "Age",
      dataKey: "age",
    },
  ];

  return <DataTable columns={columns}>{data}</DataTable>;
};
```

### Result

![](./public/basic-usage.png)

## More usages

### Custom sort function

By default the sorting is done lexicographically. If you need another sorting mechanism, you can provide a custom sort function in the header configuration.

For example in the above case, to sort on the **_age_** attribute :

```js
const columns = [
  {
    name: "First Name",
    dataKey: "firstName",
  },
  {
    name: "Last Name",
    dataKey: "lastName",
  },
  {
    name: "Age",
    dataKey: "age",
    sortFn: (a, b) => a - b,
  },
];
```

The **_sortFn_** will receive the values of the **_age_** attributes and must return a number, just like the [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) **_compareFn_** parameter.

You only need to specify a sortFn that sorts in ascending order. The descending order is handled by the library by taking the opposite of your **_sortFn_** returned value.

### Objects in data and formating

Sometimes your data will contain some non-primitive values, like Date objects

```js
const data = [
  {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: new Date("1991-03-12"),
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    dateOfBirth: new Date("1989-05-23"),
  },
];
```

By default the library will format the value using the **.toString()** method. If you need another formating logic, you can provide a formater function in the columns configuration :

```js
const columns = [
  {
    name: "First Name",
    dataKey: "firstName",
  },
  {
    name: "Last Name",
    dataKey: "lastName",
  },
  {
    name: "Date of Birth",
    dataKey: "dateOfBirth",
    formater: date => date.toLocaleDateString(),
  },
];
```

### Row key

Since the component renders a list of rows, react needs a unique key attribute to be set on each row.

If your data contains an **_id_** attribute, for example:

```js
const data = [
  {
    id: "394d6c90-2763-49e6-b270-a4f41659e2b2",
    firstName: "John",
    lastName: "Doe",
    age: 32,
  },
  {
    id: "4ffa6b7f-1df3-448d-8eb9-a22a5a69ca89",
    firstName: "Jane",
    lastName: "Doe",
    age: 26,
  },
];
```

it will automatically be used as the key for each row.

You can also customize the generated key by passing a function in the prop **_rowKeyProducer_**. This function will receive the data object and must returns a string. For example :

```js
import DataTable from "mb-react-data-table";

const App = () => {
  const data = [
    {
      firstName: "John",
      lastName: "Doe",
      age: 32,
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      age: 26,
    },
  ];

  const columns = [
    {
      name: "First Name",
      dataKey: "firstName",
    },
    {
      name: "Last Name",
      dataKey: "lastName",
    },
    {
      name: "Age",
      dataKey: "age",
    },
  ];

  return (
    <DataTable
      columns={columns}
      rowKeyProducer={data => `${data.firstName}-${data.lastName}-${data.age}`}
    >
      {data}
    </DataTable>
  );
};
```

The returned value will be used as the key for the row, so it must be unique among rows, otherwise react will throw the warning about non-unique keys

## Styling

### Simple color styling

In case you need to change the colors of

- the border color of the table
- the border color of the rows
- the backgound color of even rows
- the background color of odd rows

You can override some css custom properties used by the component.

Create a class and set the custom properties you want to override:

```css
.table {
  --table-border-color: red;
  --row-border-color: lightgreen;
  --row-even-bg-color: aliceBlue;
  --row-odd-bg-color: lightyellow;
}
```

Apply this class to the component :

```js
<DataTable columns={columns} className="table">
  {data}
</DataTable>
```

Results :

![](./public/css-var-override.png)

_you may need to increase your css rule specificity to properly override the defaults_

### More controls over styling

If you need to apply more styles, you can pass classNames to the component :

```js
<DataTable
  columns={columns}
  className="className" // will be applied to the main component
  tableClassName="tableClassName" // will be applied to the table element
  headerClassName="headerClassName" // will be applied to the tr element that contains the th elements
  rowClassName="rowClassName" // will be applied to all the tr elements that contains the td elements
  cellClassName="cellClassName" // will be applied to all the td elements
>
  {data}
</DataTable>
```
