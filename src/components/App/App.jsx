import React from 'react';
import {Routes, Route} from 'react-router-dom';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Auth from  '../Auth/Auth';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

import './App.css';


function App() {
  const currentUser = {name: "Дима", email: "oi@oi.ru"};

  const handleSignUp = () => {
    console.log('handled');
  };

  const handleSignIn = () => {
    console.log('handled');
  };

  const handleEditProfile = () => {
    console.log('handled');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/signup" element={
          <Auth message="Добро пожаловать!">
            <Register onSignUp={handleSignUp} />
          </Auth>
        } />
        <Route path="/signin" element={
          <Auth message="Рады видеть!">
            <Login onSignIn={handleSignIn}/>
          </Auth>
        } />
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile onEdit={handleEditProfile}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
