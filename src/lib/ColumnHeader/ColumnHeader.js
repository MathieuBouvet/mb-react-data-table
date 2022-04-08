import cx from "classnames";
import PropTypes from "prop-types";

import { SortStatus } from "../utils/sortStatus";

import styles from "./columnHeader.module.css";

const ColumnHeader = ({ onClick = () => {}, sortStatus, children }) => {
  return (
    <th>
      <button className={styles.sortColumnButton} onClick={onClick}>
        {children}
        <span className={styles.carets}>
          <span
            className={cx(styles.caret, styles.caretUp, {
              [styles.active]: sortStatus === SortStatus.asc,
            })}
          />
          <span
            className={cx(styles.caret, styles.caretDown, {
              [styles.active]: sortStatus === SortStatus.desc,
            })}
          />
        </span>
      </button>
    </th>
  );
};

ColumnHeader.propTypes = {
  onClick: PropTypes.func,
  sortStatus: PropTypes.oneOf(Object.values(SortStatus)),
  children: PropTypes.string,
};

export default ColumnHeader;
