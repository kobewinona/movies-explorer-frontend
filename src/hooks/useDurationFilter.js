import {useCallback, useEffect, useState} from 'react';

import {SHORT_FILM_DURATION} from '../utils/constants';


export default function useDurationFilter(moviesList) {
  const [filterName, setFilterName] = useState('');
  const [filterValue, setFilterValue] = useState(false);
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);
  
  const filterMovies = useCallback((filterValue) => {
    setFilteredMoviesList(moviesList.filter((movie) => {
      return (movie['duration'] && filterValue) ? movie['duration'] <= SHORT_FILM_DURATION : true;
    }));
  }, [moviesList]);
  
  useEffect(() => {
    if (filterName && filterValue) {
      filterMovies(filterValue);
    } else {
      setFilteredMoviesList(moviesList);
    }
  }, [moviesList, filterName, filterValue]);
  
  const handleFilterUpdate = (name, value) => {
    setFilterName(name);
    setFilterValue(value);
  };
  
  return {
    filteredMoviesList,
    filterName,
    filterValue,
    handleFilterUpdate
  };
}