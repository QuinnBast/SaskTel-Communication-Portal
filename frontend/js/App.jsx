/**
 *  @file App.jsx
 *
 *  @fileOverview The view management file of the application,
 *  renders over the index page.
 *
 */

/**
 *  React Imports
 */
import React from "react";
import {render} from "react-dom";
import {Router, Redirect, Switch, Route} from "react-router-dom";

/**
 *  Style Imports
 */
import 'semantic-ui-css/semantic.min.css';
import "../css/main.css"; //Requires the CSS file

/**
 *  Router Imports
 */
import {ProtectedRoute} from "./router/ProtectedRoute";
import {UnprotectedRoute} from "./router/UnprotectedRoute";
import history from "./router/history";

/**
 *  Route Imports
 */
import Interface from "./routes/Interface";
import Login from "./routes/Login";

/**
 *  Component Imports
 */
import  NavBar from "./comps/NavBar";


// Globally include jQuery
window.$ = window.jQuery = require("jquery");

export default class App extends React.Component {
    render () {
        return (
            <Router history={history}>
                    <NavBar/>
                    <Switch>
                        /*render the interface page if the user is logged in*/
                        <ProtectedRoute exact path="/" component={Interface}/>
                        /*render the login page if the user isn't logged in*/
                        <UnprotectedRoute exact path="/login" component={Login}/>
                        /*Catch all, invalid address, redirect to interface page*/
                        <Route path="*" render={() => <Redirect to="/" />}/>
                    </Switch>
            </Router>
        );
    }
}


/*

 */
render((
    <Router history={history}>
        <App />
    </Router>
),document.getElementById('content'));

