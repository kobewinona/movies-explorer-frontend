import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import {AuthContext} from '../../contexts/AuthContext';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import * as MoviesApi from '../../utils/MoviesApi';
// import {MainApi} from '../../utils/MainApi';
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
  const [searchQuery, setSearchQuery] = useState();
  const [searchQueryErrorMessage, setSearchQueryErrorMessage] = useState(undefined);
  
  const handleSignUp = () => {
    console.log('handled');
  };
  
  const handleSignIn = () => {
    console.log('handled');
  };
  
  const handleEditProfile = () => {
    console.log('handled');
  };
  
  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };
  
  useEffect(() => {
    setIsLoggedIn(true);
    setSearchQueryErrorMessage(undefined);
    
    if (searchQuery) {
      setIsLoading(true);
      
      localStorage.setItem('searchQuery', searchQuery);
      
      MoviesApi.getMovies()
        .then(movies => {
          const moviesList = movies.filter(movie => {
            return (movie.nameRU.toLowerCase().includes(searchQuery))
          });
          if (moviesList?.length > 0) {
            setMoviesList(moviesList.reverse());
          } else {
            setSearchQueryErrorMessage(notFoundError);
          }
        })
        .catch(() => {
          setMoviesList(null);
          setSearchQueryErrorMessage(unknownError);
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchQuery]);
  
  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
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
