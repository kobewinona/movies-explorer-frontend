import PropTypes from 'prop-types';
import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';


const MoviesCardList = ({movies}) => {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
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
      <div className="movies-card-list__more-button-container">
        {
          movies.length > 3
          && <button className="movies-card-list__more-button">Ещё</button>
        }
      </div>
    </section>
  );
};

MoviesCardList.propTypes = {
  movies: PropTypes.array
};

export default MoviesCardList;