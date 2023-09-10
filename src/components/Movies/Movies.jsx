import React from 'react';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';


const Movies = () => {
  return (
    <>
      <Header />
      <main>
          <SearchForm />
          <MoviesCardList />
      </main>
    </>
  );
};

export default Movies;