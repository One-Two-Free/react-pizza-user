import React from 'react';

import styles from './Search.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <input
        value={searchValue}
        placeholder="Search for pizza"
        onChange={(event) => setSearchValue(event.target.value)}
      />
      {searchValue.length > 0 && (
        <button onClick={() => setSearchValue('')} className={styles.clear}>
          x
        </button>
      )}
    </div>
  );
};

export default Search;
