import {useCallback, useEffect, useState} from 'react';


export default function useSearch(moviesList) {
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
    } else {
      setSearchedMoviesList(moviesList);
    }
  }, [moviesList, queryName, queryValue]);
  
  const handleQuerySubmit = (name, value) => {
    setQueryName(name);
    setQueryValue(value);
  };
  
  return {searchedMoviesList, queryName, queryValue, searchMovies, handleQuerySubmit};
}