import PropTypes from 'prop-types';
import React, {useState} from 'react';

import './FilterCheckbox.css';


const FilterCheckbox = ({onUpdate, ...props}) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = event => {
    setInputValue(event.target.checked);
    onUpdate(props.name, event.target.checked);
  };
  
  return (
    <label className="filter-checkbox__container" htmlFor="filter-checkbox">
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
  name: PropTypes.string,
}

export default FilterCheckbox;