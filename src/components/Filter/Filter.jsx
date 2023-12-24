// Filter.jsx

import css from './filter.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {filterContact} from '../../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.filter);

  const handleFilterChange = (event) => {
    const newFilterValue = event.target.value;
    dispatch(filterContact(newFilterValue));
  };

  return (
    <>
      <h3>Find contacts by name</h3>
      <input className={css.input}
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Make contact"
      />
    </>
  );
};

export default Filter;