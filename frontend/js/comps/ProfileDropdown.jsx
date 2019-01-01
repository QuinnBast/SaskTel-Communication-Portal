/**
 *  React Imports
 */
import React, {Component} from "react";
import {withRouter} from "react-router-dom";

/**
 *  Component Imports
 */


import {Dropdown, Container, Menu} from "semantic-ui-react";

/**
 *  REST API Imports
 */
import BroadSoft from "../BroadSoft/BroadSoft";
import Auth from "../router/Auth";
export default class ProfileDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name : "Profile",
            description : "User Profile information",
            title : "Profile",
            content : this.content()
        };
        this.loadAsync();
    }

    content = () => {
        return(
            <Dropdown text = "Profile">
                <Container>
                    <div id={"Profile"}>Loading Directories...</div>
                </Container>
            </Dropdown>)
    };

// Asynchronous function that updates the object.
    loadAsync(){
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/profile",
            success: function(response) {
                $("#Profile:first").innerHTML = JSON.stringify(response);
            },
            error: function(response) {
                // User does not have access to the endpoint.
            }
        });
    }

    render() {

        return(
                    <Dropdown item text = "Profile">
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={(e) => {e.preventDefault()}}>
                                <Container>
                                <div id={"Profile"}>Loading Directories...</div>
                                </Container>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
        );
    }
}