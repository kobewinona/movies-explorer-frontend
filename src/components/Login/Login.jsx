import PropTypes from 'prop-types';
import React, {useState} from 'react';

import Form from '../Shared/Form/Form';
import Input from '../Shared/Input/Input';

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
    <>
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
          <Input
            onUpdate={handleValuesUpdate}
            validate={true}
            name="userEmail"
            type="email"
            aria-label="E-mail."
            required
          />
          <p className="login__input-title">Пароль</p>
          <Input
            onUpdate={handleValuesUpdate}
            validate={true}
            name="password"
            type="password"
            aria-label="Пароль."
            required
          />
        </div>
      </Form>
    </>
  );
};

Login.propTypes = {
  onSignIn: PropTypes.func
};

export default Login;