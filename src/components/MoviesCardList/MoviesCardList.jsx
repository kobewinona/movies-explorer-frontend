import React from 'react';

import {initialMovies} from '../../utils/initialMovies';

import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesPaginator from '../MoviesPaginator/MoviesPaginator';

import './MoviesCardList.css';


const MoviesCardList = () => {
  return (
    <section className="movies">
      <ul className="movies__list">
        {
          initialMovies.map((movie, index) => {
            return (
              <MoviesCard
                key={index}
                nameRU={movie.nameRU}
                duration={movie.duration}
                image={movie.image}
              />
            );
          })
        }
      </ul>
      <MoviesPaginator/>
    </section>
  );
};

export default MoviesCardList;