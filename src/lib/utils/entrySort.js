function defaultSortFn(a = "", b = "") {
  return a.toString().localeCompare(b.toString());
}

function getDescendingSortFn(sortFn) {
  return (a, b) => sortFn(b, a);
}

function getColumnSortFn(sortFn, columnKey) {
  return (a, b) => {
    const valueA = a[columnKey];
    const valueB = b[columnKey];
    return sortFn(valueA, valueB);
  };
}

export { defaultSortFn, getDescendingSortFn, getColumnSortFn };
