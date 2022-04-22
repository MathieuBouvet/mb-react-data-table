import cx from "classnames";
import PropTypes from "prop-types";

import { SortStatus } from "../../utils/sortStatus";

import styles from "./columnHeader.module.css";

const ColumnHeader = ({
  onClick = () => {},
  sortStatus = SortStatus.not,
  name,
  className,
  contentClassName,
  activeClassName,
}) => {
  return (
    <th className={cx(styles.columnHeader, className)}>
      <button
        className={cx(styles.sortColumnButton, contentClassName)}
        onClick={onClick}
      >
        {name}
        <span className={styles.carets}>
          <span
            className={cx(styles.caret, styles.caretUp, {
              [styles.active]: sortStatus === SortStatus.asc,
              [activeClassName]: sortStatus === SortStatus.asc,
            })}
          />
          <span
            className={cx(styles.caret, styles.caretDown, {
              [styles.active]: sortStatus === SortStatus.desc,
              [activeClassName]: sortStatus === SortStatus.desc,
            })}
          />
        </span>
      </button>
    </th>
  );
};

ColumnHeader.propTypes = {
  name: PropTypes.string.isRequired,
  sortStatus: PropTypes.oneOf(Object.values(SortStatus)),
  onClick: PropTypes.func,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  activeClassName: PropTypes.string,
};

export default ColumnHeader;
