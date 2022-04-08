import cx from "classnames";
import PropTypes from "prop-types";

import useDataTableState from "./hooks/useDataTableState";

import EntriesNumberSelection from "./EntriesNumberSelection";
import SearchEntries from "./SearchEntries";
import Pagination from "./Pagination";

import entrySearcher from "./utils/entrySearcher";

import styles from "./reactDataTable.module.css";

const ReactDataTable = ({
  className,
  columns,
  children,
  initialEntriesNumber = 10,
  renderEntriesNumberSelection = (nb, setNb, initialNb) => (
    <EntriesNumberSelection
      entriesNumber={nb}
      setEntriesNumber={setNb}
      initialEntriesNumber={initialNb}
    />
  ),
  renderSearchEntries = (value, setValue) => (
    <SearchEntries value={value} setValue={setValue} />
  ),
  renderPagination = (
    currentPage,
    pageTotal,
    setCurrentPage,
    incrementPage
  ) => (
    <Pagination
      currentPage={currentPage}
      pageTotal={pageTotal}
      setCurrentPage={setCurrentPage}
      incrementPage={incrementPage}
    />
  ),
}) => {
  const [
    { entriesNumber, search, currentPage },
    { setSearch, setEntriesNumber, setCurrentPage, incrementCurrentPage },
  ] = useDataTableState(initialEntriesNumber);

  const startIndex = (currentPage - 1) * entriesNumber;
  const endIndex = startIndex + entriesNumber;

  const searchedEntries = children.filter(
    entrySearcher(
      search,
      columns.map(column => column.dataKey)
    )
  );
  const entries = searchedEntries.slice(startIndex, endIndex);
  const hasEntries = entries.length > 0;
  const pageTotal = Math.ceil(searchedEntries.length / entriesNumber);

  return (
    <div className={cx(className, styles.reactDataTable)}>
      <div className={styles.controls}>
        {renderEntriesNumberSelection(
          entriesNumber,
          setEntriesNumber,
          initialEntriesNumber
        )}
        {renderSearchEntries(search, setSearch)}
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headers}>
            {columns.map(({ name, dataKey }) => (
              <th key={dataKey}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((row, index) => (
            <tr key={row.id ?? index} className={styles.row}>
              {columns.map(({ dataKey }) => (
                <td key={dataKey}>{row[dataKey]}</td>
              ))}
            </tr>
          ))}
          {!hasEntries && (
            <tr>
              <td colSpan={columns.length}>No matching record found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.controls}>
        <p>
          showing {hasEntries ? startIndex + 1 : 0} to{" "}
          {startIndex + entries.length} of {searchedEntries.length} entries
          {search !== "" && ` (filtered from ${children.length} total entries)`}
        </p>
        {renderPagination(
          currentPage,
          pageTotal,
          setCurrentPage,
          incrementCurrentPage
        )}
      </div>
    </div>
  );
};

ReactDataTable.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      dataKey: PropTypes.string.isRequired,
      sortFn: PropTypes.func,
    })
  ).isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialEntriesNumber: PropTypes.number,
  renderEntriesNumberSelection: PropTypes.func,
  renderSearchEntries: PropTypes.func,
  renderPagination: PropTypes.func,
};

export default ReactDataTable;
