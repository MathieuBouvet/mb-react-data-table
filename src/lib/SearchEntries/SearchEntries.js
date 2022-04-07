import PropTypes from "prop-types";

import styles from "./searchEntries.module.css";

const SearchEntries = ({ value = "", setValue = () => {} }) => {
  return (
    <div className={styles.searchEntries}>
      <label>
        Search:
        <input
          className={styles.searchInput}
          type="search"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </label>
    </div>
  );
};

SearchEntries.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default SearchEntries;
