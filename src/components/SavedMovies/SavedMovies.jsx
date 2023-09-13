import PropTypes from 'prop-types';
import React from 'react';

import {savedMovies} from '../../utils/savedMovies';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import './SavedMovies.css';
import Preloader from '../Shared/Preloader/Preloader';


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
}

export default SavedMovies;