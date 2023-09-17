import PropTypes from 'prop-types';
import React from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Shared/Preloader/Preloader';

import './Movies.css';


const Movies = ({movies, isLoading}) => {
  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm/>
        {
          isLoading
            ? <Preloader/>
            : <MoviesCardList movies={movies} isLoading={isLoading}/>
        }
      </main>
      <Footer/>
    </>
  );
};

Movies.propTypes = {
  movies: PropTypes.array,
  isLoading: PropTypes.bool
};

export default Movies;