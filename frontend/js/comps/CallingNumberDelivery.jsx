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
import BroadSoft from "../BroadSoft/BroadSoft";

export default class CallingNumberDelivery extends CallProperties {

    constructor(props) {
        super(props);
        this.state = {
            name : "Calling Number Delivery",
            description : "Calling Number Delivery allows the Calling Line number for callers from inside your group or enterprise (Internal) and/or callers from outside your group or enterprise (External) to be displayed. On assignment the Connected Line Identification Presentation service acts as a overlay service for Calling Number Delivery. The Connected Line Identification Presentation allows you to see the connected line identity of the called party. The setting for Calling Number Delivery also controls the Connected Line Identification Presentation service.",
            title : "Calling Number Delivery",
            content : this.content()
        };
    this.loadAsync();
}

content = () => {
    return(
        <div>
            <div id={"CallingNumberDelivery"}>Loading...</div>
        </div>)
};

// Asynchronous function that updates the object.
loadAsync(){
    BroadSoft.sendRequest({
        endpoint: "/user/<user>/services/CallingNumberDelivery",
        success: function(response) {
            $("#CallingNumberDelivery").get(0).innerHTML = JSON.stringify(response);
        },
        error: function(response) {
            // User does not have access to the endpoint.
        }
    });
}

render() {
    return super.render();
}
}