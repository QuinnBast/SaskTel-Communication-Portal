/**
 *  React Imports
 */
import React from "react";
import {Link} from "react-router-dom";

/**
 *  Style Imports
 */
import {Menu} from "semantic-ui-react";

/**
 *  Authentication Imports
 */
import Auth from "../router/Auth";

export default class LogButton extends React.Component{
    render() {
        if(Auth.isAuthenticated())
            return (
                <Menu.Menu inverted position='right'>
                    <Menu.Item as={Link} to="/login" onClick={Auth.logout}>Sign out</Menu.Item>
                </Menu.Menu>);
        else
            return ("");
    }
}