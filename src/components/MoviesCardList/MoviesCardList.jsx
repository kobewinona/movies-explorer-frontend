import PropTypes from 'prop-types';
import React, {useState} from 'react';

import MoreButton from '../MoreButton/MoreButton';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';


const MoviesCardList = ({moviesList, onIsMovieSaved, onSaveMovie, onDeleteMovie}) => {
  const [moviesCountLimit, setMoviesCountLimit] = useState(0);
  
  return (
    <section className="movies-card-list">
      {
        <>
          <ul className="movies-card-list__container">
            {
              moviesList?.map((movie, index) => {
                return (index < moviesCountLimit &&
                  <MoviesCard
                    key={movie.id}
                    movieId={movie.id ? movie.id : movie.movieId}
                    nameRU={movie.nameRU}
                    duration={movie.duration}
                    image={movie.image}
                    trailerLink={movie.trailerLink}
                    movieInfo={movie}
                    isSavedOnLoad={onIsMovieSaved?.(movie.id)}
                    onSave={onSaveMovie}
                    onDelete={onDeleteMovie}
                  />
                );
              })
            }
          </ul>
          <MoreButton
            moviesList={moviesList}
            setMoviesCountLimit={setMoviesCountLimit}
          />
        </>
      }
    </section>
  );
};

MoviesCardList.propTypes = {
  moviesList: PropTypes.array,
  onIsMovieSaved: PropTypes.func,
  onSaveMovie: PropTypes.func,
  onDeleteMovie: PropTypes.func
};

export default MoviesCardList;