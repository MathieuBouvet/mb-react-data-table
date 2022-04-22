import cx from "classnames";
import PropTypes from "prop-types";

import styles from "./entriesNumberSelection.module.css";

const EntriesNumberSelection = ({
  selectedNumber,
  setEntriesNumber = () => {},
  availableNumbers = [10, 25, 50, 100],
  className,
}) => {
  const isSelectedInAvailable = availableNumbers.find(
    number => number === selectedNumber
  );

  const allAvailableNumbers = isSelectedInAvailable
    ? availableNumbers
    : [selectedNumber, ...availableNumbers].sort((a, b) => a - b);

  return (
    <div className={cx(styles.entriesNumberSelection, className)}>
      Show
      <select
        value={selectedNumber}
        onChange={e => setEntriesNumber(Number(e.target.value))}
      >
        {allAvailableNumbers.map(number => (
          <option key={number}>{number}</option>
        ))}
      </select>
      entries
    </div>
  );
};

EntriesNumberSelection.propTypes = {
  selectedNumber: PropTypes.number.isRequired,
  setEntriesNumber: PropTypes.func,
  availableNumbers: PropTypes.arrayOf(PropTypes.number),
  className: PropTypes.string,
};

export default EntriesNumberSelection;
