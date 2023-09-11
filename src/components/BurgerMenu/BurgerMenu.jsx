import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

import './BurgerMenu.css';


const BurgerMenu = ({isBurgerMenuOpen}) => {
  useEffect(() => {
    if (isBurgerMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isBurgerMenuOpen]);
  
  return (
    <>
      <div className={`burger-menu ${isBurgerMenuOpen && 'burger-menu__visible'}`}></div>
      <div className={`burger-menu__container ${isBurgerMenuOpen ? 'appear' : 'disappear'}`}>
        <nav className="burger-menu__navigation">
          <ul className="burger-menu__navigation-container">
            <li><Link className="burger-menu__link" to="/">Главная</Link></li>
            <li><Link className="burger-menu__link" to="/movies">Фильмы</Link></li>
            <li><Link className="burger-menu__link" to="/saved-movies">Сохранённые фильмы</Link></li>
          </ul>
          <div className="burger-menu__profile-link-container">
            <Link className="burger-menu__profile-link" to="/profile">Аккаунт</Link>
            <div className="burger-menu__profile--link-icon"></div>
          </div>
        </nav>
      </div>
    </>
  );
};

BurgerMenu.propTypes = {
  isBurgerMenuOpen: PropTypes.bool
};

export default BurgerMenu;