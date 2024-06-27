import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component  }) => {

  const expectedUsername = import.meta.env.VITE_API_USERNAME;

  const expectedPassword = import.meta.env.VITE_API_PASSWORD;

  const name = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  const isAuthenticated = (name === expectedUsername && password === expectedPassword);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: '/protected' }} />;
  }
  return <Component />;
};

export default ProtectedRoute;
