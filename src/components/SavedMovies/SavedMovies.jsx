import PropTypes from 'prop-types';
import React from 'react';

import {useMovies} from '../../hooks/useMovies';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SearchQueryErrorMessage from '../SearchQueryErrorMessage/SearchQueryErrorMessage';
import Preloader from '../Shared/Preloader/Preloader';

import './SavedMovies.css';


const SavedMovies = ({isLoading, moviesList, onDeleteMovie}) => {
  const {
    searchQuery,
    searchQueryErrorMessage,
    filteredMoviesList,
    handleQuerySubmit,
    handleFilterUpdate
  } = useMovies('savedMoviesSearchQuery', moviesList);
  
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