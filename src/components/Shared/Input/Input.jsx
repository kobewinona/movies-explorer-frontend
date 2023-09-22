import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import useInput from '../../../hooks/useInput';

import './Input.css';


const Input = ({defaultValue, onUpdate, ...props}) => {
  const {inputName, inputValue, handleInputChange} = useInput(defaultValue);
  
  useEffect(() => {
    if (inputValue) {
      onUpdate(inputName, inputValue);
    }
  }, [inputValue]);
  
  return (
    <input
      className="input input_type_search"
      value={inputValue || ''}
      onChange={handleInputChange}
      {...props}
    />
  );
};

Input.propTypes = {
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func,
  props: PropTypes.any
}

export default Input;