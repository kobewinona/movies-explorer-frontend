import {useEffect, useState} from 'react';

// Custom hook for input validation
export default function useInput(defaultValue) {
  const [inputName, setInputName] = useState('')
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    
    if (event.target.type === 'checkbox') {
      setInputName(name);
      setInputValue(target.checked);
    } else {
      setInputName(name);
      setInputValue(target.value);
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
    handleInputChange
  };
}