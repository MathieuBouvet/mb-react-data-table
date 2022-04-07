function entrySearcher(searchedValue, entryKeys) {
  const lowerCasedSearchValue = searchedValue.toLowerCase();
  return entry => {
    return entryKeys.some(key =>
      entry[key]?.toString().toLowerCase().includes(lowerCasedSearchValue)
    );
  };
}

export default entrySearcher;
