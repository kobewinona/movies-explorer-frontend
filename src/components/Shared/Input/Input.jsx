import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import useInput from '../../../hooks/useInput';

import './Input.css';


const Input = ({defaultValue, onUpdate, name, ...props}) => {
  const {inputName, inputValue, handleInputChange} = useInput(name, defaultValue);
  
  useEffect(() => {
    onUpdate(inputName, inputValue);
  }, [inputValue]);
  
  return (
    <input
      className="input input_type_search"
      value={inputValue || ''}
      onChange={handleInputChange}
      name={name}
      {...props}
    />
  );
};

Input.propTypes = {
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func,
  name: PropTypes.string,
  props: PropTypes.any
}

export default Input;