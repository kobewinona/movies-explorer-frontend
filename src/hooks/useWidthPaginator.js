import {useState, useEffect} from 'react';


export function useWidthPaginator(deviceWidth) {
  const [moviesCountLimit, setMoviesCountLimit] = useState(4);
  
  const extendMoviesCountLimit = () => {
    if (deviceWidth >= 1280) {
      setMoviesCountLimit(moviesCountLimit + 3);
    } else {
      setMoviesCountLimit(moviesCountLimit + 2);
    }
  };
  
  const handleMoviesCountLimit = () => {
    if (deviceWidth >= 1280) {
      setMoviesCountLimit(12);
    } else if (deviceWidth >= 768) {
      setMoviesCountLimit(8);
    } else {
      setMoviesCountLimit(5);
    }
  };
  
  useEffect(() => {
    handleMoviesCountLimit();
  }, [deviceWidth]);
  
  return ({extendMoviesCountLimit, moviesCountLimit});
}