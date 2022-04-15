import cx from "classnames";
import PropTypes from "prop-types";

import useDataTableState from "./hooks/useDataTableState";
import useDataTableSorting from "./hooks/useDataTableSorting";

import EntriesNumberSelection from "./components/EntriesNumberSelection";
import SearchEntries from "./components/SearchEntries";
import Pagination from "./components/Pagination";
import ColumnHeader from "./components/ColumnHeader/index";

import entrySearcher from "./utils/entrySearcher";
import {
  defaultSortFn,
  getDescendingSortFn,
  getColumnSortFn,
} from "./utils/entrySort";
import { getSortStatus } from "./utils/sortStatus";
import { defaultFormater } from "./utils/defaultFormater";

import styles from "./reactDataTable.module.css";

const ReactDataTable = ({
  className,
  columns,
  children,
  initialEntriesNumber = 10,
  rowKeyProducer = row => row.id,
  renderEntriesNumberSelection = props => <EntriesNumberSelection {...props} />,
  renderSearchEntries = props => <SearchEntries {...props} />,
  renderPagination = props => <Pagination {...props} />,
  renderColumnHeader = props => <ColumnHeader {...props} />,
  tableClassName,
  headerClassName,
  rowClassName,
  cellClassName,
}) => {
  const [
    { entriesNumber, search, currentPage },
    { setSearch, setEntriesNumber, setCurrentPage, incrementPage },
  ] = useDataTableState(initialEntriesNumber);

  const [{ sortColumn, sortAsc }, sortColumnClicked] = useDataTableSorting();

  const searchedEntries = children.filter(entrySearcher(search, columns));

  if (sortColumn != null) {
    const baseSortFn =
      columns.find(column => column.dataKey === sortColumn)?.sortFn ??
      defaultSortFn;
    const finalSortFn = sortAsc ? baseSortFn : getDescendingSortFn(baseSortFn);

    searchedEntries.sort(getColumnSortFn(finalSortFn, sortColumn));
  }

  const startIndex = (currentPage - 1) * entriesNumber;
  const endIndex = startIndex + entriesNumber;

  const entries = searchedEntries.slice(startIndex, endIndex);
  const hasEntries = entries.length > 0;
  const pageTotal = Math.ceil(searchedEntries.length / entriesNumber);

  return (
    <div className={cx(className, styles.reactDataTable)}>
      <div className={styles.controls}>
        {renderEntriesNumberSelection({
          selectedNumber: entriesNumber,
          initiallySelectedNumber: initialEntriesNumber,
          setEntriesNumber,
        })}
        {renderSearchEntries({ search, setSearch })}
      </div>
      <table className={cx(styles.table, tableClassName)}>
        <thead>
          <tr className={cx(styles.headers, headerClassName)}>
            {columns.map(({ name, dataKey }) =>
              renderColumnHeader({
                name,
                key: dataKey,
                onClick: () => sortColumnClicked(dataKey),
                sortStatus: getSortStatus(sortColumn === dataKey, sortAsc),
              })
            )}
          </tr>
        </thead>
        <tbody data-testid="table-body">
          {entries.map((row, index) => (
            <tr
              key={rowKeyProducer(row) ?? index}
              className={cx(styles.row, rowClassName)}
            >
              {columns.map(({ dataKey }, index) => {
                const formater = columns[index]?.formater ?? defaultFormater;
                return (
                  <td key={dataKey} className={cx(styles.cell, cellClassName)}>
                    {formater(row[dataKey])}
                  </td>
                );
              })}
            </tr>
          ))}
          {!hasEntries && (
            <tr className={styles.row}>
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
        {renderPagination({
          currentPage,
          pageTotal,
          setCurrentPage,
          incrementPage,
        })}
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
      formater: PropTypes.func,
    })
  ).isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialEntriesNumber: PropTypes.number,
  rowKeyProducer: PropTypes.func,
  renderEntriesNumberSelection: PropTypes.func,
  renderSearchEntries: PropTypes.func,
  renderPagination: PropTypes.func,
  renderColumnHeader: PropTypes.func,
  tableClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  cellClassName: PropTypes.string,
};

export default ReactDataTable;
