import {useEffect, useState} from 'react';
import useLocalStorage from './useLocalStorage';
import useSearch from './useSearch';
import useDurationFilter from './useDurationFilter';

export const useMovies = (key, moviesList, onUseToolTip) => {
  const [searchQuery, setSearchQuery] = useState({});
  const [searchQueryErrorMessage, setSearchQueryErrorMessage] = useState('');
  const {
    searchedMoviesList,
    queryName,
    queryValue,
    searchMovies,
    handleQuerySubmit
  } = useSearch(moviesList, setSearchQueryErrorMessage, onUseToolTip);
  const {
    filteredMoviesList,
    filterName,
    filterValue,
    handleFilterUpdate
  } = useDurationFilter(searchedMoviesList);
  const {storedValue, setStoredValue} = useLocalStorage(key);
  
  useEffect(() => {
    setSearchQueryErrorMessage('');
    setSearchQuery(prevState => ({ ...prevState, ...storedValue }));
    
    if (storedValue && Object.keys(storedValue).length > 0) {
      const { movieName } = storedValue;
      searchMovies(movieName);
    }
  }, [moviesList, storedValue]);
  
  useEffect(() => {
    if (queryName && queryValue !== undefined) {
      setStoredValue(prevState => ({ ...prevState, [queryName]: queryValue }));
    }
  }, [queryName, queryValue]);
  
  useEffect(() => {
    if (filterName && filterValue !== undefined) {
      setStoredValue(prevState => ({ ...prevState, [filterName]: filterValue }));
    }
  }, [filterName, filterValue]);
  
  return {
    searchQuery,
    setSearchQueryErrorMessage,
    searchQueryErrorMessage,
    filteredMoviesList,
    handleQuerySubmit,
    handleFilterUpdate,
  };
};
