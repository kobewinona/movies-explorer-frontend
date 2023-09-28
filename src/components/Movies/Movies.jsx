import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import useDurationFilter from '../../hooks/useDurationFilter';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import SearchQueryErrorMessage from '../SearchQueryErrorMessage/SearchQueryErrorMessage';
import Preloader from '../Shared/Preloader/Preloader';

import './Movies.css';


const Movies = ({isLoading, moviesList, searchQuery, setSearchQuery, onSearch, searchQueryErrorMessage, ...props}) => {
  const {filteredMoviesList, filterInput, handleFilterUpdate} = useDurationFilter(moviesList);
  
  useEffect(() => {
    setSearchQuery(prevState => ({...prevState, ...filterInput}));
  }, [filterInput]);
  
  return (
    <>
      <Header/>
      <main className="movies">
        <SearchForm searchedQuery={searchQuery} onFilter={handleFilterUpdate} onSearch={onSearch}/>
        {
          isLoading
            ? <Preloader/>
            : searchQueryErrorMessage
              ? <SearchQueryErrorMessage searchQueryErrorMessage={searchQueryErrorMessage}/>
              : <MoviesCardList moviesList={filteredMoviesList} {...props}/>
        }
      </main>
      <Footer/>
    </>
  );
};

Movies.propTypes = {
  isLoading: PropTypes.bool,
  moviesList: PropTypes.array,
  searchQuery: PropTypes.object,
  setSearchQuery: PropTypes.func,
  onSearch: PropTypes.func,
  searchQueryErrorMessage: PropTypes.string,
  onIsMovieSaved: PropTypes.func,
  onSaveMovie: PropTypes.func,
  onDeleteMovie: PropTypes.func
};

export default Movies;