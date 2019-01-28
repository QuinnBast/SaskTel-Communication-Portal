/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import {Container, Jumbotron} from 'reactstrap';

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";
import {getTag} from "../broadsoft/xmlParse"

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.loadAsync();
        this.state = {
            firstName: "",
            lastName: "",
            number: "",
            extension: "",
            status: "loading",
        }
    }

// Asynchronous function that updates the object.
    loadAsync(){
        let self = this;
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/profile",
            success: function(response) {
                let profileDetails = getTag(response, ["Profile", "details"]);
                self.setState({
                    firstName: getTag(profileDetails, ["firstName"]),
                    lastName: getTag(profileDetails, ["lastName"]),
                    number: getTag(profileDetails, ["number"]),
                    extension: getTag(profileDetails, ["extension"]),
                    status: "ready"
                });
            },
            error: function(response) {
                // User does not have access to the endpoint.
            }
        });
    }

    render() {
        if(this.state.status == "loading") {
            return (
                <Container id={"Profile"}>
                    <Jumbotron>
                        Welcome to Telport!
                    </Jumbotron>
                </Container>
            )
        } else {
            return (
                <Container id={"Profile"}>
                    <Jumbotron>
                        <h1>Hello, {this.state.firstName + " " + this.state.lastName}!</h1>
                        <p>{this.state.number}</p>
                        <p>{this.state.extension}</p>
                    </Jumbotron>
                </Container>
            );
        }
    }
}