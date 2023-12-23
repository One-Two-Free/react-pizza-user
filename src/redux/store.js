import { configureStore } from '@reduxjs/toolkit';

import filter from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    filter,
  },
});

// console.log('store', store);
// console.log('store.getstate', store.getState());
