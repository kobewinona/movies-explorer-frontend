import React from 'react';
import {useNavigate} from 'react-router-dom';

import './NotFound.css';


const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <main>
      <section className="not-found">
        <div className="not-found__message-container">
          <p className="not-found__status">404</p>
          <p className="not-found__description">Страница не найдена</p>
        </div>
        <button className="not-found__go-back-button" onClick={() => navigate(-1)}>Назад</button>
      </section>
    </main>
  );
};

export default NotFound;