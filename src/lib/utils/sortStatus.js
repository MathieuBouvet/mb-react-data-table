const SortStatus = {
  not: "not",
  asc: "asc",
  desc: "desc",
};

function getSortStatus(isColumnSorted, sortedAsc) {
  if (!isColumnSorted) {
    return SortStatus.not;
  }
  return sortedAsc ? SortStatus.asc : SortStatus.desc;
}

export { SortStatus, getSortStatus };
