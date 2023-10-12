import {useCallback, useState} from 'react';
import validator from 'validator/es';

import {nameRegex} from '../utils/regex';


export default function useFormWithValidation(initialValues) {
  const [currentValues, setCurrentValues] = useState({});
  const [inputsValidity, setInputsValidity] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  
  const handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const inputs = Array.from(event.currentTarget.elements);
  
    setCurrentValues(prevValues => ({ ...prevValues, [name]: value }));
    
    const currentInputsValidity = inputs.reduce((validity, input) => {
      validity[input.name] = input.validity.valid;
      return validity;
    }, {});
    
    currentInputsValidity[name] = target.validity.valid;
    
    if (name === 'name') {
      if (value && !nameRegex.test(value)) {
        currentInputsValidity[name] = false;
      }
    } else if (target.type === 'email') {
      currentInputsValidity[name] = validator.isEmail(value);
    }
    
    setInputsValidity(currentInputsValidity);
  
    setIsFormValid(Object.values(currentInputsValidity).every(Boolean));
    
    if (initialValues) {
      setIsFormValid(Object.keys(currentValues).every(key => value !== initialValues?.[key]));
    }
  };
  
  const resetForm = useCallback((newValues = {}, newIsValid = false) => {
    setInputsValidity(newValues);
    setIsFormValid(newIsValid);
  }, [setInputsValidity, setIsFormValid]);
  
  return {inputsValidity, isFormValid, handleChange, resetForm};
}