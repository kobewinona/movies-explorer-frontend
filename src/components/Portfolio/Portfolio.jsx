import React from 'react';

import './Portfolio.css';


const Portfolio = () => {
  return (
    <div className="portfolio">
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
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/kobewinona/russian-travel"
            target="_blank"
            rel="noreferrer"
            aria-label="Адаптивный сайт."
          >Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/kobewinona/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer"
          >Одностраничное приложение
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Portfolio;