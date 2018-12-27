
/**
 *  React Imports
 */
import React, { Component } from 'react'

/**
 *  Style Imports
 */
import { Menu } from 'semantic-ui-react'

/**
 *  Component Imports
 */
import {LogButton} from "./LogButton"

export default class NavBar extends Component {
    render() {
        return (
            <Menu attached inverted={true}>
                <Menu.Item header name='Tel Port'/>
                <LogButton/>
            </Menu>
        )
    }
}