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


const Movies = ({isLoading, serverErrorMessage, moviesList, getAllMovies, onUseToolTip, ...props}) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const {
    searchQuery,
    searchQueryErrorMessage,
    filteredMoviesList,
    handleQuerySubmit,
    handleFilterUpdate
  } = useMovies('moviesSearchQuery', moviesList, onUseToolTip);
  
  const onQuerySubmit = (name, value) => {
    handleQuerySubmit(name, value);
    
    if (value !== '') {
      setShouldFetch(true);
    }
  };
  
  useEffect(() => {
    if (shouldFetch) {
      getAllMovies();
      setShouldFetch(false);
    }
  }, [shouldFetch]);
  
  // TODO delete when fix reload from storage
  useEffect(() => {
    getAllMovies();
  }, []);
  
  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm searchedQuery={searchQuery} onFilter={handleFilterUpdate} onSearch={onQuerySubmit}/>
        {
          isLoading
            ? <Preloader/>
            : searchQueryErrorMessage || serverErrorMessage
              ? <SearchQueryErrorMessage
                  searchQueryErrorMessage={searchQueryErrorMessage || serverErrorMessage}
                />
              : <MoviesCardList moviesList={filteredMoviesList} {...props}/>
        }
      </main>
      <Footer/>
    </>
  );
};

Movies.propTypes = {
  isLoading: PropTypes.bool,
  serverErrorMessage: PropTypes.string,
  moviesList: PropTypes.array,
  getAllMovies: PropTypes.func,
  onUseToolTip: PropTypes.func,
  onIsMovieSaved: PropTypes.func,
  onSaveMovie: PropTypes.func,
  onDeleteMovie: PropTypes.func
};

export default Movies;