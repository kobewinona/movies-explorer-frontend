import React from 'react';

import './Footer.css';
import PropTypes from 'prop-types';

const Footer = ({isHidden}) => {
  return (
    <footer className={`footer ${isHidden && 'footer_hidden'}`}>
      <div className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</div>
      <ul className="footer__link-list">
        <li className="footer__link-list-item">
          <a className="footer__link" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
        </li>
        <li className="footer__link-list-item">
          <a className="footer__link" href="https://github.com/kobewinona">Github</a>
        </li>
      </ul>
      <p className="footer__copyright">&copy;2020</p>
    </footer>
  );
};

Footer.propTypes = {
  isHidden: PropTypes.bool
}

export default Footer;