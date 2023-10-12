import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import useServerErrorMessage from '../../hooks/useServerErrorMessage';

import Auth from '../Auth/Auth';
import Form from '../Shared/Form/Form';
import InputWithErrorMessage from '../Shared/InputWithErrorMessage/InputWithErrorMessage';

import './Login.css';


const Login = ({isLoggedIn, onSignIn, isUpdating, serverErrorMessage, setServerErrorMessage}) => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({});
  useServerErrorMessage(inputValues, setServerErrorMessage);
  
  const handleValuesUpdate = (name, value) => {
    setInputValues(prevValues => ({
      ...prevValues, [name]: value
    }));
  };
  
  const handleSubmit = () => {
    onSignIn(inputValues);
  };
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', {replace: true});
    }
  }, [isLoggedIn]);
  
  return (
    <section className="login">
      <Auth message="Рады видеть!">
        <Form
          showDefaultSubmitButton={true}
          onSubmit={handleSubmit}
          isUpdating={isUpdating}
          serverErrorMessage={serverErrorMessage}
          name="signin"
          submitText="Войти"
        >
          <div>
            <p className="login__input-title">E-mail</p>
            <InputWithErrorMessage
              onUpdate={handleValuesUpdate}
              name="email"
              placeholder="E-mail"
              type="email"
              aria-label="E-mail."
              required
            />
            <p className="login__input-title">Пароль</p>
            <InputWithErrorMessage
              onUpdate={handleValuesUpdate}
              name="password"
              placeholder="Пароль"
              type="password"
              aria-label="Пароль."
              required
            />
          </div>
        </Form>
      </Auth>
    </section>
  );
};

Login.propTypes = {
  isLoggedIn: PropTypes.bool,
  onSignIn: PropTypes.func,
  isUpdating: PropTypes.bool,
  serverErrorMessage: PropTypes.string,
  setServerErrorMessage: PropTypes.func
};

export default Login;