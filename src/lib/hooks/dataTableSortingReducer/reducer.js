const initialState = {
  sortColumn: null,
  sortAsc: true,
};

function reducer(state, columnKey) {
  if (columnKey !== state.sortColumn) {
    return {
      ...state,
      sortColumn: columnKey,
      sortAsc: true,
    };
  }
  if (state.sortAsc) {
    return {
      ...state,
      sortAsc: false,
    };
  }
  return {
    ...state,
    sortColumn: null,
    sortAsc: true,
  };
}

export {reducer, initialState}
