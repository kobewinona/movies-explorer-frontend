import PropTypes from 'prop-types';
import React from 'react';

import './BurgerButton.css';


const BurgerButton = ({onToggle, isBurgerMenuOpen}) => {
  return (
    <div className="burger-button" onClick={onToggle}>
      <div
        className={`burger-button__icon ${isBurgerMenuOpen && 'burger-button__icon_turned-into-cross'}`}
      ></div>
    </div>
  );
};

BurgerButton.propTypes = {
  onToggle: PropTypes.func,
  isBurgerMenuOpen: PropTypes.bool
};

export default BurgerButton;