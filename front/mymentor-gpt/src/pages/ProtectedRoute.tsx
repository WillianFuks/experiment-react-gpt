import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const cookieName1 = 'username';
  const cookieName2 = 'password';

  const expectedUsername = import.meta.env.VITE_API_USERNAME;
  const expectedPassword = import.meta.env.VITE_API_PASSWORD;

  const cookie1 = Cookies.get(cookieName1);
  const cookie2 = Cookies.get(cookieName2);

  const isAuthenticated = (cookie1 === expectedUsername && cookie2 === expectedPassword);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: '/protected' }} />;
  }
  return <Component />;
};

export default ProtectedRoute;
