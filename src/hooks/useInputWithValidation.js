import {useEffect, useState} from 'react';
import validator from 'validator/es';

import {
  inputIncorrectEmailError,
  inputIncorrectNameError,
} from '../utils/constants';
import {nameRegex} from '../utils/regex';

export default function useInputWithValidation(defaultValue) {
  const [inputName, setInputName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleInputChange = event => {
    const target = event.target;
    
    setInputName(target.name);
    setInputValue(target.value);
  
    setIsInputValid(target.validity.valid);
    setErrorMessage(target.validationMessage);
    
    if (target.name === 'name') {
      if (target.value && !nameRegex.test(target.value)) {
        setIsInputValid(false);
        setErrorMessage(inputIncorrectNameError);
      }
    } else if (target.type === 'email') {
      setIsInputValid(validator.isEmail(target.value));
      setErrorMessage(inputIncorrectEmailError);
    }
  };
  
  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);
  
  return {
    inputName,
    inputValue,
    isInputValid,
    errorMessage,
    handleInputChange
  };
}