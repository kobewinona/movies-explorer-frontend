import PropTypes from 'prop-types';
import React from 'react';

import useInput from '../../hooks/useInput';

import FilterCheckbox from '../Shared/FilterCheckbox/FilterCheckbox';
import Form from '../Shared/Form/Form';

import './SearchForm.css';


const SearchForm = ({onSearch}) => {
  const {inputValue, handleInputChange} = useInput();
  
  const handleSubmit = () => {
    onSearch(inputValue.toLowerCase());
  };
  
  return (
    <section className="search-form">
      <div className="search-form__search-query-container">
        <Form
          validate={true}
          onSubmit={handleSubmit}
          name="searchQuery"
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
              placeholder="Фильтр по короткометражным фильмам"
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

SearchForm.propTypes = {
  onSearch: PropTypes.func
}

export default SearchForm;