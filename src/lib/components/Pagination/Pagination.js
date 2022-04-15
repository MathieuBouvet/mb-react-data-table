import cx from "classnames";
import PropTypes from "prop-types";

import getPages, { ELISPSIS_MARKER } from "../../utils/getPages";

import styles from "./pagination.module.css";

const Pagination = ({
  currentPage,
  pageTotal,
  setCurrentPage = () => {},
  incrementPage = () => {},
  className,
  paginationButtonClassName,
  activeClassName,
}) => {
  const pages = getPages(currentPage, pageTotal);

  const isPreviousDisabled = currentPage === 1 || pageTotal === 0;
  const isNextDisabled = currentPage === pageTotal || pageTotal === 0;

  const goPrevious = () => !isPreviousDisabled && incrementPage(-1);
  const goNext = () => !isNextDisabled && incrementPage(1);

  return (
    <div className={cx(styles.pagination, className)}>
      <button
        onClick={goPrevious}
        disabled={isPreviousDisabled}
        className={cx(styles.paginationButton, paginationButtonClassName)}
      >
        Previous
      </button>
      {pages.map((page, index) =>
        page === ELISPSIS_MARKER ? (
          <div key={`ellipsis-${index}`} className={styles.ellipsis} />
        ) : (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={cx(styles.paginationButton, paginationButtonClassName, {
              [styles.currentPage]: page === currentPage,
              [activeClassName]: page === currentPage,
            })}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={goNext}
        disabled={isNextDisabled}
        className={cx(styles.paginationButton, paginationButtonClassName)}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageTotal: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func,
  incrementPage: PropTypes.func,
  className: PropTypes.string,
  paginationButtonClassName: PropTypes.string,
  activeClassName: PropTypes.string,
};

export default Pagination;
