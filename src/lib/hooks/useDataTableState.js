import { useReducer } from "react";

import { reducer, getInitialState } from "./dataTableReducer/reducer";
import actions from "./dataTableReducer/actions";

function useDataTableState(initialEntriesNumber) {
  const [state, dispatch] = useReducer(
    reducer,
    initialEntriesNumber,
    getInitialState
  );

  const setSearch = search => dispatch(actions.setSearch(search));
  const setCurrentPage = page => dispatch(actions.setCurrentPage(page));
  const incrementPage = amount => dispatch(actions.incrementPage(amount));
  const setEntriesNumber = number => dispatch(actions.setEntriesNumber(number));

  return [
    state,
    {
      setSearch,
      setCurrentPage,
      incrementPage,
      setEntriesNumber,
    },
  ];
}

export default useDataTableState;
