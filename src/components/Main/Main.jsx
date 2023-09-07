import React from 'react';

import * as content from '../../utils/content';

import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Header from '../Header/Header';
import WithSetRes from '../WithSetRes/WithSetRes';
import Footer from '../Footer/Footer';


const Main = () => {
  console.log('content', content);
  return (
    <>
      <WithSetRes element={Header} />
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

export default Main;