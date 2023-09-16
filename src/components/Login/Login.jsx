import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Auth from '../Auth/Auth';

import Form from '../Shared/Form/Form';
import InputWithErrorMessage from '../Shared/InputWithErrorMessage/InputWithErrorMessage';

import './Login.css';


const Login = ({onSignIn}) => {
  const [inputValues, setInputValues] = useState({});
  
  const handleValuesUpdate = (name, value) => {
    setInputValues(prevValues => ({
      ...prevValues, [name]: value
    }));
  };
  
  const handleSubmit = () => {
    onSignIn(inputValues);
  };
  
  return (
    <section className="login">
      <Auth message="Рады видеть!">
        <Form
          validate={true}
          onSubmit={handleSubmit}
          name="sign-in"
          submitText="Войти"
          isUpdating={false}
          showDefaultSubmitButton={true}
        >
          <div>
            <p className="login__input-title">E-mail</p>
            <InputWithErrorMessage
              onUpdate={handleValuesUpdate}
              name="userEmail"
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
  onSignIn: PropTypes.func
};

export default Login;