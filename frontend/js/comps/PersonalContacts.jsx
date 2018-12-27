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

export default class PersonalContacts extends CallProperties {

    constructor(props) {
        super(props);
        this.state = {
            name : "Personal Contacts",
            description : "Create a list of personal contacts that can be stored for frequent use.",
            title : "Personal Contacts",
            content : this.content()
        };
    this.loadAsync();
}

content = () => {
    return(
        <div>
            <div id={"PersonalContacts"}>Loading...</div>
        </div>)
};

// Asynchronous function that updates the object.
loadAsync(){
    BroadSoft.sendRequest({
        endpoint: "/user/<user>/directories/Personal",
        success: function(response) {
            $("#PersonalContacts").get(0).innerHTML = JSON.stringify(response);
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