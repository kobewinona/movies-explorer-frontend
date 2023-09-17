import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

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
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="burger-menu">
      <div
        className={`burger-menu__base
        ${isBurgerMenuOpen ? 'burger-menu__base_visible' : 'burger-menu__base_hidden'}`}
        onClick={onClose}
      ></div>
      <div
        className={`burger-menu__container
        ${isBurgerMenuVisible && 'burger-menu__container_visible'}
        ${isBurgerMenuOpen ? 'appear' : 'disappear'}`}
      >
        <nav className="burger-menu__nav">
          <ul className="burger-menu__nav-container">
            <li>
              <NavLink
                className={({isActive}) => {
                  return (`burger-menu__link ${isActive && 'burger-menu__link_active'}`);
                }}
                to="/"
                onClick={onClose}
              >Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({isActive}) => {
                  return (`burger-menu__link ${isActive && 'burger-menu__link_active'}`);
                }}
                to="/movies"
                onClick={onClose}
              >Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({isActive}) => {
                  return (`burger-menu__link ${isActive && 'burger-menu__link_active'}`);
                }}
                to="/saved-movies"
                onClick={onClose}
              >Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <ProfileLink onClose={onClose}/>
        </nav>
      </div>
    </div>
  );
};

BurgerMenu.propTypes = {
  isBurgerMenuOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default BurgerMenu;