import React from "react";
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import auth from "./auth";

export default class AuthButton extends React.Component{
    render() {
        if(auth.isAuthenticated())
            return (
                <Menu.Menu inverted position='right'>
                    <Menu.Item as={Link} to="/login" onClick={auth.logout}>Sign out</Menu.Item>
                </Menu.Menu>);
        else
            return ("");
    }
}