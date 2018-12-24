
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

export default class Navbar extends Component {
    state = { activeItem: 'TelPort' };

    render() {
        const { activeItem } = this.state;

        return (
            <Menu attached inverted={true}>
                <Menu.Item name='telPort' active={activeItem === 'TelPort'} />
                <LogButton/>
            </Menu>
        )
    }
}