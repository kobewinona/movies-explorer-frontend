import React from 'react';

import '../MoviesCard/MoviesCard';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesPaginator from '../MoviesPaginator/MoviesPaginator';
import {initialMovies} from '../../utils/initialMovies';

import './MoviesCardList.css';


const MoviesCardList = () => {
  return (
    <section className="movies">
      <ul className="movies__list">
        {
          initialMovies.map(movie => {
            return (
              <MoviesCard
                key={movie.movieId}
                nameRU={movie.nameRU}
                duration={movie.duration}
                image={movie.image}
              />
            )
          })
        }
      </ul>
      <MoviesPaginator />
    </section>
  );
};

export default MoviesCardList;