import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loggedIn } from '../../libs/auth';

const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRouter;
