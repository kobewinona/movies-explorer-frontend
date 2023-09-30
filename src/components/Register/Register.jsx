import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import useServerErrorMessage from '../../hooks/useServerErrorMessage';

import Auth from '../Auth/Auth';
import Form from '../Shared/Form/Form';
import InputWithErrorMessage from '../Shared/InputWithErrorMessage/InputWithErrorMessage';

import './Register.css';


const Register = ({isLoggedIn, onSignUp, isUpdating, serverErrorMessage, setServerErrorMessage}) => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({});
  useServerErrorMessage(inputValues, setServerErrorMessage);
  
  const handleValuesUpdate = (name, value) => {
    setInputValues(prevState => ({
      ...prevState, [name]: value
    }));
  };
  
  const handleSubmit = () => {
    onSignUp(inputValues);
  };
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', {replace: true});
    }
  }, [isLoggedIn]);
  
  return (
    <section className="register">
      <Auth message="Добро пожаловать!">
        <Form
          showDefaultSubmitButton={true}
          onSubmit={handleSubmit}
          isUpdating={isUpdating}
          serverErrorMessage={serverErrorMessage}
          name="signup"
          submitText="Зарегистрироваться"
        >
          <div>
            <p className="register__input-title">Имя</p>
            <InputWithErrorMessage
              onUpdate={handleValuesUpdate}
              name="name"
              placeholder="Имя"
              type="text"
              aria-label="Имя."
              minLength="2"
              maxLength="40"
              required
            />
            <p className="register__input-title">E-mail</p>
            <InputWithErrorMessage
              onUpdate={handleValuesUpdate}
              name="email"
              placeholder="E-mail"
              type="email"
              aria-label="E-mail."
              required
            />
            <p className="register__input-title">Пароль</p>
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

Register.propTypes = {
  isLoggedIn: PropTypes.bool,
  onSignUp: PropTypes.func,
  isUpdating: PropTypes.bool,
  serverErrorMessage: PropTypes.string,
  setServerErrorMessage: PropTypes.func
};

export default Register;