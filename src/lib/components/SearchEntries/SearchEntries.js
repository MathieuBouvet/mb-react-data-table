import cx from "classnames";
import PropTypes from "prop-types";

import styles from "./searchEntries.module.css";

const SearchEntries = ({
  search = "",
  setSearch = () => {},
  className,
  inputClassName,
}) => {
  return (
    <div className={cx(styles.searchEntries, className)}>
      <label>
        Search:
        <input
          className={cx(styles.searchInput, inputClassName)}
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </label>
    </div>
  );
};

SearchEntries.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default SearchEntries;
