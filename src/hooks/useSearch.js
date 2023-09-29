import {useState, useCallback, useEffect} from 'react';

import {searchQueryNotFoundError, searchQueryEmptyQueryError} from '../utils/constants';


export default function useSearch(moviesList, setSearchQueryErrorMessage, onUseToolTip) {
  const [queryName, setQueryName] = useState('');
  const [queryValue, setQueryValue] = useState('');
  const [searchedMoviesList, setSearchedMoviesList] = useState([]);
  
  const searchMovies = useCallback((queryValue) => {
    setSearchQueryErrorMessage('');
    
    if (queryValue && Object.keys(moviesList).length > 0) {
      const searchResult = moviesList?.filter(movie => {
        const isNameRuMatch = movie['nameRU']?.toLowerCase().includes(queryValue.toLowerCase());
        const isNameEuMatch = movie['nameEN']?.toLowerCase().includes(queryValue.toLowerCase());
        return isNameRuMatch || isNameEuMatch;
      });
      
      if (searchResult?.length <= 0) {
        setSearchQueryErrorMessage(searchQueryNotFoundError);
        setSearchedMoviesList([]);
      }
      else {
        setSearchedMoviesList(searchResult);
      }
    }
    else {
      setSearchQueryErrorMessage('');
      setSearchedMoviesList(moviesList);
    }
  }, [moviesList]);
  
  useEffect(() => {
    console.log('moviesList', moviesList);
    
    if (queryName && queryValue) {
      searchMovies(queryValue);
      setSearchQueryErrorMessage('');
    }
    // else {
    //   setSearchedMoviesList(moviesList);
    // }
  }, [moviesList, queryName, queryValue]);
  
  const handleQuerySubmit = useCallback((name, value) => {
    console.log('value', value);
    
    if (value === '') {
      setSearchQueryErrorMessage('');
      onUseToolTip(false, searchQueryEmptyQueryError);
    } else {
      setQueryName(name);
      setQueryValue(value);
    }
  }, []);
  
  return {searchedMoviesList, queryName, queryValue, searchMovies, handleQuerySubmit};
}