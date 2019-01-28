/**
 *  React Imports
 */
import React from "react";
import {Link, withRouter} from "react-router-dom";


/**
 *  Style Imports
 */
import {NavLink, NavItem} from 'reactstrap';

/**
 *  Authentication Imports
 */
import Auth from "../router/Auth";

export const LogButton = withRouter(() => (
        Auth.isAuthenticated() ? (
            <NavItem>
                <NavLink href={"/login"} onClick={Auth.logout}>Sign out</NavLink>
            </NavItem>
        ) : (
            ""
        )
    ));
