/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import {Container, Jumbotron, Col, Row} from 'reactstrap';
import CallLogButton from "../comps/CallLogButton";
import FeatureAccessCodesButton from "../comps/FeatureAccessCodesButton"

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";
import {getTag} from "../broadsoft/xmlParse"

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            number: "",
            extension: "",
            status: "loading",
        }
    }

    componentDidMount() {
        this.loadAsync();
    }

// Asynchronous function that updates the object.
    loadAsync = () => {
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
        if(this.state.status === "loading") {
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
                        <Row>
                            <Col xs={"9"}>
                                <h1 id={"userName"}>Hello, {this.state.firstName + " " + this.state.lastName}!</h1>
                                <p id={"userNumber"}>Number: {this.state.number}</p>
                                <p id={"userExtension"}>Extension: {this.state.extension}</p>
                            </Col>
                            <Col xs={"3"}>
                                <CallLogButton/>
                                <FeatureAccessCodesButton/>
                            </Col>
                        </Row>
                    </Jumbotron>
                </Container>
            );
        }
    }
}