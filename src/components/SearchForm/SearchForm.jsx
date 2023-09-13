import React from 'react';

import useInput from '../../hooks/useInput';

import Form from '../Shared/Form/Form';
import FilterCheckbox from '../Shared/FilterCheckbox/FilterCheckbox';

import './SearchForm.css';


const SearchForm = () => {
  const {inputValue, handleInputChange} = useInput();
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  
  return (
    <section className="search-form">
      <div className="search-form__search-query-container">
        <Form
          validate={true}
          onSubmit={handleSubmit}
          name="sign-up"
          submitText="Зарегистрироваться"
          isUpdating={false}
          showDefaultSubmitButton={false}
        >
          <input
            className="search-form__search-query-input"
            onChange={handleInputChange}
            value={inputValue || ''}
            name="searchQuery"
            type="text"
            aria-label="Запрос поиска."
            placeholder="Фильм"
            required
          />
          <div className="search-form__filter-container">
            <FilterCheckbox
              name="shortfilms"
              type="checkbox"
              aria-label="Фильтр по короткометражным фильмам."
              required
            />
            <p className="search-form__filter-name">Короткометражки</p>
          </div>
          <button className="search-form__submit-button" name="submit" type="submit">Поиск</button>
        </Form>
      </div>
    </section>
  );
};

export default SearchForm;