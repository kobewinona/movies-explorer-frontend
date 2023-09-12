import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';

import Preloader from '../Preloader/Preloader';

import './Form.css';


const Form = ({validate, onSubmit, showDefaultSubmitButton, ...props}) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputsValidity, setInputsValidity] = useState({});
  
  const handleChange = event => {
    const inputs = Array.from(event.currentTarget.elements);
    
    const currentInputsValidity = inputs.reduce((validity, input) => {
      validity[input.name] = input.validity.valid;
      return validity;
    }, {});
    
    setInputsValidity(currentInputsValidity);
  };
  
  const validateForm = () => {
    const inputValues = Object.values(inputsValidity);
    
    if (inputValues.length === 0) {
      setIsFormValid(false);
      return;
    }
    
    setIsFormValid(inputValues.every((i) => i === true));
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    
    if (validate && event.target.checkValidity()) {
      onSubmit();
    } else {
      onSubmit();
    }
    
    setIsFormValid(false);
  };
  
  useEffect(() => {
    validateForm();
    
    // eslint-disable-next-line
  }, [inputsValidity]);
  
  useEffect(() => {
    setInputsValidity({});
  }, []);
  
  const submitButtonRef = useRef();
  
  if (!validate) {
    setTimeout(() => submitButtonRef.current?.focus(), 50);
  }
  
  return (
    <form
      className="form"
      onChange={event => validate && handleChange(event)}
      onSubmit={handleSubmit}
      name={props.name}
      noValidate
    >
      {props.children}
      {props.isUpdating
        ? <Preloader/>
        :
        showDefaultSubmitButton &&
        <button
          className={`form__submit ${validate ? !isFormValid && 'form__submit_disabled' : ''}`}
          type="submit"
          name="submit"
          disabled={validate ? !isFormValid : false}
        >{props.submitText || 'Сохранить'}</button>}
    </form>
  );
};

Form.propTypes = {
  validate: PropTypes.bool,
  onSubmit: PropTypes.func,
  name: PropTypes.string,
  submitText: PropTypes.string,
  children: PropTypes.any,
  isUpdating: PropTypes.bool,
  showDefaultSubmitButton: PropTypes.bool
};

export default Form;