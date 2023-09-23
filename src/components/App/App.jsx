import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import {AuthContext} from '../../contexts/AuthContext';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {searchQueryNotFoundError, searchQueryUnknownError} from '../../utils/constants';
import * as mainApi from '../../utils/mainApi';
import * as moviesApi from '../../utils/moviesApi';

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
  const [savedMoviesList, setSavedMoviesList] = useState(null);
  const [searchedQuery, setSearchedQuery] = useState(null);
  const [
    searchQueryErrorMessage,
    setSearchQueryErrorMessage
  ] = useState(undefined);
  
  
  // auth handlers
  
  const handleSignUp = (userInfo) => {
    setIsUpdating(true);
    
    mainApi.signUp(userInfo)
      .then(() => navigate('/movies', {replace: true}))
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
      .then(userInfo => {
        setIsLoggedIn(true);
        setCurrentUserInfo(userInfo);
  
        loadUserSavedMovies(userInfo['_id']);
      })
      .catch(err => {
        setIsLoggedIn(false);
      
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
        localStorage.clear();
        setSearchedQuery(null);
        setMoviesList(null);
        setSavedMoviesList(null);
        
        // validateCredentials();
        
        navigate('/', {replace: true});
      })
      .catch(err => console.log(err));
  };
  
  
  // edit profile handler
  
  const handleEditProfile = () => {
    console.log('handled');
  };
  
  
  // movies handlers
  
  const searchMovies = (searchQuery) => {
    setIsLoading(true);
    
    moviesApi.getMovies()
      .then(movies => {
        const moviesList = movies.filter(movie => {
          return (movie.nameRU.toLowerCase().includes(searchQuery));
        });
        if (moviesList?.length > 0) {
          setMoviesList(moviesList.reverse());
        } else {
          setMoviesList(null);
          setSearchQueryErrorMessage(searchQueryNotFoundError);
        }
      })
      .catch(() => {
        setMoviesList(null);
        setSearchQueryErrorMessage(searchQueryUnknownError);
      })
      .finally(() => setIsLoading(false));
  };
  
  const loadUserSavedMovies = (userId) => {
    setIsLoading(true);
  
    const savedMoviesListFromStorage = localStorage.getItem('savedMoviesList');
  
    if (savedMoviesListFromStorage) {
      setSavedMoviesList(JSON.parse(savedMoviesListFromStorage));
    } else {
      mainApi.getMovies()
        .then(movies => {
          const currentUserSavedMovies = movies.filter(movie => {
            return (movie['owner'] === userId)
          })
          setSavedMoviesList(currentUserSavedMovies.reverse());
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }
  };
  
  const handleSearchQuery = query => {
    setSearchedQuery(prevState => ({
      ...prevState, ...query
    }));
    
    searchMovies(query?.['movieName']);
  };
  
  const checkIsMovieSaved = (movieId) => {
    return (savedMoviesList?.some(movie => movie.movieId === movieId));
  };
  
  const handleSaveMovie = (movieInfo) => {
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
    const thumbnail = `https://api.nomoreparties.co${image.formats.thumbnail['url']}`;
    
    const movieData = {
      movieId: id,
      image: imageURL,
      thumbnail,
      ...movieToAdd
    };
    
    mainApi.saveMovie(movieData)
      .then(movie => {
        setSavedMoviesList([movie, ...savedMoviesList]);
      })
      .catch(err => console.log('err', err));
  };
  
  const handleDeleteMovie = (movieId) => {
    const movieToDelete = savedMoviesList?.find((movie) => {
      return movie.movieId === movieId && movie['_id'];
    });
    
    mainApi.deleteMovie(movieToDelete?.['_id'])
      .then(() => {
        setSavedMoviesList(savedMoviesList?.filter(movie => {
          return movie['_id'] !== movieToDelete['_id'];
        }));
      })
      .catch(err => console.log('err', err));
  };
  
  
  // effects
  
  useEffect(() => {
    if (moviesList) {
      localStorage.setItem('searchedMoviesList', JSON.stringify(moviesList));
    }
  }, [moviesList]);
  
  useEffect(() => {
    if (savedMoviesList?.length > 0) {
      localStorage.setItem('savedMoviesList', JSON.stringify(savedMoviesList));
    }
  }, [savedMoviesList]);
  
  useEffect(() => {
    if (searchedQuery) {
      localStorage.setItem('searchedQuery', JSON.stringify(searchedQuery));
    }
  }, [searchedQuery]);
  
  useEffect(() => {
    validateCredentials();
    setSearchQueryErrorMessage(undefined);
    
    const searchQueryFromStorage = localStorage.getItem('searchedQuery');
    const moviesListFromStorage = localStorage.getItem('searchedMoviesList');
    
    if (searchQueryFromStorage) {
      setSearchedQuery(JSON.parse(searchQueryFromStorage));
    }
    
    if (moviesListFromStorage) {
      setMoviesList(JSON.parse(moviesListFromStorage));
    }
  }, []);
  
  return (
    <AuthContext.Provider value={isLoggedIn}>
      <CurrentUserContext.Provider value={currentUserInfo}>
        <Routes>
          <Route path="/signup" element={<Register isUpdating={isUpdating} onSignUp={handleSignUp}/>}/>
          <Route path="/signin" element={<Login isUpdating={isUpdating} onSignIn={handleSignIn}/>}/>
          <Route path="/" element={<Main/>}/>
          <Route path="/movies" element={
            <Movies
              isLoading={isLoading}
              moviesList={moviesList}
              searchedQuery={searchedQuery}
              onSearch={handleSearchQuery}
              searchQueryErrorMessage={searchQueryErrorMessage}
              onIsMovieSaved={checkIsMovieSaved}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
            />
          }/>
          <Route path="/saved-movies" element={
            <SavedMovies
              isLoading={isLoading}
              moviesList={savedMoviesList}
              searchedQuery={searchedQuery}
              onSearch={handleSearchQuery}
              searchQueryErrorMessage={searchQueryErrorMessage}
              onDeleteMovie={handleDeleteMovie}
            />
          }/>
          <Route path="/profile" element={<Profile onEdit={handleEditProfile} onSignOut={signOut}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
