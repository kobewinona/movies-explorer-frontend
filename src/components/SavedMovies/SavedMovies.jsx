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
  const {searchedMoviesList, queryInput, handleQuerySubmit} = useSearch(moviesList);
  const {filteredMoviesList, filterInput, handleFilterUpdate} = useDurationFilter(searchedMoviesList);
  const [storedValue, setStoredValue] = useLocalStorage('savedMoviesSearchQuery');
  
  useEffect(() => {
    setSearchQuery(storedValue);
  }, []);
  
  useEffect(() => {
    setStoredValue({...queryInput, ...filterInput});
  }, [queryInput, filterInput]);
  
  
  useEffect(() => {
    if (searchQuery && Object.keys(searchQuery)?.length > 0) {
      const {movieName} = searchQuery;
      const movieNameObj = {movieName};
  
      handleQuerySubmit(movieNameObj);
    }
  }, [moviesList]);
  
  useEffect(() => {
    if (searchQuery && Object.keys(searchQuery)?.length > 0) {
      const {showShortfilms} = searchQuery;
      const showShortfilmsObj = {showShortfilms};
      
      handleFilterUpdate(showShortfilmsObj);
      setSearchQuery(prevState => ({...prevState, ...filterInput}));
    }
  }, [searchedMoviesList, queryInput]);
  
  return (
    <>
      <Header/>
      <main className="saved-movies">
        <SearchForm searchedQuery={searchQuery} onFilter={handleFilterUpdate} onSearch={handleQuerySubmit}/>
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
  searchQuery: PropTypes.object,
  onSearch: PropTypes.func,
  setSearchQuery: PropTypes.func,
  searchQueryErrorMessage: PropTypes.string,
  onDeleteMovie: PropTypes.func
};

export default SavedMovies;