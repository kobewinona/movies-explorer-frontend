import {useState} from 'react';


export default function useInputValidation(onUpdate) {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleInputChange = event => {
    setInputValue(event.target.value);
    setIsInputValid(event.target.validity.valid);
    setErrorMessage(event.target.validationMessage);
    
    onUpdate(event.target.name, inputValue);
  };
  
  return {
    inputValue,
    isInputValid,
    errorMessage,
    handleInputChange,
  };
}