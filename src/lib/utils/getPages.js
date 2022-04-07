import range from "./range";

const MAX_PAGE_NUMBER_BEFORE_OVERFLOW = 7;
export const ELISPSIS_MARKER = "ELISPSIS_MARKER";

function getPages(currentPage, pageTotal) {
  const isOverflowing = pageTotal > MAX_PAGE_NUMBER_BEFORE_OVERFLOW;
  if (!isOverflowing) {
    return range({ start: 1, end: pageTotal + 1 });
  }
  if (currentPage < 5) {
    return [...range({ start: 1, end: 6 }), ELISPSIS_MARKER, pageTotal];
  }
  if (currentPage > pageTotal - 4) {
    return [
      1,
      ELISPSIS_MARKER,
      ...range({ start: pageTotal - 4, end: pageTotal + 1 }),
    ];
  }
  return [
    ELISPSIS_MARKER,
    ...range({ start: currentPage - 1, end: currentPage + 2 }),
    ELISPSIS_MARKER,
  ];
}

export default getPages;
