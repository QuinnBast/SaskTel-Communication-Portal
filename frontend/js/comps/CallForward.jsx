
/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import CallProperties from "./call/CallProperties"
import CallForwardData from "./CallForwardData"

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft"

/**
 *  Style Imports
 */
import { Table, Popup } from 'semantic-ui-react'

let $ = require('jquery');

export default class CallForward extends CallProperties {

    constructor(props){
        super(props);
        this.state = {
            forwarding: [],
            name: "Call Forwarding",
            description: "This property allows you to forward calls to a different phone number during specific hours.",
            title: "Call Forwarding",
            content: this.content()
        };
        this.loadAsync();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.forwarding !== prevState.forwarding){
            this.setState({content: this.content()})
        }
    }

    content = () => {
        return (
            <div>
                <Table striped id={"CallForwarding"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <Popup trigger={<div>Type</div>}>
                                    <Popup.Content>
                                        <div>
                                            The type of call forwarding.<br/>
                                            <b>Not Reachable:</b> Forward calls when your devices is not accessible or turned off.<br/>
                                            <b>No Answer:</b> Forwards calls when you do not answer.<br/>
                                            <b>Busy:</b> Forwards calls when your phone is in use.<br/>
                                            <b>Always:</b> Always forwards calls.<br/>
                                            <b>Selective:</b> Specify criteria for when calls should be forwarded.
                                        </div>
                                    </Popup.Content>
                                </Popup>
                            </Table.HeaderCell>
                            <Table.HeaderCell><Popup trigger={<div>Forwarding To</div>} content={"If present, this indicates what phone number calls of this type are being forwarded to."}/></Table.HeaderCell>
                            <Table.HeaderCell><Popup trigger={<div>Additional Information</div>} content={"Various settings that can be altered and changed for each option."}/></Table.HeaderCell>
                            <Table.HeaderCell><Popup trigger={<div>Active</div>} content={"If the services is currently activate."}/></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body key={"CallForwardKey"}>
                        {this.state.forwarding}
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
            success: function(response){
                let dataFormat = response;
                let data = {
                    endpoint: "/user/<user>/services/CallForwardingAlways",
                    name: "Always",
                    type: "CallForwardingAlways"
                };
                let newData = <CallForwardData key={data.name + data.type} info={data} dataformat={dataFormat}/>;
                self.setState((prevState) => ({ forwarding: [...prevState.forwarding, newData]}));
            }
        });

        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/CallForwardingBusy",
            success: function(response){
                let dataFormat = response;
                let data = {
                    endpoint: "/user/<user>/services/CallForwardingBusy",
                    name: "Busy",
                    type: "CallForwardingBusy"
                };

                let newData = <CallForwardData key={data.name + data.type} info={data} dataformat={dataFormat}/>;
                self.setState((prevState) => ({ forwarding: [...prevState.forwarding, newData]}));
            }
        });
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/CallForwardingNoAnswer",
            success: function(response) {
                let dataFormat = response;
                let data = {
                    endpoint: "/user/<user>/services/CallForwardingNoAnswer",
                    name: "No Answer",
                    type: "CallForwardingNoAnswer"
                };
                let newData = <CallForwardData key={data.name + data.type} info={data} dataformat={dataFormat}/>;
                self.setState((prevState) => ({ forwarding: [...prevState.forwarding, newData]}));
            }
        });
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/CallForwardingNotReachable",
            success: function(response) {
                let dataFormat = response;
                let data = {
                    endpoint: "/user/<user>/services/CallForwardingNotReachable",
                    name: "Not Reachable",
                    type: "CallForwardingNotReachable"
                };
                let newData = <CallForwardData key={data.name + data.type} info={data} dataformat={dataFormat}/>;
                self.setState((prevState) => ({ forwarding: [...prevState.forwarding, newData]}));
            }
        });
        BroadSoft.sendRequest({
            endpoint:"/user/<user>/services/CallForwardingSelective",
            success: function(response) {
                let dataFormat = response;
                let data = {
                    endpoint: "/user/<user>/services/CallForwardingSelective",
                    name: "Selective",
                    type: "CallForwardingSelective"
                };
                let newData = <CallForwardData key={data.name + data.type} info={data} dataformat={dataFormat}/>;
                self.setState((prevState) => ({ forwarding: [...prevState.forwarding, newData]}));
            }
        });
    };

    render() {
        return super.render();
    }
}