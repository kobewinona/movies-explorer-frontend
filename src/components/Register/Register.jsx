import PropTypes from 'prop-types';
import React, {useState} from 'react';
// import {Link} from 'react-router-dom';
// import logo from '../../images/logo.svg';
import Auth from '../Auth/Auth';
import Form from '../Shared/Form/Form';
import InputWithErrorMessage from '../Shared/InputWithErrorMessage/InputWithErrorMessage';

import './Register.css';


const Register = ({onSignUp}) => {
  const [inputValues, setInputValues] = useState({});
  
  const handleValuesUpdate = (name, value) => {
    setInputValues(prevValues => ({
      ...prevValues, [name]: value
    }));
  };
  
  const handleSubmit = () => {
    onSignUp(inputValues);
  };
  
  return (
    <section className="register">
      <Auth message="Добро пожаловать!">
        <Form
          onSubmit={handleSubmit}
          name="sign-up"
          submitText="Зарегистрироваться"
          isUpdating={false}
          showDefaultSubmitButton={true}
        >
          <div>
            <p className="register__input-title">Имя</p>
            <InputWithErrorMessage
              onUpdate={handleValuesUpdate}
              name="userName"
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
              name="userEmail"
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
  onSignUp: PropTypes.func,
  showDefaultSubmitButton: PropTypes.bool
};

export default Register;