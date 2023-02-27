import React from 'react';
import { Navigate } from 'react-router-dom';

interface IPublicRoute {
  children: any;
  restricted: boolean;
  redirectTo: string;
  user: boolean;
}

const PublicRoute: React.FC<IPublicRoute> = ({
  children,
  restricted = false,
  redirectTo = '/',
  user,
}) => {
  const shouldRedirect = user && restricted;
  if (shouldRedirect) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default PublicRoute;
