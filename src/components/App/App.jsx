import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import {AuthContext} from '../../contexts/AuthContext';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {SearchQueryContext} from '../../contexts/SearchQueryContext';
import {
  editProfileSuccessful,
  searchQueryNotFoundError,
  searchQueryUnknownError,
  searchQueryEmptyQueryError,
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
  
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [moviesList, setMoviesList] = useState(null);
  const [savedMoviesList, setSavedMoviesList] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [serverErrorMessage, setServerErrorMessage] = useState(undefined);
  const [isEditProfileFormOpen, setIsEditProfileFormOpen] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState(undefined);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  
  
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
        
        setIsUpdateSuccessful(true);
        
        if (message) {
          setToolTipMessage(message);
        } else {
          setToolTipMessage(signInSuccessful);
        }
        
        openInfoToolTip();
        
        navigate('/movies', {replace: true});
      })
      .catch(err => setServerErrorMessage(err))
      .finally(() => setIsUpdating(false));
  };
  
  const validateCredentials = () => {
    mainApi.getCurrentUser()
      .then(userInfo => {
        setIsLoggedIn(true);
        setCurrentUserInfo(userInfo);
        
        loadUserSavedMovies();
      })
      .catch(err => {
        setServerErrorMessage(err);
        
        setIsLoggedIn(false);
        localStorage.clear();
        setSearchQuery(null);
        setMoviesList(null);
        setSavedMoviesList(null);
      })
      .finally(() => {
        setIsLoading(false);
        setIsUpdating(false);
      });
  };
  
  const signOut = () => {
    mainApi.signOut()
      .then(() => {
        validateCredentials();
        
        setIsUpdateSuccessful(true);
        setToolTipMessage(signOutSuccessful);
        openInfoToolTip();
        
        navigate('/', {replace: true});
      })
      .catch(err => console.log(err));
  };
  
  
  // edit profile handler
  
  const handleEditProfile = (userInfo) => {
    setIsUpdating(true);
    
    mainApi.updateCurrentUser(userInfo)
      .then(newUserInfo => {
        setCurrentUserInfo(newUserInfo);
        
        setIsUpdateSuccessful(true);
        setToolTipMessage(editProfileSuccessful);
        closeEditProfileForm();
        openInfoToolTip();
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
  // -- moviesList
  
  const searchMovies = ({movieName = '', showShortfilms = false}) => {
    if (!movieName) {
      setIsUpdateSuccessful(false);
      setToolTipMessage(searchQueryEmptyQueryError);
      openInfoToolTip();
      return;
    }
  
    setIsLoading(true);
    
    setSearchQuery(prevState => ({
      ...prevState, errorMessage: undefined, moviesList: {movieName, showShortfilms}
    }));
    
    moviesApi.getMovies()
      .then(movies => {
        const moviesList = movies.filter(movie => {
          return (movie.nameRU.toLowerCase().includes(movieName));
        });
        if (moviesList?.length > 0) {
          setMoviesList(moviesList.reverse());
        } else {
          setMoviesList(null);
          setSearchQuery(prevState => ({
            ...prevState, errorMessage: searchQueryNotFoundError
          }));
        }
      })
      .catch(() => {
        setMoviesList(null);
        setSearchQuery(prevState => ({
          ...prevState, errorMessage: searchQueryUnknownError
        }));
      })
      .finally(() => setIsLoading(false));
  };
  
  useEffect(() => {
    if (searchQuery?.moviesList) {
      localStorage.setItem('moviesSearchQuery', JSON.stringify(searchQuery.moviesList));
    }
  }, [searchQuery?.moviesList]);
  
  useEffect(() => {
    if (moviesList?.length > 0) {
      localStorage.setItem('moviesList', JSON.stringify(moviesList));
    }
  }, [moviesList]);
  
  
  // -- savedMoviesList
  
  const searchSavedMovies = (query) => {
    setIsLoading(true);
    
    setSearchQuery(prevState => ({
      ...prevState, errorMessage: undefined, savedMoviesList: query
    }));
    
    // TODO search should be in movies from local storage
    
    mainApi.getMovies()
      .then(movies => {
        const savedMoviesList = movies.filter(movie => {
          return (movie.nameRU.toLowerCase().includes(query['movieName']));
        });
        if (savedMoviesList?.length > 0) {
          setSavedMoviesList(savedMoviesList.reverse());
        } else {
          setMoviesList(null);
          setSearchQuery(prevState => ({
            ...prevState, errorMessage: searchQueryNotFoundError
          }));
        }
      })
      .catch(() => {
        setMoviesList(null);
        setSearchQuery(prevState => ({
          ...prevState, errorMessage: searchQueryUnknownError
        }));
      })
      .finally(() => setIsLoading(false));
  };
  
  useEffect(() => {
    if (searchQuery?.savedMoviesList) {
      localStorage.setItem('savedMoviesSearchQuery', JSON.stringify(searchQuery.savedMoviesList));
    }
  }, [searchQuery?.savedMoviesList]);
  
  // TODO change logic - saved movies should be loaded once the user is signed in
  
  const loadUserSavedMovies = () => {
    setIsLoading(true);
    
    const savedMoviesListFromStorage = localStorage.getItem('savedMoviesList');
    
    if (savedMoviesListFromStorage) {
      setSavedMoviesList(JSON.parse(savedMoviesListFromStorage));
    } else {
      mainApi.getMovies()
        .then(movies => setSavedMoviesList(movies.reverse()))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }
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
    
    const imageURL = `${moviesURL}${image.url}`;
    const thumbnail = `${moviesURL}${image.formats.thumbnail['url']}`;
    
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
  
  useEffect(() => {
    if (savedMoviesList?.length > 0) {
      localStorage.setItem('savedMoviesList', JSON.stringify(savedMoviesList));
    }
  }, [savedMoviesList]);
  
  
  // tool-tip handlers
  
  const openInfoToolTip = () => {
    setIsInfoToolTipOpen(true);
  };
  
  const closeInfoToolTip = () => {
    setIsInfoToolTipOpen(false);
  };
  
  // initialization effects
  
  useEffect(() => {
    setServerErrorMessage(undefined);
    setSearchQuery(prevState => ({
      ...prevState, errorMessage: undefined
    }));
    
    validateCredentials();
    
    const moviesSearchQueryFromStorage = JSON.parse(
      localStorage.getItem('moviesSearchQuery')
    );
    
    if (moviesSearchQueryFromStorage) {
      setSearchQuery(prevState => ({
        ...prevState, moviesList: moviesSearchQueryFromStorage
      }));
    }
    
    const savedMoviesSearchQueryFromStorage = JSON.parse(
      localStorage.getItem('savedMoviesSearchQuery')
    );
    
    if (savedMoviesSearchQueryFromStorage) {
      setSearchQuery(prevState => ({
        ...prevState, savedMoviesList: savedMoviesSearchQueryFromStorage
      }));
    }
    
    const moviesListFromStorage = JSON.parse(
      localStorage.getItem('moviesList')
    );
    
    if (moviesListFromStorage) {
      setMoviesList(moviesListFromStorage);
    }
  }, []);
  
  return (
    <AuthContext.Provider value={isLoggedIn}>
      <CurrentUserContext.Provider value={currentUserInfo}>
        <SearchQueryContext.Provider value={searchQuery}>
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
                moviesList={moviesList}
                onSearch={searchMovies}
                onIsMovieSaved={checkIsMovieSaved}
                onSaveMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
              />
            }/>
            <Route path="/saved-movies" element={
              <SavedMovies
                isLoading={isLoading}
                moviesList={savedMoviesList}
                onSearch={searchSavedMovies}
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
        </SearchQueryContext.Provider>
      </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
