import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import ProfileLink from '../Shared/ProfileLink/ProfileLink';

import './BurgerMenu.css';


const BurgerMenu = ({isBurgerMenuOpen, onClose}) => {
  const [isBurgerMenuVisible, setBurgerMenuVisible] = useState(false);
  
  useEffect(() => {
    if (isBurgerMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isBurgerMenuOpen]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setBurgerMenuVisible(true);
    }, 200);
    
    return () =>  clearTimeout(timer);
  }, []);
  
  return (
    <>
      <div
        className={`burger-menu
        ${isBurgerMenuOpen && 'burger-menu_open'}`}
        onClick={onClose}
      ></div>
      <div
        className={`burger-menu__container
        ${isBurgerMenuVisible && 'burger-menu__container_visible'}
        ${isBurgerMenuOpen ? 'appear' : 'disappear'}`}
      >
        <nav className="burger-menu__navigation">
          <ul className="burger-menu__navigation-container">
            <li>
              <Link className="burger-menu__link" to="/"
              >Главная
              </Link>
            </li>
            <li>
              <Link className="burger-menu__link" to="/movies"
              >Фильмы
              </Link>
            </li>
            <li>
              <Link className="burger-menu__link" to="/saved-movies"
              >Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <ProfileLink/>
        </nav>
      </div>
    </>
  );
};

BurgerMenu.propTypes = {
  isBurgerMenuOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default BurgerMenu;