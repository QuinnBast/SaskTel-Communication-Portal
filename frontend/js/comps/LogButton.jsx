/**
 *  React Imports
 */
import React from "react";
import {Link, withRouter} from "react-router-dom";


/**
 *  Style Imports
 */
import {NavLink, NavItem} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 *  Authentication Imports
 */
import Auth from "../router/Auth";

export const LogButton = withRouter(() => (
        Auth.isAuthenticated() ? (
                <NavLink href={"/login"} onClick={Auth.logout} id={"logout"}><FontAwesomeIcon icon={"sign-out-alt"}/> Sign out</NavLink>
        ) : (
            ""
        )
    ));
