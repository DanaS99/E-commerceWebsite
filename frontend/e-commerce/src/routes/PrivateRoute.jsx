import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  if (!user) {
    alert('You must be logged in');
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  if (role && user.role !== role) {
    alert('Only admins are authorized to access this page');
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return children;

  return <div>PrivateRoute</div>;
};

export default PrivateRoute;
