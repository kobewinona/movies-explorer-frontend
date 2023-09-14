import React from 'react';

import studentPhoto from '../../images/student-photo.jpeg';
import * as content from '../../utils/studentInfo';
import Portfolio from '../Portfolio/Portfolio';
import Title from '../Shared/Title/Title';

import './AboutMe.css';


const AboutMe = () => {
  return (
    <article className="about-me">
      <Title text="Студент"/>
      <div className="about-me__container">
        <img className="about-me__photo" src={studentPhoto} alt="Фотография студента."/>
        <div className="about-me__bio">
          <div>
            <p className="about-me__bio-name">{content.name}</p>
            <p className="about-me__bio-details">{content.details}</p>
            <p className="about-me__bio-text">{content.aboutMe}</p>
          </div>
          <a
            className="about-me__bio-link"
            href="https://github.com/kobewinona"
            target="_blank"
            rel="noreferrer"
          >Github
          </a>
        </div>
      </div>
      <Portfolio/>
    </article>
  );
};

export default AboutMe;