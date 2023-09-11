import PropTypes from 'prop-types';
import React from 'react';

import './Footer.css';


const Footer = ({isHidden}) => {
  return (
    <footer className={`footer ${isHidden && 'footer_hidden'}`}>
      <div className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</div>
      <div className="footer__links-container">
        <ul className="footer__link-list">
          <li className="footer__link-list-item">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru"
              target="_blank" rel="noreferrer"
            >Яндекс.Практикум
            </a>
          </li>
          <li className="footer__link-list-item">
            <a
              className="footer__link"
              href="https://github.com/kobewinona"
              target="_blank"
              rel="noreferrer"
            >Github
            </a>
          </li>
        </ul>
        <p className="footer__copyright">&copy;2020</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  isHidden: PropTypes.bool
};

export default Footer;