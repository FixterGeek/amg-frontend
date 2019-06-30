import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        props => (localStorage.getItem('authToken') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              // eslint-disable-next-line react/prop-types
              state: { from: props.location },
            }}
          />
        ))
      }
    />
  );
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
