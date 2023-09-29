import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import useSearch from '../../hooks/useSearch';
import useDurationFilter from '../../hooks/useDurationFilter';
import useLocalStorage from '../../hooks/useLocalStorage';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SearchQueryErrorMessage from '../SearchQueryErrorMessage/SearchQueryErrorMessage';
import Preloader from '../Shared/Preloader/Preloader';

import './SavedMovies.css';


const SavedMovies = ({isLoading, moviesList, searchQueryErrorMessage, onDeleteMovie}) => {
  const [searchQuery, setSearchQuery] = useState({});
  const {searchedMoviesList, queryName, queryValue, searchMovies, handleQuerySubmit} = useSearch(moviesList);
  const {filteredMoviesList, filterName, filterValue, handleFilterUpdate} = useDurationFilter(searchedMoviesList);
  const [storedValue, setStoredValue] = useLocalStorage('savedMoviesSearchQuery');
  
  useEffect(() => {
    setSearchQuery(prevState => ({...prevState, ...storedValue}));
    
    if (storedValue && Object.keys(storedValue).length > 0) {
      const {movieName} = storedValue;
  
      searchMovies(movieName);
    }
  }, [moviesList, storedValue]);
  
  useEffect(() => {
    if (queryName && queryValue !== undefined) {
      setStoredValue(prevState => ({...prevState, [queryName]: queryValue}));
    }
  }, [queryName, queryValue]);
  
  useEffect(() => {
    if (filterName && filterValue !== undefined) {
      setStoredValue(prevState => ({...prevState, [filterName]: filterValue}));
    }
  }, [filterName, filterValue]);
  
  return (
    <>
      <Header/>
      <main className="saved-movies">
        <SearchForm
          searchedQuery={searchQuery}
          onFilter={handleFilterUpdate}
          onSearch={handleQuerySubmit}
        />
        {
          isLoading
            ? <Preloader/>
            : searchQueryErrorMessage
              ? <SearchQueryErrorMessage searchQueryErrorMessage={searchQueryErrorMessage}/>
              : <MoviesCardList moviesList={filteredMoviesList} onDeleteMovie={onDeleteMovie}/>
        }
      </main>
      <Footer/>
    </>
  );
};

SavedMovies.propTypes = {
  isLoading: PropTypes.bool,
  moviesList: PropTypes.array,
  searchQueryErrorMessage: PropTypes.string,
  onDeleteMovie: PropTypes.func
};

export default SavedMovies;