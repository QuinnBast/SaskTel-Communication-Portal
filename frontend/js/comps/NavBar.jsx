
/**
 *  React Imports
 */
import React, { Component } from 'react'

/**
 *  Style Imports
 */
import {NavItem, NavLink } from 'reactstrap'

/**
 *  Component Imports
 */
import {LogButton} from "./LogButton"

export default class NavBar extends Component {
    render() {
        return (
            <NavItem attached inverted={true}>
                <p>TelPort</p>
                <LogButton/>
            </NavItem>
        )
    }
}