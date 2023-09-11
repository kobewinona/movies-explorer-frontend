import React from 'react';

import Checkbox from '../Shared/Checkbox/Checkbox';

import './SearchForm.css';


const SearchForm = () => {
  return (
    <section className="search-form">
      <form>
        <div className="search-form__query-input-container">
          <input className="search-form__query-input" type="text" placeholder="Фильм"/>
          <button className="search-form__submit-button" type="submit">Поиск</button>
          <div className="search-form__filter-container">
            <Checkbox/>
            <p className="search-form__filter-name">Короткометражки</p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;