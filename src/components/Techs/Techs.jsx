import React from 'react';

import Title from '../Shared/Title/Title';

import './Techs.css';

const Techs = () => {
  return (
    <section className="techs">
      <Title text="Технологии" />
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки
        мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className="techs__tech-list">
        <li className="techs__tech-item">HTML</li>
        <li className="techs__tech-item">CSS</li>
        <li className="techs__tech-item">JS</li>
        <li className="techs__tech-item">React</li>
        <li className="techs__tech-item">Git</li>
        <li className="techs__tech-item">Express.js</li>
        <li className="techs__tech-item">mongoDB</li>
      </ul>
    </section>
  );
};

export default Techs;