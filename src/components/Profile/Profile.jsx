import PropTypes from 'prop-types';
import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';

import Header from '../Header/Header';
import Form from '../Shared/Form/Form';
import InputWithErrorMessage from '../Shared/InputWithErrorMessage/InputWithErrorMessage';

import './Profile.css';


const Profile = ({onEdit}) => {
  const currentUser = useContext(CurrentUserContext);
  
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  
  const [inputValues, setInputValues] = useState({});
  
  const handleModeSwitch = () => {
    setIsEditModeOn(!isEditModeOn);
  };
  
  const handleValuesUpdate = (name, value) => {
    setInputValues(prevValues => ({
      ...prevValues, [name]: value
    }));
  };
  
  const handleSubmit = () => {
    onEdit(inputValues);
  };
  
  return (
    <>
      <Header/>
      <main>
        <section className="profile">
          <p className="profile__greeting">{`Привет, ${currentUser.name}!`}</p>
          {
            isEditModeOn
              ?
              <Form
                validate={true}
                onSubmit={handleSubmit}
                showDefaultSubmitButton={true}
                name="sign-up"
                submitText="Сохранить"
                isUpdating={false}
              >
                <div>
                  <p className="profile__input-title">Имя</p>
                  <InputWithErrorMessage
                    onUpdate={handleValuesUpdate}
                    name="userName"
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
                    type="email"
                    aria-label="E-mail."
                    minLength="2"
                    maxLength="40"
                    required
                  />
                </div>
              </Form>
              :
              <>
                <ul className="profile__data-container">
                  <li className="profile__data-cell">
                    <p className="profile__data-title">Имя</p>
                    <p className="profile__data-content">{currentUser.name}</p>
                  </li>
                  <li className="profile__data-cell">
                    <p className="profile__data-title">E-mail</p>
                    <p className="profile__data-content">{currentUser.email}</p>
                  </li>
                </ul>
              </>
          }
          <ul className="profile__control">
            {
              isEditModeOn
                ?
                <li>
                  <button
                    className="profile__button"
                    onClick={handleModeSwitch}
                  >Отменить
                  </button>
                </li>
                :
                <li>
                  <button
                    className="profile__button profile__button_style_normal"
                    onClick={handleModeSwitch}
                  >Редактировать
                  </button>
                </li>
            }
            <li>
              <Link className="profile__link" to="/signin">
                <button className="profile__button profile__button_style_bright">Выйти из аккаунта</button>
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};

Profile.propTypes = {
  onEdit: PropTypes.func
};

export default Profile;