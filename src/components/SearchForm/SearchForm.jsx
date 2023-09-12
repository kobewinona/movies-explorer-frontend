import React, {useState} from 'react';

import Form from '../Shared/Form/Form';
import Input from '../Shared/Input/Input';
import FilterCheckbox from '../Shared/FilterCheckbox/FilterCheckbox';

import './SearchForm.css';


const SearchForm = () => {
  const [inputValues, setInputValues] = useState({});
  
  const handleValuesUpdate = (name, value) => {
    setInputValues(prevValues => ({
      ...prevValues, [name]: value
    }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('inputValues', inputValues);
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
          <Input
            onUpdate={handleValuesUpdate}
            validate={true}
            name="searchQuery"
            type="text"
            aria-label="Запрос поиска."
            placeholder="Фильм"
            required
          />
          <div className="search-form__filter-container">
            <FilterCheckbox
              onUpdate={handleValuesUpdate}
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