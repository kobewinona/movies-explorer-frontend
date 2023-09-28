import {useCallback, useEffect, useState} from 'react';


export default function useSearch(moviesList) {
  const [queryInput, setQueryInput] = useState({});
  const [searchedMoviesList, setSearchedMoviesList] = useState([]);
  
  const searchMovies = useCallback((movies, {movieName}) => {
    if (movieName) {
      setSearchedMoviesList(movies.filter(movie => {
        const isNameRuMatch = movie['nameRU']?.toLowerCase().includes(movieName.toLowerCase());
        const isNameEuMatch = movie['nameEN']?.toLowerCase().includes(movieName.toLowerCase());
        return isNameRuMatch || isNameEuMatch;
      }));
    } else {
      setSearchedMoviesList(moviesList);
    }
  }, [moviesList]);
  
  useEffect(() => {
    if (Object.keys(queryInput).length > 0) {
      searchMovies(moviesList, queryInput);
    } else {
      setSearchedMoviesList(moviesList);
    }
  }, [moviesList, queryInput, searchMovies]);
  
  const handleQuerySubmit = useCallback((query) => {
    if (query && query !== queryInput) {
      setQueryInput({...query});
    }
  }, [queryInput]);
  
  return {searchedMoviesList, queryInput, handleQuerySubmit};
}