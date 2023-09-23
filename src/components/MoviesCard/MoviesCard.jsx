import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';

import {moviesURL} from '../../utils/props';

import './MoviesCard.css';


const MoviesCard = ({movieId, movieInfo, onIsMovieSaved, onSave, onDelete}) => {
  const {pathname} = useLocation();
  const {nameRU, duration, image, trailerLink} = movieInfo;
  const imageURL = image.url ? `${moviesURL}${image.url}` : image;
  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isSaved, setIsSaved] = useState(onIsMovieSaved?.(movieInfo.id));
  
  const toggleSaveMovie = () => {
    if (isSaved) {
      onDelete(movieId);
      setIsSaved(false);
    } else {
      onSave(movieInfo);
      setIsSaved(true);
    }
  };
  
  return (
    <li className="movies-card">
      <div className="movies-card__details">
        <h3 className="movies-card__title" title={nameRU}>{nameRU}</h3>
        <p className="movies-card__duration">{`${durationHours}ч ${durationMinutes}м`}</p>
      </div>
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img
          className={`movies-card__image ${isImageLoaded && 'movies-card__image_visible'}`}
          src={imageURL}
          alt="Постер к фильму."
          onLoad={() => setIsImageLoaded(true)}
        />
      </a>
      {
        pathname === '/saved-movies'
          ?
          <button
            className="movies-card__button"
            onClick={() => onDelete(movieId)}
          >
            <div className="movies-card__uncheck-icon"></div>
          </button>
          :
          <button
            className={`movies-card__button ${isSaved && 'movies-card__button_active'}`}
            onClick={toggleSaveMovie}>
            {
              isSaved
                ? <div className="movies-card__check-icon jump-up"></div>
                : 'Сохранить'
            }
          </button>
      }
    </li>
  );
};

MoviesCard.propTypes = {
  movieId: PropTypes.number,
  movieInfo: PropTypes.object,
  onIsMovieSaved: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func
};

export default MoviesCard;