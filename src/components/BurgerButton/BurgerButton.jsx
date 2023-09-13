import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import './BurgerButton.css';


const BurgerButton = ({onToggle, isBurgerMenuOpen}) => {
  const [isBurgerButtonVisible, setIsBurgerButtonVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBurgerButtonVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div
      className={`burger-button
      ${isBurgerButtonVisible && 'burger-button_visible'}`}
      onClick={onToggle}
    >
      <div
        className={`burger-button__icon
        ${isBurgerMenuOpen && 'burger-button__icon_turned-into-cross'}`}
      ></div>
    </div>
  );
};

BurgerButton.propTypes = {
  onToggle: PropTypes.func,
  isBurgerMenuOpen: PropTypes.bool
};

export default BurgerButton;