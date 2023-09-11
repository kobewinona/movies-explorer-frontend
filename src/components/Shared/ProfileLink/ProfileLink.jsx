import React from 'react';
import {Link} from 'react-router-dom';

import './ProfileLink.css';


const ProfileLink = () => {
  return (
    <div className="profile-link">
      <Link className="profile-link__link" to="/profile">Аккаунт</Link>
      <div className="profile--link__icon"></div>
    </div>
  );
};

export default ProfileLink;