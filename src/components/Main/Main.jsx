import PropTypes from 'prop-types';
import React from 'react';

import * as content from '../../utils/content';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Footer from '../Footer/Footer';

import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';


const Main = () => {
  console.log('content', content);
  return (
    <>
      <Header/>
      <main>
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
      </main>
      <Footer/>
    </>
  );
};

Main.propTypes = {
  isNavTabShown: PropTypes.bool
};

export default Main;