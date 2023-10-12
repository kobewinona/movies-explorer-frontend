import PropTypes from 'prop-types';
import React from 'react';
import {useLocation} from 'react-router-dom';

import './MovieCardButton.css';


const MovieCardButton = ({isSaved, onSave, onDelete, movieId}) => {
  const {pathname} = useLocation();
  
  return (
    <>
      {
        pathname === '/saved-movies'
          ?
          <button
            className="movies-card-button"
            onClick={() => onDelete(movieId)}
          >
            <div className="movies-card-button__uncheck-icon"></div>
          </button>
          :
          <button
            className={`movies-card-button ${isSaved && 'movies-card-button_active'}`}
            onClick={onSave}>
            {
              isSaved
                ? <div className="movies-card-button__check-icon jump-up"></div>
                : 'Сохранить'
            }
          </button>
      }
    </>
  );
};

MovieCardButton.propTypes = {
  isSaved: PropTypes.bool,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  movieId: PropTypes.number
}

export default MovieCardButton;