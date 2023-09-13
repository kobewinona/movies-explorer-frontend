import PropTypes from 'prop-types';
import React from 'react';

import {initialMovies} from '../../utils/initialMovies';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Shared/Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import './Movies.css';
import Preloader from '../Shared/Preloader/Preloader';


const Movies = ({isLoading}) => {
  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm/>
        {
          isLoading
            ? <Preloader/>
            : <MoviesCardList movies={initialMovies} isLoading={isLoading}/>
        }
      </main>
      <Footer/>
    </>
  );
};

Movies.propTypes = {
  isLoading: PropTypes.bool
}

export default Movies;