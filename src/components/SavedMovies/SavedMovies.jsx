import PropTypes from 'prop-types';
import React from 'react';

import useMovies from '../../hooks/useMovies';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SearchQueryErrorMessage from '../SearchQueryErrorMessage/SearchQueryErrorMessage';
import Preloader from '../Shared/Preloader/Preloader';

import './SavedMovies.css';


const SavedMovies = ({isLoading, serverErrorMessage, moviesList, onUseToolTip, onDeleteMovie}) => {
  const {
    searchQuery,
    searchQueryErrorMessage,
    filteredMoviesList,
    handleQuerySubmit,
    handleFilterUpdate
  } = useMovies('savedMoviesSearchQuery', moviesList, onUseToolTip);
  
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
            : searchQueryErrorMessage || serverErrorMessage
              ? <SearchQueryErrorMessage
                searchQueryErrorMessage={searchQueryErrorMessage || serverErrorMessage}
              />
              : <MoviesCardList moviesList={filteredMoviesList} onDeleteMovie={onDeleteMovie}/>
        }
      </main>
      <Footer/>
    </>
  );
};

SavedMovies.propTypes = {
  isLoading: PropTypes.bool,
  serverErrorMessage: PropTypes.string,
  moviesList: PropTypes.array,
  onUseToolTip: PropTypes.func,
  onDeleteMovie: PropTypes.func
};

export default SavedMovies;