
/**
 *  React Imports
 */
import React from "react";

/**
 *  Style Imports
 */
import { Table, Checkbox, Input } from 'semantic-ui-react'

/**
 *  Worker Queue Imports
 */
import UpdateQueue from "../workers/UpdateQueue"

export default class CallForwardData extends React.Component {

    constructor(props){
        super(props);

        // Set changable props to the state.
        this.state = {
            forwardToPhoneNumber: this.props.dataformat[this.props.info.type].forwardToPhoneNumber,
            ringSplash: this.props.dataformat[this.props.info.type].ringSplash === 'true',
            active: this.props.dataformat[this.props.info.type].active === 'true'
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        // Use the provided data format and update the changed components.
        let data = nextProps.dataformat;
        data[nextProps.info.type].ringSplash = nextState.ringSplash.toString();
        data[nextProps.info.type].active = nextState.active.toString();
        data[nextProps.info.type].forwardToPhoneNumber = nextState.forwardToPhoneNumber;

        let request = {
            endpoint: nextProps.info.endpoint,
            method: "PUT",
            data: data,
        };

        UpdateQueue.addUpdate(request);

    }

    setData = (properties) => {
        this.state = properties;
    };

    toggleRing = () => {
        this.setState({ringSplash: !this.state.ringSplash});
    };

    toggleActive = () => {
        this.setState({active: !this.state.active});
    };

    changePhone = (event) => {
      // Validate phone number.
        if(event.target.value.replace(/[()-]/g, '').length  < 10)
        {
            // Show alert popup.
            return;
        }

      // If valid, change state.
        this.setState({forwardToPhoneNumber: event.target.value})
    };


    render(){
        return (
            <Table.Row>
                <Table.Cell>{this.props.info.name}</Table.Cell>
                <Table.Cell><Input defaultValue={this.state.forwardToPhoneNumber} onChange={(e) => this.changePhone(e)}/></Table.Cell>
                <Table.Cell><Checkbox toggle checked={this.state.ringSplash} onClick={this.toggleRing}/></Table.Cell>
                <Table.Cell><Checkbox toggle checked={this.state.active} onClick={this.toggleActive}/></Table.Cell>
            </Table.Row>
        );
    }
}