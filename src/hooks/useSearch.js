import {useState, useCallback, useEffect} from 'react';

import {searchQueryNotFoundError} from '../utils/constants';


export default function useSearch(moviesList, setSearchQueryErrorMessage) {
  const [queryName, setQueryName] = useState('');
  const [queryValue, setQueryValue] = useState('');
  const [searchedMoviesList, setSearchedMoviesList] = useState([]);
  
  const searchMovies = useCallback((queryValue) => {
    if (queryValue) {
      setSearchedMoviesList(moviesList.filter(movie => {
        const isNameRuMatch = movie['nameRU']?.toLowerCase().includes(queryValue.toLowerCase());
        const isNameEuMatch = movie['nameEN']?.toLowerCase().includes(queryValue.toLowerCase());
        return isNameRuMatch || isNameEuMatch;
      }));
    } else {
      setSearchedMoviesList(moviesList);
    }
  }, [moviesList]);
  
  useEffect(() => {
    if (queryName && queryValue) {
      searchMovies(queryValue);
      setSearchQueryErrorMessage('');
    } else {
      setSearchedMoviesList(moviesList);
    }
  }, [moviesList, queryName, queryValue]);
  
  const handleQuerySubmit = useCallback((name, value) => {
    setQueryName(name);
    setQueryValue(value);
  }, []);
  
  useEffect(() => {
    if (searchedMoviesList.length <= 0) {
      setSearchQueryErrorMessage(searchQueryNotFoundError);
    }
  }, [searchedMoviesList]);
  
  return {searchedMoviesList, queryName, queryValue, searchMovies, handleQuerySubmit};
}