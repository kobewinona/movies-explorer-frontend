import {mainApiConfig, setRequest, returnRes} from './props';


export const signUp = (userInfo) => {
  return setRequest(`${mainApiConfig['url']}/signup`, {
    method: 'POST',
    headers: mainApiConfig['headers'],
    body: JSON.stringify(userInfo)
  }).then(res => returnRes(res));
};

export const signIn = (userInfo) => {
  return setRequest(`${mainApiConfig['url']}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: mainApiConfig['headers'],
    body: JSON.stringify(userInfo)
  }).then(res => returnRes(res));
};

export const getCurrentUser = () => {
  return setRequest(`${mainApiConfig['url']}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {...mainApiConfig['headers']}
  }).then(res => returnRes(res));
};

export const signOut = () => {
  return setRequest(`${mainApiConfig['url']}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: mainApiConfig['headers']
  }).then(res => returnRes(res));
};

export const saveMovie = (movieInfo) => {
  return setRequest(`${mainApiConfig['url']}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: mainApiConfig['headers'],
    body: JSON.stringify(movieInfo)
  }).then(res => returnRes(res));
};

export const getMovies = () => {
  return setRequest(`${mainApiConfig['url']}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers: mainApiConfig['headers'],
  }).then(res => returnRes(res));
}

export const  deleteMovie = (movieId) => {
  return setRequest(`${mainApiConfig['url']}/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: mainApiConfig['headers']
  }).then(res => returnRes(res));
};