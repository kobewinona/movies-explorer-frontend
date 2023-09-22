import {useEffect, useState} from 'react';


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