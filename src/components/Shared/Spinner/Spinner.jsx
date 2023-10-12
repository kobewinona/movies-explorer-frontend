import React from 'react';

import './Spinner.css';


const Spinner = () => {
  return (
    <div className="spinner">
      <div className="spinner__container">
        <div className="spinner__wheel"></div>
      </div>
      <p className="spinner__message">Загрузка</p>
    </div>
  );
};

export default Spinner;