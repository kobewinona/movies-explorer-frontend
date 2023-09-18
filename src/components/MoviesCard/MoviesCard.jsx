import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';

import './MoviesCard.css';


const MoviesCard = ({nameRU, duration, image, trailerLink}) => {
  const {pathname} = useLocation();
  const imageURL = `https://api.nomoreparties.co${image.url}`;
  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;
  const [isLiked, setIsLiked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const handleToggleLike = () => {
    setIsLiked(!isLiked);
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
          <button className="movies-card__button">
            <div className="movies-card__uncheck-icon"></div>
          </button>
          :
          <button
            className={`movies-card__button ${isLiked && 'movies-card__button_active'}`}
            onClick={handleToggleLike}>
            {
              isLiked
                ? <div className="movies-card__check-icon jump-up"></div>
                : 'Сохранить'
            }
          </button>
      }
    </li>
  );
};

MoviesCard.propTypes = {
  nameRU: PropTypes.string,
  duration: PropTypes.number,
  image: PropTypes.object,
  trailerLink: PropTypes.string
};

export default MoviesCard;