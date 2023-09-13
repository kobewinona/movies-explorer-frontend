import PropTypes from 'prop-types';
import React from 'react';

import {savedMovies} from '../../utils/savedMovies';
import Footer from '../Footer/Footer';

import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Shared/Preloader/Preloader';

import './SavedMovies.css';


const SavedMovies = ({isLoading}) => {
  return (
    <>
      <Header/>
      <main className="saved-movies">
        <SearchForm/>
        {
          isLoading
            ? <Preloader/>
            : <MoviesCardList movies={savedMovies} isLoading={isLoading}/>
        }
      </main>
      <Footer/>
    </>
  );
};

SavedMovies.propTypes = {
  isLoading: PropTypes.bool
};

export default SavedMovies;