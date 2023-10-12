import {useEffect, useState} from 'react';

import {
  LARGE_DEVICE_WIDTH,
  MEDIUM_DEVICE_WIDTH,
  MOVIES_LARGE_DEVICE_WIDTH_COUNT_LIMIT,
  MOVIES_MEDIUM_DEVICE_WIDTH_COUNT_LIMIT,
  MOVIES_SMALL_DEVICE_WIDTH_COUNT_LIMIT,
  MOVIES_LARGE_DEVICE_WIDTH_COUNT_LIMIT_EXTENSION,
  MOVIES_MEDIUM_DEVICE_WIDTH_COUNT_LIMIT_EXTENSION
} from '../utils/constants';


export function useWidthPaginator(deviceWidth) {
  const [moviesCountLimit, setMoviesCountLimit] = useState(4);
  
  const extendMoviesCountLimit = () => {
    if (deviceWidth > LARGE_DEVICE_WIDTH) {
      setMoviesCountLimit(
        moviesCountLimit + MOVIES_LARGE_DEVICE_WIDTH_COUNT_LIMIT_EXTENSION
      );
    } else {
      setMoviesCountLimit(
        moviesCountLimit + MOVIES_MEDIUM_DEVICE_WIDTH_COUNT_LIMIT_EXTENSION
      );
    }
  };
  
  const handleItemsCountLimit = () => {
    if (deviceWidth >= LARGE_DEVICE_WIDTH) {
      setMoviesCountLimit(MOVIES_LARGE_DEVICE_WIDTH_COUNT_LIMIT);
    } else if (deviceWidth >= MEDIUM_DEVICE_WIDTH) {
      setMoviesCountLimit(MOVIES_MEDIUM_DEVICE_WIDTH_COUNT_LIMIT);
    } else {
      setMoviesCountLimit(MOVIES_SMALL_DEVICE_WIDTH_COUNT_LIMIT);
    }
  };
  
  useEffect(() => {
    handleItemsCountLimit();
  }, [deviceWidth]);
  
  return ({extendMoviesCountLimit, moviesCountLimit});
}