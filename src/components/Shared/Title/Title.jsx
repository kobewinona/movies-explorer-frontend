import PropTypes from 'prop-types';
import React from 'react';

import './Title.css';


const Title = ({text}) => {
  return (
    <h2 className="title">{text}</h2>
  );
};

Title.propTypes = {
  text: PropTypes.string
};

export default Title;