import React from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';
import Header from '../Header/Header';
import WithSetRes from '../WithSetRes/WithSetRes';
import Footer from '../Footer/Footer';

const SavedMovies = () => {
  return (
    <>
      <WithSetRes element={Header} />
      <main>
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;