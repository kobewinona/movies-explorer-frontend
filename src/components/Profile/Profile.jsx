import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';

import Header from '../Header/Header';
import Form from '../Shared/Form/Form';
import InputWithErrorMessage from '../Shared/InputWithErrorMessage/InputWithErrorMessage';

import './Profile.css';


const Profile = ({onEdit, isUpdating, onSignOut, serverErrorMessage, setServerErrorMessage}) => {
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
  
    setIsEditModeOn(false);
  };
  
  useEffect(() => {
    setServerErrorMessage(undefined);
  }, [inputValues]);
  
  return (
    <>
      <Header/>
      <main>
        <section className="profile">
          <p className="profile__greeting">{`Привет, ${currentUser?.name}!`}</p>
          {
            isEditModeOn
              ?
              <Form
                showDefaultSubmitButton={true}
                onSubmit={handleSubmit}
                isUpdating={isUpdating}
                serverErrorMessage={serverErrorMessage}
                name="sign-up"
                submitText="Сохранить"
              >
                <div>
                  <p className="profile__input-title">Имя</p>
                  <InputWithErrorMessage
                    defaultValue={currentUser.name}
                    onUpdate={handleValuesUpdate}
                    name="name"
                    type="text"
                    aria-label="Имя."
                    minLength="2"
                    maxLength="40"
                    required
                  />
                  <p className="register__input-title">E-mail</p>
                  <InputWithErrorMessage
                    defaultValue={currentUser.email}
                    onUpdate={handleValuesUpdate}
                    name="email"
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
                    <p className="profile__data-content">{currentUser?.name}</p>
                  </li>
                  <li className="profile__data-cell">
                    <p className="profile__data-title">E-mail</p>
                    <p className="profile__data-content">{currentUser?.email}</p>
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
                    className="profile__button profile__button_style_normal"
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
                <button
                  className="profile__button profile__button_style_bright"
                  onClick={onSignOut}
                >Выйти из аккаунта</button>
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};

Profile.propTypes = {
  onEdit: PropTypes.func,
  isUpdating: PropTypes.bool,
  onSignOut: PropTypes.func,
  serverErrorMessage: PropTypes.string,
  setServerErrorMessage: PropTypes.func
};

export default Profile;