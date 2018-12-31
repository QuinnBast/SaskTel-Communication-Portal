
/**
 *  React Imports
 */
import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 *  Authentication Imports
 */
import Auth from "./Auth";

export const UnprotectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!Auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};