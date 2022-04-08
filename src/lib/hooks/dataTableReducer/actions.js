import Types from "./types";

function setSearch(value) {
  return {
    type: Types.setSearch,
    payload: value,
  };
}

function setCurrentPage(currentPage) {
  return {
    type: Types.setCurrentPage,
    payload: currentPage,
  };
}

function incrementPage(amount) {
  return {
    type: Types.incrementPage,
    payload: amount,
  };
}

function setEntriesNumber(entriesNumber) {
  return {
    type: Types.setEntriesNumber,
    payload: entriesNumber,
  };
}

const actions = {
  setSearch,
  setCurrentPage,
  incrementPage,
  setEntriesNumber,
};

export default actions;
