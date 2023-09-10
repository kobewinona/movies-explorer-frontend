import React from 'react';

import PropTypes from 'prop-types';

import './Burger.css';

const Burger = ({ onToggle, isNavTabShown }) => {


  return (
    <div className="burger" onClick={onToggle}>
      <div className={`burger__icon ${isNavTabShown && 'burger__icon_turned-into-cross'}`}></div>
    </div>
  );
};

Burger.propTypes = {
  onToggle: PropTypes.func,
  isNavTabShown: PropTypes.bool
}

export default Burger;