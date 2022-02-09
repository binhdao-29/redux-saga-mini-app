import { LoginContants } from 'constants/login-contants';
import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem(LoginContants.ACCESS_TOKEN));

  console.log(isLoggedIn);

  if (!isLoggedIn) return <Redirect to="/login" />;

  return <Route {...props} />;
}
