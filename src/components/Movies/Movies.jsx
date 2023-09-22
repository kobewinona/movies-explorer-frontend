import PropTypes from 'prop-types';
import React from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';
import SearchQueryErrorMessage from '../SearchQueryErrorMessage/SearchQueryErrorMessage';
import Preloader from '../Shared/Preloader/Preloader';


const Movies = ({isLoading, moviesList, searchedQuery, onSearch, searchQueryErrorMessage, onAddMovie, onDelete}) => {
  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm searchedQuery={searchedQuery} onSearch={onSearch}/>
        {
          isLoading
            ? <Preloader/>
            : moviesList
              ? <MoviesCardList moviesList={moviesList} onAddMovie={onAddMovie} onDelete={onDelete}/>
              : <SearchQueryErrorMessage searchQueryErrorMessage={searchQueryErrorMessage}/>
        }
      </main>
      <Footer/>
    </>
  );
};

Movies.propTypes = {
  isLoading: PropTypes.bool,
  isUpdating: PropTypes.bool,
  moviesList: PropTypes.array,
  searchedQuery: PropTypes.object,
  onSearch: PropTypes.func,
  searchQueryErrorMessage: PropTypes.string,
  onAddMovie: PropTypes.func,
  onDelete: PropTypes.func
};

export default Movies;