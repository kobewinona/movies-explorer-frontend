import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../../images/logo.svg'

import './Header.css';


const Header = ({isHidden}) => {
  const location = useLocation();

  console.log('isHidden', isHidden);

  const [isMainPage, setIsMainPage] = useState(false);

  useEffect(() => {
    if (location.pathname === '/')
      setIsMainPage(true);
  }, []);

  return (
    <header className={`header ${isMainPage && 'header_place_main'} ${isHidden && 'header_hidden'}`}>
      <div className="header__container">
        <img src={logo} alt="Логотип."/>
      </div>
    </header>
  );
};

Header.propTypes = {
  isHidden: PropTypes.bool
};

export default Header;