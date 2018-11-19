import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
    Switch,
  withRouter
} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav, Button,
  NavItem, NavLink,
 } from 'reactstrap';

import Interface from "./interface";

import Login from "./login";
export default class App extends React.Component {
    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
      render () {
      return (
          <Router>
              <div><Navbar color="dark" dark expand="md">
                  <NavbarBrand tag={Link} to="/">TelPort</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                          <NavItem>
                            <AuthButton/>
                          </NavItem>
                      </Nav>
                  </Collapse>
              </Navbar>
                  <Switch>
                      <PrivateRoute exact path="/" component={Interface}/>
                      <Route path="/login" component={LLogin}/>
                      <Route path="*" component={NoMatch}/>
                  </Switch>
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

class AuthButton extends React.Component{
 render() {
   return (
       fakeAuth.isAuthenticated
       ? (<NavLink tag={Link} to="/" onClick={() => {fakeAuth.signout();}}>Sign out</NavLink>)
       : ( <NavLink tag={Link} to="/login">Log in</NavLink>
    )
);
}
}

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
              pathname: "/login",
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

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

