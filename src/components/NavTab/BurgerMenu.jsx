import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

import './BurgerMenu.css';


const BurgerMenu = ({isNavTabShown}) => {
  useEffect(() => {
    if (isNavTabShown) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isNavTabShown]);
  
  return (
    <>
      <div className={`burger-menu ${isNavTabShown && 'burger-menu__visible'}`}></div>
      <div className={`burger-menu__container ${isNavTabShown ? 'appear' : 'disappear'}`}>
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
  isNavTabShown: PropTypes.bool
};

export default BurgerMenu;