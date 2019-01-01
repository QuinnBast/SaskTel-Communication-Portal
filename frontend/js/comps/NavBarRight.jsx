/**
 *  React Imports
 */
import React, {Component} from "react";

/**
 *  Component Imports
 */

import ProfileDropdown from "./ProfileDropdown";
import {LogButton} from "./LogButton";

import {Menu} from "semantic-ui-react";

export default class NavBarRight extends Component {

    render() {

        return(
            <Menu.Menu position="right">
                <ProfileDropdown/>
                <LogButton/>
            </Menu.Menu>
        );
    }
}