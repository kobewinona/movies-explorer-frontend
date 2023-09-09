import React from 'react';

import './Portfolio.css';


const Portfolio = () => {
  return (
    <>
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link" href="#">Статичный сайт</a>
          <div className="portfolio__item-arrow"></div>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="#">
            <p className="portfolio__item-name">Адаптивный сайт</p>
          </a>
          <div className="portfolio__item-arrow"></div>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="#">
            <p className="portfolio__item-name">Одностраничное приложение</p>
          </a>
          <div className="portfolio__item-arrow"></div>
        </li>
      </ul>
    </>
  );
};

export default Portfolio;