import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import {AuthContext} from '../../contexts/AuthContext';
import logo from '../../images/logo.svg';

import BurgerMenu from '../BurgerMenu/BurgerMenu';
import NavTab from '../NavTab/NavTab';
import BurgerButton from '../BurgerButton/BurgerButton';

import './Header.css';


const Header = ({isHidden}) => {
  const isLoggedIn = useContext(AuthContext);
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
      <BurgerMenu isBurgerMenuOpen={isBurgerMenuOpen} onClose={handleBurgerMenuToggle}/>
      <div className="header__container">
        <Link to="/"><img src={logo} alt="Логотип."/></Link>
        {
          isLoggedIn
          ?
            <>
              <BurgerButton onToggle={handleBurgerMenuToggle} isBurgerMenuOpen={isBurgerMenuOpen}/>
              <NavTab/>
            </>
          :
            <ul className="header__login-menu">
              <li><Link className="header__register-link" to="/signup">Регистрация</Link></li>
              <li><Link className="header__login-link" to="/signin">Войти</Link></li>
            </ul>
        }
      </div>
    </header>
  );
};

Header.propTypes = {
  isHidden: PropTypes.bool
};

export default Header;