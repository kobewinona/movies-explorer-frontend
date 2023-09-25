import PropTypes from 'prop-types';
import React from 'react';

import './SearchQueryErrorMessage.css';


const SearchQueryErrorMessage = ({searchQueryErrorMessage}) => {
  return (
    <section className="search-query-error-message">
      <p className="search-query-error-message__text">{searchQueryErrorMessage}</p>
    </section>
  );
};

SearchQueryErrorMessage.propTypes = {
  searchQueryErrorMessage: PropTypes.string
};

export default SearchQueryErrorMessage;