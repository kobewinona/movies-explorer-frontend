import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import Auth from '../Auth/Auth';
import Form from '../Shared/Form/Form';
import InputWithErrorMessage from '../Shared/InputWithErrorMessage/InputWithErrorMessage';

import './Register.css';


const Register = ({onSignUp, isUpdating, serverErrorMessage, setServerErrorMessage}) => {
  const [inputValues, setInputValues] = useState(null);
  
  const handleValuesUpdate = (name, value) => {
    setInputValues(prevState => ({
      ...prevState, [name]: value
    }));
  };
  
  const handleSubmit = () => {
    onSignUp(inputValues);
  };
  
  useEffect(() => {
    setServerErrorMessage(undefined);
  }, [inputValues]);
  
  return (
    <section className="register">
      <Auth message="Добро пожаловать!">
        <Form
          showDefaultSubmitButton={true}
          onSubmit={handleSubmit}
          isUpdating={isUpdating}
          authErrorMessage={serverErrorMessage}
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
  onSignUp: PropTypes.func,
  isUpdating: PropTypes.bool,
  serverErrorMessage: PropTypes.string,
  setServerErrorMessage: PropTypes.func
};

export default Register;