import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

import {AuthContext} from '../../contexts/AuthContext';
import {authRequiredRoutes} from '../../utils/props';

import Preloader from '../Shared/Preloader/Preloader';


const ProtectedRoute = ({isLoading, element: Component, ...props}) => {
  const {pathname} = useLocation();
  const isLoggedIn = useContext(AuthContext);
  
  if (isLoading) {
    return (
      <Preloader size="all-screen" color="bright"/>
    )
  }

  return (
    authRequiredRoutes.includes(pathname)
    ? isLoggedIn ? <Component {...props}/> : <Navigate to="/" replace={true}/>
    : !isLoggedIn ? <Component {...props}/> : <Navigate to="/" replace={true}/>
  );
};

ProtectedRoute.propTypes = {
  isLoading: PropTypes.bool,
  element: PropTypes.elementType,
  children: PropTypes.object
}

export default ProtectedRoute;