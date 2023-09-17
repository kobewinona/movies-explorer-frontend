import React from 'react';
import {Link} from 'react-router-dom';

import './NotFound.css';


const NotFound = () => {
  return (
    <main>
      <section className="not-found">
        <div className="not-found__message-container">
          <p className="not-found__status">404</p>
          <p className="not-found__description">Страница не найдена</p>
        </div>
        <Link className="not-found__link" to="/">Назад</Link>
      </section>
    </main>
  );
};

export default NotFound;