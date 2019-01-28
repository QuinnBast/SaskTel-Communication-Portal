
/**
 *  React Imports
 */
import React, { Component } from 'react'

/**
 *  Style Imports
 */
import {NavItem, NavLink, Navbar, NavbarToggler, NavbarBrand, Nav, Collapse } from 'reactstrap'
import {Link} from "react-router-dom";

/**
 *  Component Imports
 */
import {LogButton} from "./LogButton"

export default class NavBar extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

render () {
        return (
            <Navbar color="dark" dark expand="md">
                  <NavbarBrand tag={Link} to="/">TelPort</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                          <NavItem>
                            <LogButton/>
                          </NavItem>
                      </Nav>
                  </Collapse>
              </Navbar>
        );
    }
}