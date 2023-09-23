import PropTypes from 'prop-types';
import React from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SearchQueryErrorMessage from '../SearchQueryErrorMessage/SearchQueryErrorMessage';
import Preloader from '../Shared/Preloader/Preloader';

import './Movies.css';


const Movies = ({isLoading, moviesList, searchedQuery, onSearch, searchQueryErrorMessage, ...props}) => {
  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm searchedQuery={searchedQuery} onSearch={onSearch}/>
        {
          isLoading
            ? <Preloader/>
            : moviesList
              ? <MoviesCardList moviesList={moviesList} {...props}/>
              : <SearchQueryErrorMessage searchQueryErrorMessage={searchQueryErrorMessage}/>
        }
      </main>
      <Footer/>
    </>
  );
};

Movies.propTypes = {
  isLoading: PropTypes.bool,
  moviesList: PropTypes.array,
  savedMoviesList: PropTypes.array,
  searchedQuery: PropTypes.object,
  onSearch: PropTypes.func,
  searchQueryErrorMessage: PropTypes.string,
  isMovieSaved: PropTypes.func,
  onSaveMovie: PropTypes.func,
  onDeleteMovie: PropTypes.func,
  props: PropTypes.object
};

export default Movies;