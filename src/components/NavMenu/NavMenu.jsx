import React from 'react';

import './NavMenu.css';
import {Link} from 'react-router-dom';


const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <ul className="nav-menu__container">
        <li><Link className="nav-menu__link" to="/">Главная</Link></li>
        <li><Link className="nav-menu__link" to="/movies">Фильмы</Link></li>
        <li><Link className="nav-menu__link" to="/saved-movies">Сохранённые фильмы</Link></li>
      </ul>
      <div className="nav-menu__profile-link-container">
        <Link className="nav-menu__profile-link" to="/profile">Аккаунт</Link>
        <div className="nav-menu__profile--link-icon"></div>
      </div>
    </nav>
  );
};

export default NavMenu;