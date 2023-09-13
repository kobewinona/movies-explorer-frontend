import PropTypes from 'prop-types';
import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesPaginator from '../MoviesPaginator/MoviesPaginator';

import './MoviesCardList.css';


const MoviesCardList = ({movies}) => {
  return (
    <section className="movies-card-list__container">
      <ul className="movies-card-list__list">
        {
          movies.map((movie, index) => {
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
      <MoviesPaginator moviesCount={movies.length}/>
    </section>
  );
};

MoviesCardList.propTypes = {
  movies: PropTypes.array
};

export default MoviesCardList;