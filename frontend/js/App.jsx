import React from "react";
import {
    Router,
    Route,
    Link,
    Switch,
} from "react-router-dom";

// Globally include jQuery
window.$ = window.jQuery = require("jquery");

import Interface from "./routes/interface";
import Login from "./routes/login";
import {ProtectedRoute} from "./auth/protectedroute";
import  NavBar from "./components/navbar";
import history from "./router/history";

const UpperMargin = {
    marginTop: '5em',
};

export default class App extends React.Component {
    render () {
        return (
            <Router history={history}>
                <div>
                       <NavBar/>
                                <Switch>
                                    <ProtectedRoute exact path="/" component={Interface}/>
                                    <Route path="/login" component={Login}/>
                                    <Route path="*" component={NoMatch}/>
                                </Switch>
                </div>
            </Router>
        );
    }
}

const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
);

