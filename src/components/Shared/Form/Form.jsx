import PropTypes from 'prop-types';
import React from 'react';

import useFormWithValidation from '../../../hooks/useFormWithValidation';

import './Form.css';


const Form = ({onSubmit, showDefaultSubmitButton, ...props}) => {
  const {
    isFormValid,
    handleChange
  } = useFormWithValidation();
  
  const handleSubmit = event => {
    event.preventDefault();
    
    onSubmit();
  };
  
  return (
    <form
      className="form"
      onChange={handleChange}
      onSubmit={handleSubmit}
      name={props.name}
      noValidate
    >
      {props.children}
      {
        showDefaultSubmitButton &&
        <button
          className={`form__submit
          ${!isFormValid && 'form__submit_disabled'}`}
          type="submit"
          name="submit"
          disabled={!isFormValid}
        >{props.submitText || 'Сохранить'}
        </button>
      }
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  name: PropTypes.string,
  submitText: PropTypes.string,
  children: PropTypes.any,
  showDefaultSubmitButton: PropTypes.bool
};

export default Form;