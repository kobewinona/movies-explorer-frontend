import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import './Input.css';


const Input = ({onUpdate, validate, ...props}) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setInputValue(props.defaultValue);
    setIsInputValid(true);
    setErrorMessage('');
  }, [props.defaultValue]);

  const handleInputsChange = event => {
    setInputValue(event.target.value);
    setIsInputValid(event.target.validity.valid);
    setErrorMessage(event.target.validationMessage);

    onUpdate(props.name, event.target.value);
  }

  return (
    <>
      <input
        className={`input ${validate ? !isInputValid && 'input_invalid' : ''}`}
        onChange={event => validate && handleInputsChange(event)}
        value={inputValue || ''}
        {...props}
      />
      {validate && (<span className="input__error-message">{!isInputValid && errorMessage}</span>)}
    </>
  );
};

Input.propTypes = {
  validate: PropTypes.bool,
  name: PropTypes.string,
  onUpdate: PropTypes.func,
  defaultValue: PropTypes.string

}

export default Input;