import React from 'react';
import {Link} from 'react-router-dom';

import ProfileLink from '../Shared/ProfileLink/ProfileLink';

import './NavTab.css';


const NavTab = () => {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li>
          <Link
            className="nav-tab__link nav-tab__link_accented"
            to="/movies"
          >Фильмы
          </Link>
        </li>
        <li>
          <Link
            className="nav-tab__link"
            to="/saved-movies"
          >Сохранённые фильмы
          </Link>
        </li>
      </ul>
      <ProfileLink/>
    </nav>
  );
};

export default NavTab;