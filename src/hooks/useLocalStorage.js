import {useState} from 'react';


export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error accessing local storage:', error);
      return initialValue;
    }
  });
  
  // const setValue = (value) => {
  //   try {
  //     setStoredValue(value);
  //     localStorage.setItem(key, JSON.stringify(value));
  //   } catch (error) {
  //     console.error('Error setting data to local storage:', error);
  //   }
  // };
  
  const setValue = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      setStoredValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error setting data to local storage:', error);
    }
  };
  
  return [storedValue, setValue];
}