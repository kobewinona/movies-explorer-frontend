import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
// import {useLocation} from 'react-router-dom';

import {moviesURL} from '../../utils/props';

import './MoviesCard.css';
import MovieCardButton from '../MovieCardButton/MovieCardButton';


const MoviesCard = ({movieId, movieInfo, isSavedOnLoad, onSave, onDelete}) => {
  // const {pathname} = useLocation();
  const {nameRU, duration, image, trailerLink} = movieInfo;
  const imageURL = image.url ? `${moviesURL}${image.url}` : image;
  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSaveMovie = () => {
    if (isSaved) {
      onDelete(movieId);
      setIsSaved(false);
    } else {
      onSave(movieInfo);
      setIsSaved(true);
    }
  };
  
  useEffect(() => {
    setIsSaved(isSavedOnLoad);
  }, [isSavedOnLoad]);
  
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
      <MovieCardButton isSaved={isSaved} onSave={handleSaveMovie} onDelete={onDelete} movieId={movieId}/>
    </li>
  );
};

MoviesCard.propTypes = {
  movieId: PropTypes.number,
  movieInfo: PropTypes.object,
  isSavedOnLoad: PropTypes.bool,
  onSave: PropTypes.func,
  onDelete: PropTypes.func
};

export default MoviesCard;