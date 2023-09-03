import React from 'react';
import PropTypes from 'prop-types';

import './MoviesCard.css';


const MoviesCard = ({nameRU, duration, image}) => {
  return (
    <li className="movies-card">
      <div className="movies-card__details">
        <h3 className="movies-card__title">{nameRU}</h3>
        <p className="movies-card__duration">{duration}</p>
      </div>
      <img className="movies-card__image" src={image} alt="" />
      <button className="movies-card__button">Сохранить</button>
    </li>
  );
};

MoviesCard.propTypes = {
  nameRU: PropTypes,
  duration: PropTypes,
  image: PropTypes
}

export default MoviesCard;