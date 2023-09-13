import {useState} from 'react';

// Custom hook for input validation
function useInputValidation() {
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = event => {
    if (event.target.type === 'checkbox') {
      setInputValue(event.target.checked);
    }
    else {
      setInputValue(event.target.value);
    }
  };
  
  return {
    inputValue,
    handleInputChange,
  };
}

export default useInputValidation;