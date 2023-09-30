import {useEffect} from 'react';


export default function useServerErrorMessage(inputValues, setServerErrorMessage) {
  useEffect(() => {
    if (Object.keys(inputValues)?.length > 0) {
      setServerErrorMessage('');
    }
  }, [inputValues, setServerErrorMessage]);
  
  useEffect(() => {
    return () => {
      setServerErrorMessage('');
    };
  }, [setServerErrorMessage]);
}