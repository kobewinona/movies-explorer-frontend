import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import {AuthContext} from '../../contexts/AuthContext';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

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
  
  const handleSignUp = () => {
    console.log('handled');
  };
  
  const handleSignIn = () => {
    console.log('handled');
  };
  
  const handleEditProfile = () => {
    console.log('handled');
  };
  
  useEffect(() => {
    setIsLoggedIn(true);
    setIsLoading(false);
  }, []);
  
  return (
    <AuthContext.Provider value={isLoggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/signup" element={<Register onSignUp={handleSignUp}/>}/>
          <Route path="/signin" element={<Login onSignIn={handleSignIn}/>}/>
          <Route path="/" element={<Main/>}/>
          <Route path="/movies" element={<Movies isLoading={isLoading}/>}/>
          <Route path="/saved-movies" element={<SavedMovies isLoading={isLoading}/>}/>
          <Route path="/profile" element={<Profile onEdit={handleEditProfile}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
