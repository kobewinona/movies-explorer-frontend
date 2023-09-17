import PropTypes from 'prop-types';
import React from 'react';
import {Link, useLocation} from 'react-router-dom';

import HomeLinkWithLogo from '../Shared/HomeLinkWithLogo/HomeLinkWithLogo';

import './Auth.css';


const Auth = ({message, ...props}) => {
  const {pathname} = useLocation();
  
  return (
    <div className="auth">
      <div className="auth__message-container">
        <HomeLinkWithLogo/>
        <p className="auth__message">{message}</p>
      </div>
      <div className="auth__form-container">
        {props.children}
      </div>
      {
        pathname === '/signup'
        && <p className="auth__link-message">Уже зарегистрированы?
          <Link className="auth__link" to="/signin"> Войти</Link>
        </p>
      }
      {
        pathname === '/signin'
        && <p className="auth__link-message">Ещё не зарегистрированы?
          <Link className="auth__link" to="/signup"> Регистрация</Link>
        </p>
      }
    </div>
  );
};

Auth.propTypes = {
  message: PropTypes.string,
  children: PropTypes.any
};

export default Auth;