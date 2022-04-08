import { useReducer } from "react";
import { reducer, initialState } from "./dataTableSortingReducer/reducer";

function useDataTableSorting() {
  return useReducer(reducer, initialState);
}

export default useDataTableSorting;
