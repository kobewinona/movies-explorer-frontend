import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import './NavTab.css';
import NavMenu from '../NavMenu/NavMenu';

const NavTab = ({ isNavTabShown }) => {
  useEffect(() => {
    if (isNavTabShown) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isNavTabShown]);

  return (
    <>
      <div className={`nav-tab ${isNavTabShown && 'nav-tab__visible'}`}></div>
      <div className={`nav-tab__container ${isNavTabShown ? 'appear' : 'disappear'}`}>
        <NavMenu />
      </div>
    </>
  );
};

NavTab.propTypes = {
  isNavTabShown: PropTypes.bool
}

export default NavTab;