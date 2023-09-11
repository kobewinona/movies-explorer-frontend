import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import logo from '../../images/logo.svg';

import BurgerMenu from '../BurgerMenu/BurgerMenu';
import BurgerButton from '../Burger/BurgerButton';

import './Header.css';


const Header = ({isHidden}) => {
  const location = useLocation();
  const [isMainPage, setIsMainPage] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  
  const handleBurgerMenuToggle = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };
  
  useEffect(() => {
    if (location.pathname === '/')
      setIsMainPage(true);
  }, []);
  
  return (
    <header className={`header ${isMainPage && 'header_place_main'} ${isHidden && 'header_hidden'}`}>
      <BurgerMenu isBurgerMenuOpen={isBurgerMenuOpen}/>
      <div className="header__container">
        <Link to="/"><img src={logo} alt="Логотип."/></Link>
        <BurgerButton onToggle={handleBurgerMenuToggle} isBurgerMenuOpen={isBurgerMenuOpen}/>
      </div>
    </header>
  );
};

Header.propTypes = {
  isHidden: PropTypes.bool
};

export default Header;