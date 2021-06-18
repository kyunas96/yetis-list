import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';


const Auth = ({ component: Component, path, loggedIn, exact, currentUserId }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} /> //what do we want component to be
    ) : (
      <Redirect to={`/users/${currentUserId}`} /> //decide where you want logged in users to go
    )
  )} />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUserId: state.session.user
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));