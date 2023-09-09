import React from 'react';

import * as content from '../../utils/content';
import studentPhoto from '../../images/student-photo.jpeg';

import Title from '../Shared/Title/Title';
import Portfolio from '../Portfolio/Portfolio';

import './AboutMe.css';


const AboutMe = () => {
  return (
    <section className="about-me">
      <Title text="Студент"/>
      <img className="about-me__photo" src={studentPhoto} alt="Моя фотография."/>
      <p className="about-me__subtitle">{content.name}</p>
      <p className="about-me__details">{content.details}</p>
      <p className="about-me__text">{content.aboutMe}</p>
      <a className="about-me__link" href="https://github.com/kobewinona">GitHub</a>
      <Portfolio />
    </section>
  );
};

export default AboutMe;