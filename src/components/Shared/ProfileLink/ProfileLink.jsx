import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

import './ProfileLink.css';


const ProfileLink = ({onClose}) => {
  return (
    <div className="profile-link">
      <Link
        className="profile-link__link"
        to="/profile"
        onClick={onClose}
      >Аккаунт
      </Link>
      <div className="profile-link__icon"></div>
    </div>
  );
};

ProfileLink.propTypes = {
  onClose: PropTypes.func
};

export default ProfileLink;