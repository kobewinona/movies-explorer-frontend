import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';


const Movies = () => {
  return (
    <main>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
};

export default Movies;