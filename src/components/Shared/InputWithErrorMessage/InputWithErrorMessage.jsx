import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import useInputWithValidation from '../../../hooks/useInputWithValidation';

import './InputWithErrorMessage.css';


const InputWithErrorMessage = ({onUpdate, ...props}) => {
  const {
    inputName,
    inputValue,
    isInputValid,
    errorMessage,
    handleInputChange
  } = useInputWithValidation();
  
  useEffect(() => {
    if (inputValue) {
      onUpdate(inputName, inputValue);
    }
  }, [inputValue]);
  
  return (
    <div className="input-with-error-message">
      <input
        className={`input-with-error-message__input
        ${!isInputValid && 'input-with-error-message__input_invalid'}`}
        onChange={handleInputChange}
        value={inputValue || ''}
        {...props}
      />
      <span
        className="input-with-error-message__error-message">
        {!isInputValid && errorMessage}
      </span>
    </div>
  );
};

InputWithErrorMessage.propTypes = {
  onUpdate: PropTypes.func,
  props: PropTypes.any
};

export default InputWithErrorMessage;