import React, { useContext } from 'react';

import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
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
