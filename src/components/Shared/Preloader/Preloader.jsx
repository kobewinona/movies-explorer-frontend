import PropTypes from 'prop-types';
import React from 'react';

import './Preloader.css';


const Preloader = ({size, color}) => {
  return (
    <div
      className={`preloader ${size && `preloader_size_${size}`}`}>
      <div
        className={`preloader__container ${size && `preloader__container_size_${size}`}`}
      >
        <span
          className={`preloader__circle ${color && `preloader__circle_color_${color}`}`}
        >
        </span>
      </div>
    </div>
  );
};

Preloader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
};

export default Preloader;