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

function incrementCurrentPage(amount) {
  return {
    type: Types.incrementCurrentPage,
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
  incrementCurrentPage,
  setEntriesNumber,
};

export default actions;
