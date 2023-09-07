import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';


const Movies = () => {
  return (
    <main>
      <section>
        <SearchForm />
        <MoviesCardList />
      </section>
    </main>
  );
};

export default Movies;