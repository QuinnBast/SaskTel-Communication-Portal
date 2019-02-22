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
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';

//import "../dist/main.css"; //Requires the CSS file

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

/**
 * Font Awesome Icon imports
 */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faQuestionCircle, faSignOutAlt, faListUl, faCaretUp, faCaretDown, faBook, faTimes } from '@fortawesome/free-solid-svg-icons'
import css from 'style-loader!css-loader!../css/main.css';

library.add(faEdit, faQuestionCircle, faSignOutAlt, faListUl, faCaretUp, faCaretDown, faBook, faTimes);

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
                        <Route path="*" render={() => <Redirect to="/login" />}/>
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

