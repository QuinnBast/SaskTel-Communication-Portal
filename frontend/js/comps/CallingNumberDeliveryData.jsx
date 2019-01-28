/**
 *  React Imports
 */
import React from "react";

/**
 *  REST API Imports
 */

/**
 *  Worker Queue Imports
 */
import UpdateQueue from "../workers/UpdateQueue"

/**
 * Broadsoft imports
 */
import { getTag, setTag } from "../broadsoft/xmlParse";

export default class CallingNumberDeliveryData extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            isActiveForInternalCalls: getTag(this.props.dataformat, ["CallingNumberDelivery", "isActiveForInternalCalls"]) === "true",
            isActiveForExternalCalls: getTag(this.props.dataformat, ["CallingNumberDelivery", "isActiveForExternalCalls"]) === "true"
        }
    }

    toggleExternal = () => {
        this.setState({isActiveForExternalCalls: !this.state.isActiveForExternalCalls})

        // Permanatly change background to yellow to indicate that a change is pending.
        jQuery("#ExternalCallNumberDelivery").get(0).style.background = '#fff7e6';
    };

    toggleInternal = () => {
        this.setState({isActiveForInternalCalls: !this.state.isActiveForInternalCalls})

        // Permanatly change background to yellow to indicate that a change is pending.
        jQuery("#InternalCallNumberDelivery").get(0).style.background = '#fff7e6';
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        // Use the recieved data format and replace changes.
        let data = nextProps.dataformat;

        // Loop through the state keys and set the data keys
        for(let key of Object.keys(nextState)){
            let value =  nextState[key];
            if(value != null) {
                setTag(data, ["CallingNumberDelivery", key], value.toString());
            } else {
                setTag(data, ["CallingNumberDelivery", key], '');
            }
        }

        let request = {
            endpoint: nextProps.endpoint,
            method: "PUT",
            data: data,
            success: function(response){
                jQuery("#ExternalCallNumberDelivery").get(0).style.background = "";
                jQuery("#InternalCallNumberDelivery").get(0).style.background = "";
            },
            error: function(response){
                // Permanently change background to red to indicate error to user.
                jQuery("#ExternalCallNumberDelivery").get(0).style.background = jQuery("#ExternalCallNumberDelivery").get(0).style.background === '#fff7e6' ? '#e74c3c' : "";
                jQuery("#InternalCallNumberDelivery").get(0).style.background = jQuery("#InternalCallNumberDelivery").get(0).style.background === '#fff7e6' ? '#e74c3c' : "";
                // Reset the state of the component by fetching the current state.
            }
        };

        UpdateQueue.addUpdate(request);
    }

    render() {
        return (<div>
            <div id={"ExternalCallNumberDelivery"}><Container>External Call Number Delivery<Checkbox toggle checked={this.state.isActiveForExternalCalls} onClick={this.toggleExternal}/></Container></div>
            <div id={"InternalCallNumberDelivery"}><Container>Internal Call Number Delivery<Checkbox toggle checked={this.state.isActiveForInternalCalls} onClick={this.toggleInternal}/></Container></div>
        </div>);
    }


}