import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import Auth from '../Auth/Auth';

import Form from '../Shared/Form/Form';
import InputWithErrorMessage from '../Shared/InputWithErrorMessage/InputWithErrorMessage';

import './Login.css';

const Login = ({isUpdating, onSignIn, authErrorMessage, onClearAuthErrorMessage}) => {
  const [inputValues, setInputValues] = useState({});
  
  const handleValuesUpdate = (name, value) => {
    setInputValues(prevValues => ({
      ...prevValues, [name]: value
    }));
  };
  
  const handleSubmit = () => {
    onSignIn(inputValues);
  };
  
  useEffect(() => {
    onClearAuthErrorMessage();
  }, [inputValues]);
  
  return (
    <section className="login">
      <Auth message="Рады видеть!">
        <Form
          onSubmit={handleSubmit}
          isUpdating={isUpdating}
          authErrorMessage={authErrorMessage}
          name="signin"
          submitText="Войти"
          showDefaultSubmitButton={true}
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
  isUpdating: PropTypes.bool,
  onSignIn: PropTypes.func,
  authErrorMessage: PropTypes.string,
  onClearAuthErrorMessage: PropTypes.func
};

export default Login;