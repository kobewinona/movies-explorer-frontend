import React from 'react';
import {Link} from 'react-router-dom';

import logo from '../../../images/logo.svg';

import './HomeLinkWithLogo.css';


const HomeLinkWithLogo = () => {
  return (
    <Link className="home-link-with-logo" to="/">
      <img src={logo} alt="Логотип."/>
    </Link>
  );
};

export default HomeLinkWithLogo;