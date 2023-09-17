import PropTypes from 'prop-types';
import React from 'react';

import {initialMovies} from '../../utils/initialMovies';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Shared/Preloader/Preloader';

import './Movies.css';


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
};

export default Movies;