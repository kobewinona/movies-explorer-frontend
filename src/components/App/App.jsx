import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import {AuthContext} from '../../contexts/AuthContext';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import * as moviesApi from '../../utils/moviesApi';
import * as mainApi from '../../utils/mainApi';
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
  const navigate = useNavigate();
  
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [moviesList, setMoviesList] = useState(null);
  const [searchedQuery, setSearchedQuery] = useState(null);
  const [
    searchQueryErrorMessage,
    setSearchQueryErrorMessage
  ] = useState(undefined);
  
  // auth handlers
  
  const handleSignUp = (userInfo) => {
    setIsUpdating(true);
    
    mainApi.signUp(userInfo)
      .then(() => navigate('/signin', {replace: true}))
      .catch(err => console.log(err))
      .finally(() => setIsUpdating(false));
  };
  
  const handleSignIn = (userInfo) => {
    setIsUpdating(true);
    
    mainApi.signIn(userInfo)
      .then(() => {
        validateCredentials();
        
        navigate('/', {replace: true});
      })
      .catch(err => console.log(err))
      .finally(() => setIsUpdating(false));
  };
  
  const validateCredentials = () => {
    mainApi.getCurrentUser()
      .then(({name, email}) => {
        setCurrentUserInfo({name, email});
        setIsLoggedIn(true);
      })
      .catch(err => {
        setIsLoggedIn(false);
        
        navigate('/signin', {replace: true});
        
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsUpdating(false);
      });
  };
  
  const signOut = () => {
    mainApi.signOut()
      .then(() => {
        setIsLoggedIn(false);
        
        validateCredentials();
  
        navigate('/signin', {replace: true});
      })
      .catch(err => console.log(err));
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
  
  const handleAddMovie = (movieInfo) => {
    const {
      id,
      image,
      // eslint-disable-next-line no-unused-vars
      created_at,
      // eslint-disable-next-line no-unused-vars
      updated_at,
      ...movieToAdd
    } = movieInfo;

    const imageURL = `https://api.nomoreparties.co${image.url}`;
    const thumbnail = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;
  
    const movieData = {
      movieId: id,
      image: imageURL,
      thumbnail,
      ...movieToAdd,
    };
    
    mainApi.addMovie(movieData)
      .then(data => {
        console.log('movie', data);
      })
      .catch(err => console.log('err', err));
  };
  
  const handleDeleteMovie = (movieId) => {
    console.log('movieId', movieId);
    mainApi.deleteMovie(movieId)
      .then(data => {
        console.log('movie', data);
      })
      .catch(err => console.log('err', err));
  };
  
  useEffect(() => {
    if (searchedQuery) {
      localStorage.setItem('searchedQuery', JSON.stringify(searchedQuery));
    }
  }, [searchedQuery]);
  
  useEffect(() => {
    validateCredentials();
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
      <CurrentUserContext.Provider value={currentUserInfo}>
        <Routes>
          <Route path="/signup" element={<Register isUpdating={isUpdating} onSignUp={handleSignUp}/>}/>
          <Route path="/signin" element={<Login onSignIn={handleSignIn}/>}/>
          <Route path="/" element={<Main/>}/>
          <Route path="/movies" element={
            <Movies
              isLoading={isLoading}
              moviesList={moviesList}
              searchedQuery={searchedQuery}
              onSearch={handleSearchQuery}
              searchQueryErrorMessage={searchQueryErrorMessage}
              onAddMovie={handleAddMovie}
              onDelete={handleDeleteMovie}
            />
          }/>
          <Route path="/saved-movies" element={<SavedMovies isLoading={isLoading}/>}/>
          <Route path="/profile" element={<Profile onEdit={handleEditProfile} onSignOut={signOut}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
