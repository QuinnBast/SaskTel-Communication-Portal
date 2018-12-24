/**
 *  React Imports
 */
import React from "react";
import {Link, withRouter} from "react-router-dom";


/**
 *  Style Imports
 */
import {Menu} from "semantic-ui-react";

/**
 *  Authentication Imports
 */
import Auth from "../router/Auth";

export const LogButton = withRouter(() => (
        Auth.isAuthenticated() ? (
            <Menu.Menu position='right'>
                <Menu.Item as={Link} to="/login" onClick={Auth.logout}>Sign out</Menu.Item>
            </Menu.Menu>
        ) : (
            ""
        )
    ));
