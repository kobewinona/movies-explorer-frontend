import {useEffect, useState} from 'react';

import useDurationFilter from './useDurationFilter';
import useSearch from './useSearch';


export default function useMovies(moviesSearchQuery, moviesList, onUseToolTip) {
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
  
  useEffect(() => {
    setSearchQueryErrorMessage('');
    
    if (moviesSearchQuery && Object.keys(moviesSearchQuery).length > 0) {
      const {movieName} = moviesSearchQuery;
      searchMovies(movieName);
    }
  }, [moviesList, moviesSearchQuery]);
  
  useEffect(() => {
    if (queryName && queryValue !== undefined) {
      setSearchQuery((prevState) => ({...prevState, [queryName]: queryValue}));
    }
  }, [queryName, queryValue]);
  
  useEffect(() => {
    if (filterName && filterValue !== undefined) {
      setSearchQuery((prevState) => ({...prevState, [filterName]: filterValue}));
    }
  }, [filterName, filterValue]);
  
  return {
    searchQuery,
    setSearchQueryErrorMessage,
    searchQueryErrorMessage,
    filteredMoviesList,
    handleQuerySubmit,
    handleFilterUpdate
  };
}
