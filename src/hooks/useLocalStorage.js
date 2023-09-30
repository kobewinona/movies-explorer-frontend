import {useState} from 'react';


export default function useLocalStorage(key, initialValue) {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch(err) {
      console.error(err);
      return initialValue;
    }
  });
  
  const setStoredValue = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch(err) {
      console.error(err);
    }
  };
  
  return {storedValue, setStoredValue};
}