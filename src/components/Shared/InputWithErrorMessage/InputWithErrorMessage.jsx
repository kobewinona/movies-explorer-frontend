import PropTypes from 'prop-types';
import React from 'react';

import './InputWithErrorMessage.css';
import useInputWithValidation from '../../../hooks/useInputWithValidation';


const InputWithErrorMessage = ({onUpdate, ...props}) => {
  const {
    inputValue,
    isInputValid,
    errorMessage,
    handleInputChange
  } = useInputWithValidation(onUpdate);
  
  return (
    <>
      <input
        className={`input
        ${props.name === 'searchQuery' && 'input_type_search-query'}
        ${!isInputValid && 'input_invalid'}`}
        onChange={handleInputChange}
        value={inputValue || ''}
        {...props}
      />
      <span className="input__error-message">{!isInputValid && errorMessage}</span>
    </>
  );
};

InputWithErrorMessage.propTypes = {
  name: PropTypes.string,
  onUpdate: PropTypes.func,
  defaultValue: PropTypes.string
};

export default InputWithErrorMessage;