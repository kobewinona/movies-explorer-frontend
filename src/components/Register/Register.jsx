import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Form from '../Shared/Form/Form';
import Input from '../Shared/Input/Input';

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
    <>
      <Form
        validate={true}
        onSubmit={handleSubmit}
        name="sign-up"
        submitText="Зарегистрироваться"
        isUpdating={false}
      >
        <div>
          <p className="register__input-title">Имя</p>
          <Input
            onUpdate={handleValuesUpdate}
            validate={true}
            name="userName"
            type="text"
            aria-label="Имя."
            minLength="2"
            maxLength="40"
            required
          />
          <p className="register__input-title">E-mail</p>
          <Input
            onUpdate={handleValuesUpdate}
            validate={true}
            name="userEmail"
            type="email"
            aria-label="E-mail."
            minLength="2"
            maxLength="40"
            required
          />
          <p className="register__input-title">Пароль</p>
          <Input
            onUpdate={handleValuesUpdate}
            validate={true}
            name="password"
            type="password"
            aria-label="Пароль."
            minLength="2"
            maxLength="40"
            required
          />
        </div>
      </Form>
    </>
  );
};

Register.propTypes = {
  onSignUp: PropTypes.func
}

export default Register;