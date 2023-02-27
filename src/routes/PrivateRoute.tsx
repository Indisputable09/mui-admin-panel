import React from 'react';
import { Navigate } from 'react-router-dom';

interface IPrivateRoute {
  children: any;
  redirectTo: string;
  user: boolean;
}

// const PrivateRoute: React.FC<IPrivateRoute> = ({
//   children,
//   redirectTo = '/',
//   user,
// }) => {
//   if (!user) {
//     return <Navigate to={redirectTo} />;
//   }

//   return children;
// };

// export default PrivateRoute;

const PrivateRoute: React.FC<IPrivateRoute> = ({
  user,
  redirectTo,
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PrivateRoute;
