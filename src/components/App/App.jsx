import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import {AuthContext} from '../../contexts/AuthContext';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {
  editProfileSuccessful,
  searchQueryEmptyQueryError,
  searchQueryNotFoundError,
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
  
  const [moviesList, setMoviesList] = useState([]);
  const [moviesSearchQuery, setMoviesSearchQuery] = useState({});
  
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [savedMoviesSearchQuery, setSavedMoviesSearchQuery] = useState({});
  
  const [searchQueryErrorMessage, setSearchQueryErrorMessage] = useState('');
  
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [isEditProfileFormOpen, setIsEditProfileFormOpen] = useState(false);
  
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState('');
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
        
        if (message) {
          setToolTipMessage(message);
        } else {
          setToolTipMessage(signInSuccessful);
        }
  
        setIsUpdateSuccessful(true);
        openInfoToolTip();
        
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
        
        loadUserSavedMovies();
      })
      .catch(err => {
        setIsLoggedIn(false);
  
        setServerErrorMessage(err);
        
        localStorage.clear();
        
        setMoviesSearchQuery({});
        setSavedMoviesSearchQuery({});
        
        setMoviesList([]);
        setSavedMoviesList([]);
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
  
  
  // edit profile handlers
  
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
  
  const searchMovies = (movies, query) => {
    if (movies) {
      return movies.filter(movie => {
        let isNameRuMatch;
        let isNameEuMatch;
        
        if (query) {
          isNameRuMatch = movie['nameRU'].toLowerCase().includes(query.toLowerCase());
          isNameEuMatch = movie['nameEN'].toLowerCase().includes(query.toLowerCase());
        }
        
        return isNameRuMatch || isNameEuMatch;
      });
    }
  };
  
  
  // -- moviesList
  
  const handleSearchMovies = ({movieName}) => {
    if (!movieName) {
      setIsUpdateSuccessful(false);
      setToolTipMessage(searchQueryEmptyQueryError);
      openInfoToolTip();
      return;
    }
    
    setMoviesSearchQuery(prevState => ({...prevState, movieName}));
    
    setIsLoading(true);
    
    moviesApi.getMovies()
      .then(movies => {
        const searchedMovies = searchMovies([...movies], movieName);
        
        if (searchedMovies?.length > 0) {
          setMoviesList(searchedMovies.reverse());
        } else {
          setMoviesList([]);
          setSearchQueryErrorMessage(searchQueryNotFoundError);
        }
      })
      .catch(() => {
        setMoviesList(null);
        setSearchQueryErrorMessage(searchQueryUnknownError);
      })
      .finally(() => setIsLoading(false));
  };
  
  useEffect(() => {
    if (Object.keys(moviesSearchQuery).length > 0) {
      localStorage.setItem('moviesSearchQuery', JSON.stringify(moviesSearchQuery));
    }
  }, [moviesSearchQuery]);
  
  useEffect(() => {
    if (moviesList.length > 0) {
      localStorage.setItem('moviesList', JSON.stringify(moviesList));
    }
  }, [moviesList]);
  
  
  // -- savedMoviesList
  
  const handleSearchSavedMovies = ({movieName}) => {
    if (!movieName) {
      setIsUpdateSuccessful(false);
      setToolTipMessage(searchQueryEmptyQueryError);
      openInfoToolTip();
      return;
    }
    
    setSavedMoviesSearchQuery(prevState => ({...prevState, movieName}));
    
    const newSearchedSavedMovies = searchMovies([...savedMoviesList], movieName);
    
    if (newSearchedSavedMovies.length > 0) {
      setSavedMoviesList(newSearchedSavedMovies.reverse());
    } else {
      setSearchQueryErrorMessage(searchQueryNotFoundError);
    }
  };
  
  useEffect(() => {
  }, [savedMoviesSearchQuery]);
  
  const loadUserSavedMovies = () => {
    const savedMoviesListFromStorage = localStorage.getItem('savedMoviesList');
    
    if (savedMoviesListFromStorage) {
      setSavedMoviesList(JSON.parse(savedMoviesListFromStorage));
    } else {
      // console.log('loading movies...');
      
      setIsLoading(true);
      
      mainApi.getMovies()
        .then(movies => setSavedMoviesList(movies.reverse()))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }
  };
  
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
  
  useEffect(() => {
    if (savedMoviesList.length > 0) {
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
    setSearchQueryErrorMessage(undefined);
    
    validateCredentials();
    
    const moviesSearchQueryFromStorage = JSON.parse(
      localStorage.getItem('moviesSearchQuery')
    );

    if (moviesSearchQueryFromStorage) {
      setMoviesSearchQuery(moviesSearchQueryFromStorage);
    }

    // const savedMoviesSearchQueryFromStorage = JSON.parse(
    //   localStorage.getItem('savedMoviesSearchQuery')
    // );
    //
    // if (savedMoviesSearchQueryFromStorage) {
    //   setSavedMoviesSearchQuery(savedMoviesSearchQueryFromStorage);
    // }

    const moviesListFromStorage = JSON.parse(
      localStorage.getItem('moviesList')
    );

    if (moviesListFromStorage) {
      setMoviesList(moviesListFromStorage);
    }
  
    const savedMoviesListFromStorage = JSON.parse(
      localStorage.getItem('savedMoviesList')
    );
  
    if (savedMoviesListFromStorage) {
      setSavedMoviesList(savedMoviesListFromStorage);
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
              moviesList={moviesList}
              searchQuery={moviesSearchQuery}
              setSearchQuery={setMoviesSearchQuery}
              onSearch={handleSearchMovies}
              searchQueryErrorMessage={searchQueryErrorMessage}
              onIsMovieSaved={handleIsMovieSaved}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
            />
          }/>
          <Route path="/saved-movies" element={
            <SavedMovies
              isLoading={isLoading}
              moviesList={savedMoviesList}
              setSearchQuery={setSavedMoviesSearchQuery}
              onSearch={handleSearchSavedMovies}
              searchQueryErrorMessage={searchQueryErrorMessage}
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
