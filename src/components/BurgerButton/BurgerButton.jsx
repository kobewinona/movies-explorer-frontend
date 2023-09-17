import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import './BurgerButton.css';


// eslint-disable-next-line no-unused-vars
const BurgerButton = ({onToggle, isBurgerMenuOpen}) => {
  const [isBurgerButtonVisible, setIsBurgerButtonVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBurgerButtonVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <button
      className={`burger-button
      ${isBurgerButtonVisible && 'burger-button_visible'}`}
      role="button"
      tabIndex={0}
      onClick={onToggle}
    >
      <div
        className={`burger-button__icon
        ${isBurgerMenuOpen && 'burger-button__icon_turned-into-cross'}`}
      ></div>
    </button>
  );
};

BurgerButton.propTypes = {
  onToggle: PropTypes.func,
  isBurgerMenuOpen: PropTypes.bool
};

export default BurgerButton;