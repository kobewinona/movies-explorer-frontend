import {moviesApiConfig, setRequest, returnRes} from './props';


export const  getMovies = () => {
  return setRequest(`${moviesApiConfig['url']}`, {
    headers: moviesApiConfig['headers']
  }).then(res => returnRes(res));
};