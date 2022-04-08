import Types from "./types";

function getInitialState(initialEntriesNumber) {
  return {
    entriesNumber: initialEntriesNumber,
    currentPage: 1,
    search: "",
  };
}

function reducer(state, action) {
  switch (action.type) {
    case Types.setSearch: {
      return {
        ...state,
        search: action.payload,
        currentPage: 1,
      };
    }
    case Types.setCurrentPage: {
      return { ...state, currentPage: action.payload };
    }
    case Types.incrementPage: {
      return { ...state, currentPage: state.currentPage + action.payload };
    }
    case Types.setEntriesNumber: {
      const currentEntryIndex = (state.currentPage - 1) * state.entriesNumber;
      const firstPageShowingCurrentEntry = Math.floor(
        currentEntryIndex / action.payload
      ) + 1;
      return {
        ...state,
        currentPage: firstPageShowingCurrentEntry,
        entriesNumber: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export { reducer, getInitialState };
