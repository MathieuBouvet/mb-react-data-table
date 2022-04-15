import { defaultFormater } from "./defaultFormater";

function entrySearcher(searchedValue, columns) {
  const lowerCasedSearchValue = searchedValue.toLowerCase();
  return entry => {
    return columns.some(({ dataKey, formater }) => {
      const format = formater ?? defaultFormater;
      return format(entry[dataKey])
        .toString()
        .toLowerCase()
        .includes(lowerCasedSearchValue);
    });
  };
}

export default entrySearcher;
