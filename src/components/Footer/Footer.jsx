import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</div>
      <ul className="footer__link-list">
        <li className="footer__link-list-item">
          <a className="footer__link" href="#">Яндекс.Практикум</a>
        </li>
        <li className="footer__link-list-item">
          <a className="footer__link" href="#">Github</a>
        </li>
      </ul>
      <p className="footer__copyright">&copy;2020</p>
    </footer>
  );
};

export default Footer;