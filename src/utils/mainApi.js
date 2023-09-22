import {mainApiConfig, setRequest, returnRes} from './props';


export const  addMovie = (movieInfo) => {
  return setRequest(`${mainApiConfig['url']}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: mainApiConfig['headers'],
    body: JSON.stringify(movieInfo)
  }).then(res => returnRes(res));
};

export const  deleteMovie = (movieId) => {
  return setRequest(`${mainApiConfig['url']}/movies/${movieId}`, {
    credentials: 'include',
    headers: mainApiConfig['headers']
  }).then(res => returnRes(res));
};