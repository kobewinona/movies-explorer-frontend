import React from 'react';

import './Portfolio.css';


const Portfolio = () => {
  return (
    <>
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/kobewinona/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >Статичный сайт
          </a>
          <div className="portfolio__item-arrow"></div>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/kobewinona/russian-travel"
            target="_blank"
            rel="noreferrer"
          >Адаптивный сайт
          </a>
          <div className="portfolio__item-arrow"></div>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/kobewinona/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer"
          >Одностраничное приложение
          </a>
          <div className="portfolio__item-arrow"></div>
        </li>
      </ul>
    </>
  );
};

export default Portfolio;