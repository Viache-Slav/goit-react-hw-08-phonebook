// store.js

import { configureStore } from '@reduxjs/toolkit';
import {contactsReducer} from './contactsSlice';
import { filtersReducer } from './filterSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filtersReducer,
  },
});

export default store;
