import PropTypes from 'prop-types';
import React from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';
import SearchQueryErrorMessage from '../SearchQueryErrorMessage/SearchQueryErrorMessage';
import Preloader from '../Shared/Preloader/Preloader';


const Movies = ({isLoading, moviesList, onSearch, searchQueryErrorMessage}) => {
  console.log(Boolean(moviesList));
  console.log('moviesList', moviesList);
  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm onSearch={onSearch}/>
        {
          isLoading
            ? <Preloader/>
            : moviesList
              ? <MoviesCardList moviesList={moviesList}/>
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
  isSearchQueryPut: PropTypes.bool,
  onSearch: PropTypes.func,
  searchQueryErrorMessage: PropTypes.string
};

export default Movies;