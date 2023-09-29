import PropTypes from 'prop-types';
import React, {useState} from 'react';


import FilterCheckbox from '../Shared/FilterCheckbox/FilterCheckbox';
import Form from '../Shared/Form/Form';
import Input from '../Shared/Input/Input';

import './SearchForm.css';


const SearchForm = ({searchedQuery, onFilter, onSearch}) => {
  const [queryName, setQueryName] = useState('');
  const [queryValue, setQueryValue] = useState('');
  
  const handleValuesUpdate = (inputName, inputValue) => {
    if (inputName && inputValue !== undefined) {
      setQueryName(inputName);
      setQueryValue(inputValue);
    }
  };
  
  const handleSubmit = () => {
    console.log('queryName', queryName);
    console.log('queryValue', queryValue);
    
    onSearch(queryName, queryValue);
  };
  
  // useEffect(() => {
  //   handleSubmit();
  // }, []);
  
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
          <Input
            defaultValue={searchedQuery?.['movieName']}
            onUpdate={handleValuesUpdate}
            name="movieName"
            type="text"
            aria-label="Запрос поиска."
            placeholder="Фильм"
            required
          />
          <div className="search-form__filter-container">
            <FilterCheckbox
              defaultValue={searchedQuery?.['showShortfilms']}
              onUpdate={onFilter}
              onSubmit={handleSubmit}
              name="showShortfilms"
              type="checkbox"
              aria-label="Фильтр по короткометражным фильмам."
              placeholder="Короткометражки"
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
  searchedQuery: PropTypes.object,
  onFilter: PropTypes.func,
  onSearch: PropTypes.func
}

export default SearchForm;