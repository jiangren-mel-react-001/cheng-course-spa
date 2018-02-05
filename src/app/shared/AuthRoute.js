import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({componentRender, token, ...rest }) => {
  const {component: Component, ...componentRest} = componentRender;
  return (
    <Route {...rest} render={props => <Component {...componentRest} {...props} token={token} />} />
  );
}

export const AuthRoute = ({componentRender, token, ...rest }) => {
  const {component: Component, ...componentRest} = componentRender;
  return (
    <Route {...rest} render={props => (
      token ? (
        <Component {...componentRest} {...props} token={token} />
      ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )
    )} />
  );
}
