import {useState, useEffect} from 'react';


export function useWidthPaginator(deviceWidth) {
  const [moviesCountLimit, setMoviesCountLimit] = useState(4);
  
  const extendMoviesCountLimit = () => {
    let increment;
    let newMoviesCountLimit;
  
    if (deviceWidth > 1008) {
      increment = 3;
  
      newMoviesCountLimit = Math.ceil((moviesCountLimit + increment) / 3) * 3;
    } else {
      increment = 2;
  
      newMoviesCountLimit = Math.ceil((moviesCountLimit + increment) / 2) * 2;
    }
  
    setMoviesCountLimit(newMoviesCountLimit);
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