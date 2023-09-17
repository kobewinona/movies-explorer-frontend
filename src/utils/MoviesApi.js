import {moviesApiConfig} from './props';

const setRequest = (url, config) => {
  return fetch(url, config);
}

const returnRes = res => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
};

export const  getMovies = () => {
  return setRequest(`${moviesApiConfig['url']}`, {
    headers: moviesApiConfig['headers']
  }).then(res => returnRes(res));
};