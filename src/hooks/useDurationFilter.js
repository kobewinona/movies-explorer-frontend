import {useCallback, useState} from 'react';


export default function useDurationFilter(moviesList) {
  const [filterInput, setFilterInput] = useState({showShortfilms: false});
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);
  
  const filterMovies = useCallback((movies, {showShortfilms}) => {
    if (showShortfilms) {
      setFilteredMoviesList(movies.filter(movie => {
        return movie['duration'] ? movie['duration'] <= 40 : false;
      }));
    } else {
      setFilteredMoviesList(moviesList);
    }
  }, [moviesList]);
  
  const handleFilterUpdate = (filter) => {
    // console.log('here');
    // console.log('filter', filter);
    if (filter?.showShortfilms !== undefined) {
      console.log('here');
      console.log('filter', filter);
      
      setFilterInput({...filter});
  
      filterMovies(moviesList, filter);
    } else {
      setFilteredMoviesList(moviesList);
    }
  };
  
  return {filteredMoviesList, filterInput, handleFilterUpdate};
}