import React from 'react';
import PropTypes from 'prop-types';

import './Title.css';

const Title = ({text}) => {
  return (
    <h2 className="title">{text}</h2>
  );
};

Title.propTypes = {
  text: PropTypes.string,
};

export default Title;