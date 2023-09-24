import PropTypes from 'prop-types';
import React, {useContext} from 'react';

import {SearchQueryContext} from '../../contexts/SearchQueryContext';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SearchQueryErrorMessage from '../SearchQueryErrorMessage/SearchQueryErrorMessage';
import Preloader from '../Shared/Preloader/Preloader';

import './SavedMovies.css';


const SavedMovies = ({isLoading, moviesList, onSearch, ...props}) => {
  const searchQuery = useContext(SearchQueryContext);
  
  return (
    <>
      <Header/>
      <main className="saved-movies">
        <SearchForm searchedQuery={searchQuery?.savedMoviesList} onSearch={onSearch}/>
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