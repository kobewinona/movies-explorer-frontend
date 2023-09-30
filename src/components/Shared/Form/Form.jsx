import PropTypes from 'prop-types';
import React from 'react';

import useFormWithValidation from '../../../hooks/useFormWithValidation';

import Spinner from '../Spinner/Spinner';

import './Form.css';


const Form = ({showDefaultSubmitButton, initialValues, onSubmit, isUpdating, serverErrorMessage, ...props}) => {
  const {isFormValid, handleChange, resetForm} = useFormWithValidation(initialValues);
  
  const handleSubmit = event => {
    event.preventDefault();

    onSubmit();

    resetForm();
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
        <div>
          <p className="form__error-message">{serverErrorMessage}</p>
          <button
            className={`form__submit
          ${!isFormValid && 'form__submit_disabled'}
          ${isUpdating && 'form__submit_updated'}`}
            type="submit"
            name="submit"
            disabled={!isFormValid || isUpdating}
          >{isUpdating ? <Spinner/> : props.submitText || 'Сохранить'}
          </button>
        </div>
      }
    </form>
  );
};

Form.propTypes = {
  showDefaultSubmitButton: PropTypes.bool,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  name: PropTypes.string,
  submitText: PropTypes.string,
  isUpdating: PropTypes.bool,
  children: PropTypes.any,
  serverErrorMessage: PropTypes.string,
  props: PropTypes.object
};

export default Form;