import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import useInput from '../../../hooks/useInput';

import './FilterCheckbox.css';


const FilterCheckbox = ({defaultValue, onUpdate, name, ...props}) => {
  const {inputName, inputValue, handleInputChange} = useInput(name, defaultValue);
  
  // console.log('defaultValue', defaultValue);
  
  useEffect(() => {
    // console.log('defaultValue', defaultValue);
    // console.log('inputValue', inputValue);
    if (inputValue !== undefined) {
      onUpdate(inputName, inputValue);
    }
  }, [inputValue]);
  
  return (
    <label className="filter-checkbox" htmlFor="filter-checkbox">
      <input
        id="filter-checkbox"
        className="filter-checkbox__original-checkbox"
        onChange={handleInputChange}
        checked={inputValue || false}
        name={name}
        {...props}
      />
      <span className="filter-checkbox__custom-checkbox"></span>
    </label>
  );
};

FilterCheckbox.propTypes = {
  defaultValue: PropTypes.bool,
  onUpdate: PropTypes.func,
  onSubmit: PropTypes.func,
  name: PropTypes.string
};

export default FilterCheckbox;