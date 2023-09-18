import PropTypes from 'prop-types';
import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';


const MoviesCardList = ({moviesList}) => {
  return (
    <section className="movies-card-list">
      {
        <>
          <ul className="movies-card-list__container">
            {
              moviesList.map((movie, index) => {
                return (
                  <MoviesCard
                    key={index}
                    nameRU={movie.nameRU}
                    duration={movie.duration}
                    image={movie.image}
                    trailerLink={movie.trailerLink}
                  />
                );
              })
            }
          </ul>
          <div className="movies-card-list__more-button-container">
            {
              moviesList.length > 3
              && <button className="movies-card-list__more-button">Ещё</button>
            }
          </div>
        </>
      }
    </section>
  );
};

MoviesCardList.propTypes = {
  isSearchQueryPut: PropTypes.bool,
  moviesList: PropTypes.array
};

export default MoviesCardList;