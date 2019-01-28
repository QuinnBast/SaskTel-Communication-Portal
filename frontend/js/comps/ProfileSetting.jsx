/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import {Container, Col, Row, CustomInput} from 'reactstrap';

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";

export default class ProfileSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleState: false,
        }
    }

    onEdit(){
        // pass in the edit prop as this.props.edit
    }


    render() {
        return(
            <Container>
                <Row>
                    <Col xs={"6"}>{this.props.name}</Col>
                    <Col xs={"3"}><CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Active" /></Col>
                    <Col xs={"3"}><a onClick={this.onEdit}>Edit</a></Col>
                </Row>
            </Container>
        )
    }
}