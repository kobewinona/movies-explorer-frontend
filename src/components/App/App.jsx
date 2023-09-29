import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import {AuthContext} from '../../contexts/AuthContext';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  editProfileSuccessful,
  searchQueryUnknownError,
  signInSuccessful,
  signOutSuccessful,
  signUpSuccessful
} from '../../utils/constants';
import * as mainApi from '../../utils/mainApi';
import * as moviesApi from '../../utils/moviesApi';
import {moviesURL} from '../../utils/props';

import InfoTooltip from '../InfoTooltip/InfoTooltip';
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
  
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  // const [searchQueryErrorMessage, setSearchQueryErrorMessage] = useState('');
  
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [isEditProfileFormOpen, setIsEditProfileFormOpen] = useState(false);
  
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  
  const {
    storedValue: storedMoviesList,
    setStoredValue: setStoredMoviesList
  } = useLocalStorage('moviesList', null);
  const {
    storedValue: storedSavedMoviesList,
    setStoredValue: setStoredSavedMoviesList
  } = useLocalStorage('savedMoviesList', null);
  
  
  // auth handlers
  
  const handleSignUp = (userInfo) => {
    setIsUpdating(true);
    
    mainApi.signUp(userInfo)
      .then(() => {
        const {email, password} = userInfo;
        
        handleSignIn({email, password}, signUpSuccessful);
      })
      .catch(err => setServerErrorMessage(err))
      .finally(() => setIsUpdating(false));
  };
  
  const handleSignIn = (userInfo, message) => {
    setIsUpdating(true);
    
    mainApi.signIn(userInfo)
      .then(() => {
        validateCredentials();
  
        handleInfoToolTip(true, message ?? signInSuccessful);
        
        navigate('/movies', {replace: true});
      })
      .catch(err => setServerErrorMessage(err))
      .finally(() => setIsUpdating(false));
  };
  
  const validateCredentials = () => {
    mainApi.getCurrentUser()
      .then(userInfo => {
        setCurrentUserInfo(userInfo);
  
        setIsLoggedIn(true);
        
        getAllSavedMovies();
      })
      .catch(err => {
        setIsLoggedIn(false);
  
        setServerErrorMessage(err);
        
        localStorage.clear();
        
        setMoviesList([]);
        setSavedMoviesList([]);
      });
  };
  
  const signOut = () => {
    mainApi.signOut()
      .then(() => {
        validateCredentials();
        
        handleInfoToolTip(true, signOutSuccessful);
        
        navigate('/', {replace: true});
      })
      .catch(err => console.log(err));
  };
  
  
  // edit profile handlers
  
  const handleEditProfile = (userInfo) => {
    setIsUpdating(true);
    
    mainApi.updateCurrentUser(userInfo)
      .then(newUserInfo => {
        setCurrentUserInfo(newUserInfo);
        
        handleInfoToolTip(true, editProfileSuccessful);
        
        closeEditProfileForm();
      })
      .catch(err => setServerErrorMessage(err))
      .finally(() => setIsUpdating(false));
  };
  
  const openEditProfileForm = () => {
    setIsEditProfileFormOpen(true);
  };
  
  const closeEditProfileForm = () => {
    setIsEditProfileFormOpen(false);
  };
  
  
  // movies handlers
  
  const getAllMovies = () => {
    setIsLoading(true);
    setServerErrorMessage('');
    
    moviesApi.getMovies()
      .then(movies => {
        setStoredMoviesList(movies.reverse());
        setMoviesList(movies);
      })
      .catch(() => setServerErrorMessage(searchQueryUnknownError))
      .finally(() => setIsLoading(false));
  };
  
  const getAllSavedMovies = () => {
    setServerErrorMessage('');
    // const savedMoviesListFromStorage = localStorage.getItem('savedMoviesList');
    // console.log('storedSavedMoviesList', storedSavedMoviesList);
    // console.log('savedMoviesListFromStorage', savedMoviesListFromStorage);
    
    if (storedSavedMoviesList) {
      // console.log('go here?');
      setSavedMoviesList(storedSavedMoviesList.sort());
    } else {
      setIsLoading(true);
      
      console.log('loading saved movies...');
      
      mainApi.getMovies()
        .then(movies => {
          setSavedMoviesList(movies.reverse());
          setStoredSavedMoviesList(movies);
        })
        .catch(() => setServerErrorMessage(searchQueryUnknownError))
        .finally(() => setIsLoading(false));
    }
  };
  
  // useEffect(() => {
  //   if (savedMoviesList?.length > 0) {
  //     setStoredSavedMoviesList(savedMoviesList);
  //   }
  // }, [savedMoviesList]);
  
  const handleIsMovieSaved = movieId => {
    return (savedMoviesList.some(movie => movie.movieId === movieId));
  };
  
  const handleSaveMovie = movieInfo => {
    const {
      id, image,
      // eslint-disable-next-line no-unused-vars
      created_at, updated_at,
      ...movieToAdd
    } = movieInfo;
    
    const movieData = {
      movieId: id,
      image: `${moviesURL}${image.url}`,
      thumbnail: `${moviesURL}${image.formats.thumbnail['url']}`,
      ...movieToAdd
    };
    
    mainApi.saveMovie(movieData)
      .then(movie => setSavedMoviesList([...savedMoviesList, movie]))
      .catch(err => console.log(err));
  };
  
  const handleDeleteMovie = (movieId) => {
    const movieToDelete = savedMoviesList?.find(movie => {
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
  
  
  // tool-tip handlers
  
  const openInfoToolTip = () => {
    setIsInfoToolTipOpen(true);
  };
  
  const closeInfoToolTip = () => {
    setIsInfoToolTipOpen(false);
  };
  
  const handleInfoToolTip = (isSuccessful, toolTipMessage) => {
    setIsUpdateSuccessful(isSuccessful);
    setToolTipMessage(toolTipMessage);
    openInfoToolTip();
  };
  
  
  // initialization effects
  
  useEffect(() => {
    setServerErrorMessage(undefined);
    
    validateCredentials();
    
    if (storedMoviesList) {
      setMoviesList(storedMoviesList.sort());
    }
    
    if (storedSavedMoviesList) {
      setSavedMoviesList(storedSavedMoviesList.sort());
    }
  }, []);
  
  return (
    <AuthContext.Provider value={isLoggedIn}>
      <CurrentUserContext.Provider value={currentUserInfo}>
        <Routes>
          <Route path="/signup" element={
            <Register
              onSignUp={handleSignUp}
              isUpdating={isUpdating}
              serverErrorMessage={serverErrorMessage}
              setServerErrorMessage={setServerErrorMessage}
            />
          }/>
          <Route path="/signin" element={
            <Login
              onSignIn={handleSignIn}
              isUpdating={isUpdating}
              serverErrorMessage={serverErrorMessage}
              setServerErrorMessage={setServerErrorMessage}
            />
          }/>
          <Route path="/" element={<Main/>}/>
          <Route path="/movies" element={
            <Movies
              isLoading={isLoading}
              serverErrorMessage={serverErrorMessage}
              moviesList={moviesList}
              getAllMovies={getAllMovies}
              onUseToolTip={handleInfoToolTip}
              onIsMovieSaved={handleIsMovieSaved}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
            />
          }/>
          <Route path="/saved-movies" element={
            <SavedMovies
              isLoading={isLoading}
              serverErrorMessage={serverErrorMessage}
              moviesList={savedMoviesList}
              onUseToolTip={handleInfoToolTip}
              onDeleteMovie={handleDeleteMovie}
            />
          }/>
          <Route path="/profile" element={
            <Profile
              onOpenEditForm={openEditProfileForm}
              isEditProfileFormOpen={isEditProfileFormOpen}
              onEdit={handleEditProfile}
              onCloseEditForm={closeEditProfileForm}
              isLoading={isLoading}
              serverErrorMessage={serverErrorMessage}
              setServerErrorMessage={setServerErrorMessage}
              onSignOut={signOut}
            />
          }/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          isUpdateSuccessful={isUpdateSuccessful}
          toolTipMessage={toolTipMessage}
          onClose={closeInfoToolTip}
        />
      </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
