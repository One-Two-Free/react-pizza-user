import React, { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const onClickClear = () => {
    inputRef.current.focus();
    setValue('');
    dispatch(setSearchValue(''));
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      console.log('deb = ', str);
      dispatch(setSearchValue(str));
    }, 350),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

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
