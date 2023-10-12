import PropTypes from 'prop-types';
import React from 'react';

import './EditProfileButton.css';


const EditProfileButton = ({onOpenEditForm, isEditProfileFormOpen, onCloseEditForm}) => {
  return (
    <>
      {
        isEditProfileFormOpen
          ?
            <button
              className="edit-profile-button"
              onClick={onCloseEditForm}
            >Отменить
            </button>
          :
            <button
              className="edit-profile-button"
              onClick={onOpenEditForm}
            >Редактировать
            </button>
      }
    </>
  );
};

EditProfileButton.propTypes = {
  onOpenEditForm: PropTypes.func,
  isEditProfileFormOpen: PropTypes.bool,
  onCloseEditForm: PropTypes.func,
}

export default EditProfileButton;