import PropTypes from 'prop-types';
import React from 'react';

import './MoviesPaginator.css';


const MoviesPaginator = ({moviesCount}) => {
  return (
    <div className="movies-paginator">
      {
        moviesCount > 3
        && <button className="movies-paginator__button">Ещё</button>
      }
    </div>
  );
};

MoviesPaginator.propTypes = {
  moviesCount: PropTypes.number
};

export default MoviesPaginator;