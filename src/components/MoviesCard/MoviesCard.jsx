import PropTypes from 'prop-types';
import React, {useState} from 'react';

import './MoviesCard.css';


const MoviesCard = ({nameRU, duration, image}) => {
  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;
  const [isLiked, setIsLiked] = useState(false);
  
  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };
  
  return (
    <li className="movies-card">
      <div className="movies-card__details">
        <h3 className="movies-card__title">{nameRU}</h3>
        <p className="movies-card__duration">{`${durationHours}ч ${durationMinutes}м`}</p>
      </div>
      <img className="movies-card__image" src={image} alt=""/>
      <button className={`movies-card__button ${isLiked && 'movies-card__button_active'}`} onClick={handleToggleLike}>
        {
          isLiked
            ?
            <svg className="jump-up" xmlns="http://www.w3.org/2000/svg" width="100" height="29" viewBox="0 0 100 29" fill="none">
              <path d="M46 14.75L48.819 17L54 12.5" stroke="white" strokeWidth="1.5"/>
            </svg>
            : 'Сохранить'
        }</button>
    </li>
  );
};

MoviesCard.propTypes = {
  nameRU: PropTypes.string,
  duration: PropTypes.number,
  image: PropTypes.string
};

export default MoviesCard;