import React from 'react';
import {NavLink} from 'react-router-dom';

import ProfileLink from '../Shared/ProfileLink/ProfileLink';

import './NavTab.css';


const NavTab = () => {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li>
          <NavLink
            className={({isActive}) => {
              return (`nav-tab__link ${isActive && 'nav-tab__link_active'}`)
            }}
            to="/movies"
          >Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({isActive}) => {
              return (`nav-tab__link ${isActive && 'nav-tab__link_active'}`)
            }}
            to="/saved-movies"
          >Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <ProfileLink/>
    </nav>
  );
};

export default NavTab;