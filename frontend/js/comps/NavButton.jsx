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

export const NavButton =
    withRouter((props) => (Auth.isAuthenticated() ? (
        <NavLink onClick={props.onClick}> {props.icon} {props.text}  </NavLink>) : ("")));
