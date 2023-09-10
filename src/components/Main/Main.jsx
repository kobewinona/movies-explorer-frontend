import React from 'react';

import * as content from '../../utils/content';

import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import PropTypes from 'prop-types';


const Main = () => {
  console.log('content', content);
  return (
    <>
      <Header />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
};

Main.propTypes = {
  isNavTabShown: PropTypes.bool
}

export default Main;