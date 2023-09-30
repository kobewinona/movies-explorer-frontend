import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import useMovies from '../../hooks/useMovies';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SearchQueryErrorMessage from '../SearchQueryErrorMessage/SearchQueryErrorMessage';
import Preloader from '../Shared/Preloader/Preloader';

import './Movies.css';


const Movies = ({isUpdating, serverErrorMessage, moviesList, getAllMovies, onUseToolTip, ...props}) => {
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
    
    setShouldFetch(value !== '');
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
          isUpdating
            ? <Preloader size="normal"/>
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
  isUpdating: PropTypes.bool,
  serverErrorMessage: PropTypes.string,
  moviesList: PropTypes.array,
  getAllMovies: PropTypes.func,
  onUseToolTip: PropTypes.func,
  onIsMovieSaved: PropTypes.func,
  onSaveMovie: PropTypes.func,
  onDeleteMovie: PropTypes.func
};

export default Movies;