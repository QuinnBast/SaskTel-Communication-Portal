/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import {Container, Col, Row, CustomInput, Button, Table} from 'reactstrap';
import Switch from 'react-switch';

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

    toggle = (toggleState) => {
        this.setState({toggleState})
    }

    render() {
        return(
            <Container>
                <Table striped>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Enabled</th>
                        <th>Configure</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>{this.props.name}</th>
                        <th><Switch onChange={this.toggle} checked={this.state.toggleState}/></th>
                        <th><Button color={"primary"} onClick={this.onEdit}>Edit</Button></th>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        )
    }
}