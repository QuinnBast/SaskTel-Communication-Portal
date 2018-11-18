import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import {Button} from "reactstrap";

import Interface from "./interface";

import Login from "./login";

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

export default class App extends React.Component {
      render () {
      return (
          <Router>
              <div>
                  <AuthButton/>
                  <ul>
                      <li>
                          <Button color="primary" tag={Link} to="/app/public">Public Page</Button>
                      </li>
                      <li>
                          <Button color="success" tag={Link} to="/app/protected">Protected Page</Button>
                      </li>
                  </ul>
                  <Route path="/app/public" component={Public}/>
                  <Route path="/app/login" component={LLogin}/>
                   <Route path="/app/login" component={Interface}/>
                  <PrivateRoute path="/app/protected" component={Protected}/>
              </div>
          </Router>
      );
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/app/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function Public() {
  return <h3>Public</h3>;
}

function Protected() {
  return <h3>Protected</h3>;
}

class LLogin extends React.Component {
  state = { redirectToReferrer: false };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}
