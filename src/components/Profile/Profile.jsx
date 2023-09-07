import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import WithSetRes from '../WithSetRes/WithSetRes';
import Form from '../Shared/Form/Form';
import Input from '../Shared/Input/Input';

import './Profile.css';


const Profile = ({onEdit}) => {
  const currentUser = useContext(CurrentUserContext);

  const [isEditModeOn, setIsEditModeOn] = useState(false);

  const [inputValues, setInputValues] = useState({});

  const handleModeSwitch = () => {
    setIsEditModeOn(true);
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
      <WithSetRes element={Header} />
      <main>
        <section className="profile">
          <p className="profile__greeting">{`Привет, ${currentUser.name}!`}</p>
          {
            isEditModeOn
              ? <Form
                validate={true}
                onSubmit={handleSubmit}
                name="sign-up"
                submitText="Сохранить"
                isUpdating={false}
              >
                <div>
                  <p className="profile__input-title">Имя</p>
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
                </div>
              </Form>
              : <>
                <ul className="profile__data-container">
                  <li className="profile__data-cell">
                    <p className="profile__data-title">Имя</p>
                    <p>{currentUser.name}</p>
                  </li>
                  <li className="profile__data-cell">
                    <p className="profile__data-title">E-mail</p>
                    <p>{currentUser.email}</p>
                  </li>
                </ul>
              </>
          }
          <ul className="profile__control">
          {
            isEditModeOn
            ? null
            : <li><button className="profile__button" onClick={handleModeSwitch}>Редактировать</button></li>
          }
            <li><Link className="profile__link" to="/signin">Выйти из аккаунта</Link></li>
            </ul>
        </section>
      </main>
    </>
  );
};

Profile.propTypes = {
  onEdit: PropTypes.func
}

export default Profile;