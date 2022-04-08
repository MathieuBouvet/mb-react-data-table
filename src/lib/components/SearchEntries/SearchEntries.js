import PropTypes from "prop-types";

import styles from "./searchEntries.module.css";

const SearchEntries = ({ search = "", setSearch = () => {} }) => {
  return (
    <div className={styles.searchEntries}>
      <label>
        Search:
        <input
          className={styles.searchInput}
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
  seatSearch: PropTypes.func,
};

export default SearchEntries;
