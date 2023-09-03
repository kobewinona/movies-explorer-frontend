import React from 'react';

import logo from '../../images/logo.svg'

import './Header.css';


const Header = () => {


  return (
    <header className="header">
      <div className="header__container">
        <img src={logo} alt="Логотип."/>
      </div>
    </header>
  );
};

export default Header;