import PropTypes from 'prop-types';
import React, {useContext} from 'react';

import {SearchQueryContext} from '../../contexts/SearchQueryContext';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SearchQueryErrorMessage from '../SearchQueryErrorMessage/SearchQueryErrorMessage';
import Preloader from '../Shared/Preloader/Preloader';

import './Movies.css';


const Movies = ({isLoading, moviesList, onSearch, ...props}) => {
  const searchQuery = useContext(SearchQueryContext);
  
  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm searchedQuery={searchQuery?.moviesList} onSearch={onSearch}/>
        {
          isLoading
            ? <Preloader/>
            : moviesList
              ? <MoviesCardList moviesList={moviesList} {...props}/>
              : <SearchQueryErrorMessage searchQueryErrorMessage={searchQuery?.errorMessage}/>
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