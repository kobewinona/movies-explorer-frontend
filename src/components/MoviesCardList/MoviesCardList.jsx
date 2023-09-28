import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {useWidthPaginator} from '../../hooks/useWidthPaginator';

import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';


const MoviesCardList = ({moviesList, onIsMovieSaved, onSaveMovie, onDeleteMovie}) => {
  const [deviceWidth, setDeviceWidth] = useState(0);
  const {extendMoviesCountLimit, moviesCountLimit} = useWidthPaginator(deviceWidth);
  
  // console.log('moviesList', moviesList);
  
  const handleDeviceWidthResize = () => {
    setDeviceWidth(window.innerWidth);
  };
  
  useEffect(() => {
    setDeviceWidth(window.innerWidth);
    
    let timer;
    
    window.addEventListener('resize', () => {
      timer = setTimeout(() => {
        handleDeviceWidthResize();
      }, 400);
    });
    
    return () => {
      window.removeEventListener('resize', handleDeviceWidthResize);
      clearTimeout(timer);
    };
  }, []);
  
  // TODO remove more button from SavedMovies
  
  return (
    <section className="movies-card-list">
      {
        <>
          <ul className="movies-card-list__container">
            {
              moviesList.map((movie, index) => {
                return (index < moviesCountLimit &&
                  <MoviesCard
                    key={index}
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
          <div className="movies-card-list__more-button-container">
            {
              moviesList.length > moviesCountLimit &&
              <button
                className="movies-card-list__more-button"
                onClick={extendMoviesCountLimit}
              >Ещё
              </button>
            }
          </div>
        </>
      }
    </section>
  );
};

MoviesCardList.propTypes = {
  moviesList: PropTypes.array,
  savedMoviesList: PropTypes.array,
  onIsMovieSaved: PropTypes.func,
  onSaveMovie: PropTypes.func,
  onDeleteMovie: PropTypes.func
};

export default MoviesCardList;