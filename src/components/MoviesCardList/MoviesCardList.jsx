import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {useWidthPaginator} from '../../hooks/useWidthPaginator';

import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';


const MoviesCardList = ({moviesList}) => {
  const [deviceWidth, setDeviceWidth] = useState(0);
  const {
    extendMoviesCountLimit,
    moviesCountLimit
  } = useWidthPaginator(deviceWidth);
  
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
  isSearchQueryPut: PropTypes.bool,
  moviesList: PropTypes.array
};

export default MoviesCardList;