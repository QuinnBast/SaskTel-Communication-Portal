
/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import CallProperties from "./call/CallProperties"

/**
 *  REST API Imports
 */
import BroadSoft from "../BroadSoft/BroadSoft"

/**
 *  Style Imports
 */
import { Table } from 'semantic-ui-react'

let $ = require('jquery');

export default class CallForward extends CallProperties {

    constructor(props){
        super(props);
        this.state.forwarding = [];
        this.state.name = 'Call Forwarding';
        this.state.description = "This property allows you to forward calls to a different phone number during specific hours.";
        this.state.title = "Call Forwarding";
        this.state.content = this.content();

        this.loadAsync();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.forwarding !== prevState.forwarding){
            this.setState({content: this.content()})
        }
    }

    content = () => {

        let tableRows = [];
        for(let property of this.state.forwarding){
            tableRows.push(<Table.Row>
                            <Table.Cell>{property['type']}</Table.Cell>
                            <Table.Cell>{property['active']}</Table.Cell>
                            <Table.Cell>{property['forwardToPhoneNumber']}</Table.Cell>
                            <Table.Cell>{property['ringSplash']}</Table.Cell>
                        </Table.Row>);
        }

        return (
            <div>
                <Table striped id={"CallForwarding"}>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Active</Table.HeaderCell>
                        <Table.HeaderCell>Forwarding To</Table.HeaderCell>
                        <Table.HeaderCell>Ring Splash</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {tableRows}
                    </Table.Body>
                </Table>
            </div>
        );
    };

    // Asynchronous function that updates the object.
    loadAsync = () => {
        let self = this;
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/CallForwardingAlways",
            callback: function(response){

                let data = response['data']['CallForwardingAlways'];

                let property = {
                    type: "Always",
                    active: data['active'],
                    forwardToPhoneNumber: data['forwardToPhoneNumber'],
                    ringSplash: data['ringSplash'] ? data['ringSplash'] : "false"
                };
                self.setState(prevState => ({forwarding: [...prevState.forwarding, property] }));
            }
        });

        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/CallForwardingBusy",
            callback: function(response){

                var data = response['data']['CallForwardingBusy'];

                var property = {
                    type: "Busy",
                    active: data['active'],
                    forwardToPhoneNumber: data['forwardToPhoneNumber'],
                    ringSplash: data['ringSplash'] ? data['ringSplash'] : "false"
                };
                self.setState(prevState => ({forwarding: [...prevState.forwarding, property] }));
            }
        });
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/CallForwardingNoAnswer",
            callback: function(response) {

                var data = response['data']['CallForwardingNoAnswer'];

                var property = {
                    type: "No Answer",
                    active: data['active'],
                    forwardToPhoneNumber: data['forwardToPhoneNumber'],
                    ringSplash: data['ringSplash'] ? data['ringSplash'] : "false"
                };
                self.setState(prevState => ({forwarding: [...prevState.forwarding, property] }));
            }
        });
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/CallForwardingNotReachable",
            callback: function(response) {

                var data = response['data']['CallForwardingNotReachable'];

                var property = {
                    type: "Not Reachable",
                    active: data['active'],
                    forwardToPhoneNumber: data['forwardToPhoneNumber'],
                    ringSplash: data['ringSplash'] ? data['ringSplash'] : "false",
                };
                self.setState(prevState => ({forwarding: [...prevState.forwarding, property] }));
            }
        });
        BroadSoft.sendRequest({
            endpoint:"/user/<user>/services/CallForwardingSelective",
            callback: function(response) {

                var data = response['data']['CallForwardingSelective'];

                var property = {
                    type: "Selective",
                    active: data['active'],
                    forwardToPhoneNumber: data['forwardToPhoneNumber'],
                    ringSplash: data['ringSplash'] ? data['ringSplash'] : "false"
                };
                self.setState(prevState => ({forwarding: [...prevState.forwarding, property] }));
            }
        });
    };

    render() {
        return super.render();
    }
}