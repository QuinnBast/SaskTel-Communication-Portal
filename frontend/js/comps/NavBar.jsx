
/**
 *  React Imports
 */
import React, {Component, Fragment} from 'react'

/**
 *  Style Imports
 */
import {NavItem, NavLink, Navbar, NavbarToggler, NavbarBrand, Nav, Collapse, Modal, ModalHeader, ModalBody, ModalFooter, Button  } from 'reactstrap'
import {Link} from "react-router-dom";

/**
 *  Component Imports
 */
import {LogButton} from "./LogButton"
import FeatureAccessCodes from "./FeatureAccessCodes";
import FeatureAccessCodesButton from "./FeatureAccessCodesButton";
import CallLogButton from "./CallLogButton";
import Auth from "../router/Auth"

const padding = {
    paddingLeft: "10px",
    paddingRight: "10px"
};

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };

        if(!Auth.isAuthenticated()){
            let self = this;
            let counter = 0;
            let tryRefresh = setInterval(function(){
                if(Auth.isAuthenticated()){
                    self.forceUpdate();
                    clearInterval(tryRefresh);
                } else {
                    counter++;
                    if (counter > 5) {
                        clearInterval(tryRefresh);
                    }
                }
            }, 500);
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render () {
        return (
                <Navbar id={"navbar"} color="dark" dark expand="md" style={{paddingTop: "20px", position: "fixed", zIndex: "1", width: "100%", paddingBottom: "20px"}}>
                    <NavbarBrand id={"navTitle"} tag={Link} to="/">TelPort</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem style={padding}>
                                <CallLogButton/>
                            </NavItem>
                            <NavItem style={padding}>
                                <FeatureAccessCodesButton/>
                            </NavItem>
                            <NavItem style={padding}>
                                <LogButton/>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
        );
    }
}