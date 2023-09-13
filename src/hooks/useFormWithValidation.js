import {useState, useCallback} from 'react';


export function useFormWithValidation() {
  const [inputValues, setInputValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setInputValues({...inputValues, [name]: value});
    setIsFormValid(target.closest("form").checkValidity());
  };
  
  const resetForm = useCallback(
    (newValues = {}, newIsValid = false) => {
      setInputValues(newValues);
      setIsFormValid(newIsValid);
    },
    [setInputValues, setIsFormValid]
  );
  
  return { inputValues, isFormValid, handleChange, resetForm };
}