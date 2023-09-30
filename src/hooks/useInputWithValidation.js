import {useEffect, useState} from 'react';
import validator from 'validator/es';

import {inputIncorrectEmailError, inputIncorrectNameError} from '../utils/constants';
import {nameRegex} from '../utils/regex';


export default function useInputWithValidation(defaultName, defaultValue) {
  const [inputName, setInputName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    setInputName(name);
    setInputValue(value);
    
    setIsInputValid(target.validity.valid);
    setErrorMessage(target.validationMessage);
    
    if (name === 'name') {
      if (value && !nameRegex.test(value)) {
        setIsInputValid(false);
        setErrorMessage(inputIncorrectNameError);
      }
    } else if (target.type === 'email') {
      setIsInputValid(validator.isEmail(value));
      setErrorMessage(inputIncorrectEmailError);
    }
  };
  
  useEffect(() => {
    if (defaultValue) {
      setInputName(defaultName);
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