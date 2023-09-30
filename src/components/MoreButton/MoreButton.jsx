import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import {useWidthPaginator} from '../../hooks/useWidthPaginator';

import './MoreButton.css';


const MoreButton = ({moviesList, setMoviesCountLimit}) => {
  const {pathname} = useLocation();
  const [deviceWidth, setDeviceWidth] = useState(0);
  const {extendMoviesCountLimit, moviesCountLimit} = useWidthPaginator(deviceWidth);
  
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
  
  useEffect(() => {
    setMoviesCountLimit(moviesCountLimit)
  }, [moviesCountLimit]);
  
  return (
    <div className="more-button">
      {
        pathname === '/movies'
        ? moviesList?.length > moviesCountLimit &&
          <button
            className="more-button__button"
            onClick={extendMoviesCountLimit}
          >Ещё
          </button>
        : setMoviesCountLimit((prevState) => prevState + moviesList?.length)
      }
    </div>
  );
};

MoreButton.propTypes = {
  moviesList: PropTypes.array,
  setMoviesCountLimit: PropTypes.func
}

export default MoreButton;