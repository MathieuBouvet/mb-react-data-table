import cx from "classnames";
import PropTypes from "prop-types";

import useDataTableState from "./hooks/useDataTableState";

import EntriesNumberSelection from "./EntriesNumberSelection";
import SearchEntries from "./SearchEntries";
import Pagination from "./Pagination";

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

  const pageTotal = Math.ceil(children.length / entriesNumber);
  const startIndex = (currentPage - 1) * entriesNumber;
  const endIndex = startIndex + entriesNumber;

  const entries = children.slice(startIndex, endIndex);

  return (
    <div className={cx(className, styles.reactDataTable)}>
      <div className={styles.controls}>
        {renderEntriesNumberSelection(entriesNumber, setEntriesNumber, initialEntriesNumber)}
        {renderSearchEntries(search, setSearch)}
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(({ name, dataKey }) => (
              <th key={dataKey}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((row, index) => (
            <tr key={row.id ?? index}>
              {columns.map(({ dataKey }) => (
                <td key={dataKey}>{row[dataKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.controls}>
        <p>
          showing {startIndex + 1} to {startIndex + entries.length} of{" "}
          {children.length} entries
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
