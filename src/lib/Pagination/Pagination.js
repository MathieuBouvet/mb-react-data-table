import cx from "classnames";
import PropTypes from "prop-types";

import getPages, { ELISPSIS_MARKER } from "../utils/getPages";

import styles from "./pagination.module.css";

const Pagination = ({
  currentPage,
  pageTotal,
  setCurrentPage = () => {},
  incrementPage = () => {},
}) => {
  const pages = getPages(currentPage, pageTotal);

  const isPreviousDisabled = currentPage === 1 || pageTotal === 0;
  const isNextDisabled = currentPage === pageTotal || pageTotal === 0;

  const goPrevious = () => !isPreviousDisabled && incrementPage(-1);
  const goNext = () => !isNextDisabled && incrementPage(1);

  return (
    <div className={styles.pagination}>
      <button
        onClick={goPrevious}
        disabled={isPreviousDisabled}
        className={styles.paginationButton}
      >
        Previous
      </button>
      {pages.map((page, index) =>
        page === ELISPSIS_MARKER ? (
          <div key={`elipsis-${index}`} className={styles.elipsis}>
            ...
          </div>
        ) : (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={cx(styles.paginationButton, {
              [styles.currentPage]: page === currentPage,
            })}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={goNext}
        disabled={isNextDisabled}
        className={styles.paginationButton}
      >
        next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageTotal: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func,
  incrementPage: PropTypes.func,
};

export default Pagination;
