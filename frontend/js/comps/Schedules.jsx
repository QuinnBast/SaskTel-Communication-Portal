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
import BroadSoft from "../broadsoft/BroadSoft";

export default class Schedules extends CallProperties {

    constructor(props) {
        super(props);
        this.state = {
            name : "Schedules",
            description : "Schedules for selective calling",
            title : "Profile",
            content : this.content()
        };
    this.loadAsync();
}

content = () => {
    return(
        <div>
            <div id={"Schedules"}>Loading Directories...</div>
        </div>)
};

// Asynchronous function that updates the object.
loadAsync(){
    BroadSoft.sendRequest({
        endpoint: "/user/<user>/profile/schedule",
        success: function(response) {
            $("#Schedules").get(0).innerHTML = JSON.stringify(response);
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