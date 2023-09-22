import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import {AuthContext} from '../../contexts/AuthContext';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import * as moviesApi from '../../utils/moviesApi';
// import {mainApi} from '../../utils/MainApi';
import {unknownError, notFoundError} from '../../utils/searchQueryErrorMessages';

import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';

import './App.css';


function App() {
  const currentUser = {name: 'Виталий', email: 'oi@oi.ru'};
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [moviesList, setMoviesList] = useState(null);
  const [searchedQuery, setSearchedQuery] = useState(null);
  const [
    searchQueryErrorMessage,
    setSearchQueryErrorMessage
  ] = useState(undefined);
  
  const handleSignUp = () => {
    console.log('handled');
  };
  
  const handleSignIn = () => {
    console.log('handled');
  };
  
  const handleEditProfile = () => {
    console.log('handled');
  };
  
  const fetchMovies = (movieName) => {
    setIsLoading(true);
  
    moviesApi.getMovies()
      .then(movies => {
        const moviesList = movies.filter(movie => {
          return (movie.nameRU.toLowerCase().includes(movieName))
        });
        if (moviesList?.length > 0) {
          setMoviesList(moviesList.reverse());
          localStorage.setItem('searchedMoviesList', JSON.stringify(moviesList));
        } else {
          setMoviesList(null);
          setSearchQueryErrorMessage(notFoundError);
        }
      })
      .catch(() => {
        setMoviesList(null);
        setSearchQueryErrorMessage(unknownError);
      })
      .finally(() => setIsLoading(false));
  };
  
  const handleSearchQuery = query => {
    setSearchedQuery(prevState => ({
      ...prevState, ...query
    }));
    
    fetchMovies(query['movieName']);
  };
  
  useEffect(() => {
    if (searchedQuery) {
      localStorage.setItem('searchedQuery', JSON.stringify(searchedQuery));
    }
  }, [searchedQuery]);
  
  useEffect(() => {
    setIsLoggedIn(true);
    setSearchQueryErrorMessage(undefined);
    
    const queryFromStorage = localStorage.getItem('searchedQuery');
    const searchedMoviesList = localStorage.getItem('searchedMoviesList');
    
    if (queryFromStorage) {
      setSearchedQuery(JSON.parse(queryFromStorage));
    }
    
    if (searchedMoviesList) {
      setMoviesList(JSON.parse(searchedMoviesList));
    }
  }, []);
  
  return (
    <AuthContext.Provider value={isLoggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/signup" element={<Register onSignUp={handleSignUp}/>}/>
          <Route path="/signin" element={<Login onSignIn={handleSignIn}/>}/>
          <Route path="/" element={<Main/>}/>
          <Route path="/movies" element={
            <Movies
              isLoading={isLoading}
              moviesList={moviesList}
              searchedQuery={searchedQuery}
              onSearch={handleSearchQuery}
              searchQueryErrorMessage={searchQueryErrorMessage}
            />
          }/>
          <Route path="/saved-movies" element={<SavedMovies isLoading={isLoading}/>}/>
          <Route path="/profile" element={<Profile onEdit={handleEditProfile}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
