import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../../images/logo.svg'

import Burger from '../Burger/Burger';
import NavTab from '../NavTab/NavTab';

import './Header.css';
// import NavMenu from '../NavMenu/NavMenu';


const Header = ({isHidden}) => {
  const location = useLocation();

  const [isMainPage, setIsMainPage] = useState(false);
  const [isNavTabShown, setIsNavTabShown] = useState(false);

  const handleNavTabToggle = () => {
    setIsNavTabShown(!isNavTabShown);
  };

  useEffect(() => {
    if (location.pathname === '/')
      setIsMainPage(true);
  }, []);

  return (
    <header className={`header ${isMainPage && 'header_place_main'} ${isHidden && 'header_hidden'}`}>
      <div className="header__container">
        <Link to="/"><img src={logo} alt="Логотип." /></Link>
        {/*<NavMenu />*/}
        <NavTab isNavTabShown={isNavTabShown} />
        <Burger onToggle={handleNavTabToggle} isNavTabShown={isNavTabShown} />
      </div>
    </header>
  );
};

Header.propTypes = {
  isHidden: PropTypes.bool
};

export default Header;