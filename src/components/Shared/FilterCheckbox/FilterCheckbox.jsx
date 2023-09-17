import PropTypes from 'prop-types';
import React from 'react';

import useInput from '../../../hooks/useInput';

import './FilterCheckbox.css';


const FilterCheckbox = ({...props}) => {
  const {inputValue, handleInputChange} = useInput();
  
  return (
    <label className="filter-checkbox" htmlFor="filter-checkbox">
      <input
        id="filter-checkbox"
        className="filter-checkbox__original-checkbox"
        onChange={handleInputChange}
        checked={inputValue || false}
        {...props}
      />
      <span className="filter-checkbox__custom-checkbox"></span>
    </label>
  );
};

FilterCheckbox.propTypes = {
  onUpdate: PropTypes.func,
  name: PropTypes.string
};

export default FilterCheckbox;