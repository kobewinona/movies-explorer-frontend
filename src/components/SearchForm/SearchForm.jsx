import React from 'react';

import './SearchForm.css';


const SearchForm = () => {
  return (
    <section className="search-form">
      <form>
        <div className="search-form__query-input-container">
          <input className="search-form__query-input" type="text" placeholder="Фильм" />
          <div className="search-form__filter-container">
            <input className="search-form__filter-input" type="checkbox" />
            <p className="search-form__filter-name">Короткометражки</p>
          </div>
          <button className="search-form__submit-button" type="submit">Поиск</button>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;