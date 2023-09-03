import React from 'react';

import './Portfolio.css';


const Portfolio = () => {
  return (
    <>
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link" href="#">
            <p className="portfolio__item-name">Статичный сайт</p>
          </a>
          <p className="portfolio__item-arrow">&#8599;</p>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="#">
            <p className="portfolio__item-name">Адаптивный сайт</p>
          </a>
          <p className="portfolio__item-arrow">&#8599;</p>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="#">
            <p className="portfolio__item-name">Одностраничное приложение</p>
          </a>
          <p className="portfolio__item-arrow">&#8599;</p>
        </li>
      </ul>
    </>
  );
};

export default Portfolio;