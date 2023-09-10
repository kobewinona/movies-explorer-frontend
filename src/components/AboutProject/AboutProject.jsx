import React from 'react';

import './AboutProject.css';

import Title from '../Shared/Title/Title';


const AboutProject = () => {
  return (
    <section id="about-project" className="about-project">
      <Title text="О проекте" />
      <ul className="about-project__thesis-list">
        <li>
          <h3 className="about-project__thesis-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__thesis-text">Составление плана, работу над бэкендом,
            вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li>
          <h3 className="about-project__thesis-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__thesis-text">У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__stats">
        <li className="about-project__stats_type_cell-one">1 неделя</li>
        <li className="about-project__stats_type_cell-two">4 недели</li>
        <li className="about-project__stats_type_caption">Back-end</li>
        <li className="about-project__stats_type_caption">Front-end</li>
      </ul>
    </section>
  );
};

export default AboutProject;