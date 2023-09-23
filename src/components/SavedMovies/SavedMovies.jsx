import PropTypes from 'prop-types';
import React from 'react';

import Footer from '../Footer/Footer';

import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SearchQueryErrorMessage from '../SearchQueryErrorMessage/SearchQueryErrorMessage';
import Preloader from '../Shared/Preloader/Preloader';

import './SavedMovies.css';


const SavedMovies = ({isLoading, moviesList, searchedQuery, onSearch, searchQueryErrorMessage, ...props}) => {
  return (
    <>
      <Header/>
      <main className="saved-movies">
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

SavedMovies.propTypes = {
  isLoading: PropTypes.bool,
  moviesList: PropTypes.array,
  searchedQuery: PropTypes.object,
  onSearch: PropTypes.func,
  isMovieSaved: PropTypes.func,
  searchQueryErrorMessage: PropTypes.string,
  props: PropTypes.object
};

export default SavedMovies;