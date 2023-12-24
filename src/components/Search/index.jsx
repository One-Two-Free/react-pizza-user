import React, { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    inputRef.current.focus();
    setValue('');
    setSearchValue('');
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      console.log('deb = ', str);
      setSearchValue(str);
    }, 350),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  // const onChangeInput = useCallback(
  //   debounce((event) => {
  //     console.log('event =', event);
  //     console.log('event value =', event.target.value);

  //     setSearchValue(event.target.value);
  //   }, 1000),
  // );

  return (
    <div className={styles.root}>
      <input ref={inputRef} value={value} placeholder="Search for pizza" onChange={onChangeInput} />
      {value.length > 0 && (
        <button onClick={() => onClickClear()} className={styles.clear}>
          x
        </button>
      )}
    </div>
  );
};

export default Search;
