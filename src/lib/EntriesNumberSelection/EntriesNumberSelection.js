import PropTypes from "prop-types";

import styles from "./entriesNumberSelection.module.css";

const availableNumbers = [10, 25, 50, 100];

const EntriesNumberSelection = ({
  entriesNumber,
  setEntriesNumber = () => {},
  initialEntriesNumber,
}) => {
  const isDefaultInAvailable = availableNumbers.find(
    number => number === initialEntriesNumber
  );

  const allAvailableNumbers = isDefaultInAvailable
    ? availableNumbers
    : [...availableNumbers, initialEntriesNumber].sort((a, b) => a - b);

  return (
    <div className={styles.entriesNumberSelection}>
      Show
      <select
        value={entriesNumber}
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
  entriesNumber: PropTypes.number.isRequired,
  setEntriesNumber: PropTypes.func,
  initialEntriesNumber: PropTypes.number,
};

export default EntriesNumberSelection;
