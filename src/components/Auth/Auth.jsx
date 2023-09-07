import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../../images/logo.svg';

import './Auth.css';


const Auth = ({message, ...props}) => {
  const {pathname} = useLocation();

  return (
    <main>
      <section className="auth">
        <div>
          <img className="auth__logo" src={logo} alt=""/>
          <p className="auth__message">{message}</p>
        </div>
        {props.children}
        {
          pathname === '/signup'
            ? <p className="auth__link-message">Уже зарегистрированы?
                <Link className="auth__link" to="/signin"> Войти</Link>
              </p>
            : <p className="auth__link-message">Ещё не зарегистрированы?
                <Link className="auth__link" to="/signup"> Регистрация</Link>
              </p>
        }

      </section>
    </main>
  );
};

Auth.propTypes = {
  message: PropTypes.string,
  children: PropTypes.any
}

export default Auth;