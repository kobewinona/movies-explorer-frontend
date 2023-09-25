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


const Movies = ({isLoading, moviesList, onSearch, onIsMovieSaved, onSaveMovie, onDeleteMovie}) => {
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
              ? <MoviesCardList
                  moviesList={moviesList}
                  onIsMovieSaved={onIsMovieSaved}
                  onSaveMovie={onSaveMovie}
                  onDeleteMovie={onDeleteMovie}
                />
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
  onSearch: PropTypes.func,
  onIsMovieSaved: PropTypes.func,
  onSaveMovie: PropTypes.func,
  onDeleteMovie: PropTypes.func,
};

export default Movies;