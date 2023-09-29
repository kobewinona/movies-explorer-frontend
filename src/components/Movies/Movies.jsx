import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';

import {useMovies} from '../../hooks/useMovies';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SearchQueryErrorMessage from '../SearchQueryErrorMessage/SearchQueryErrorMessage';
import Preloader from '../Shared/Preloader/Preloader';

import './Movies.css';


const Movies = ({isLoading, moviesList, getAllMovies, ...props}) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const {
    searchQuery,
    searchQueryErrorMessage,
    filteredMoviesList,
    handleQuerySubmit,
    handleFilterUpdate
  } = useMovies('moviesSearchQuery', moviesList);
  
  const onQuerySubmit = (name, value) => {
    handleQuerySubmit(name, value);
    setShouldFetch(true);
  };
  
  useEffect(() => {
    if (shouldFetch) {
      getAllMovies();
      setShouldFetch(false);
    }
  }, [shouldFetch]);
  
  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm searchedQuery={searchQuery} onFilter={handleFilterUpdate} onSearch={onQuerySubmit}/>
        {
          isLoading
            ? <Preloader/>
            : searchQueryErrorMessage
              ? <SearchQueryErrorMessage searchQueryErrorMessage={searchQueryErrorMessage}/>
              : <MoviesCardList moviesList={filteredMoviesList} {...props}/>
        }
      </main>
      <Footer/>
    </>
  );
};

Movies.propTypes = {
  isLoading: PropTypes.bool,
  moviesList: PropTypes.array,
  getAllMovies: PropTypes.func,
  searchQuery: PropTypes.object,
  setSearchQuery: PropTypes.func,
  onSearch: PropTypes.func,
  searchQueryErrorMessage: PropTypes.string,
  onIsMovieSaved: PropTypes.func,
  onSaveMovie: PropTypes.func,
  onDeleteMovie: PropTypes.func
};

export default Movies;