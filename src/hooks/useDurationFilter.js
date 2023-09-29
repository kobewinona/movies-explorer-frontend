import {useCallback, useEffect, useState} from 'react';


export default function useDurationFilter(moviesList) {
  const [filterName, setFilterName] = useState('');
  const [filterValue, setFilterValue] = useState(false);
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);
  
  const filterMovies = useCallback((filterValue) => {
    setFilteredMoviesList(moviesList.filter(movie => {
      return (movie['duration'] && filterValue) ? movie['duration'] <= 40 : true;
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
  
  return {filteredMoviesList, filterName, filterValue, handleFilterUpdate};
}