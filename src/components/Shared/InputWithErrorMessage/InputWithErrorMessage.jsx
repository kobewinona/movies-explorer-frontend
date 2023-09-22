import PropTypes from 'prop-types';
import React from 'react';

import useInputWithValidation from '../../../hooks/useInputWithValidation';

import './InputWithErrorMessage.css';


const InputWithErrorMessage = ({onUpdate, ...props}) => {
  const {
    inputValue,
    isInputValid,
    errorMessage,
    handleInputChange
  } = useInputWithValidation(onUpdate);
  
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
  name: PropTypes.string,
  onUpdate: PropTypes.func,
  defaultValue: PropTypes.string
};

export default InputWithErrorMessage;