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

export default class VoiceMessages extends CallProperties {

    constructor(props) {
        super(props);
        this.state = {
            name : "Voice Messages",
            description : "Details about all voice messages that are avaliable.",
            title : "Voice Messages",
            content : this.content()
        };
    this.loadAsync();
}

content = () => {
    return(
        <div>
            <div id={"VoiceMessages"}>Loading Directories...</div>
        </div>)
};

// Asynchronous function that updates the object.
loadAsync(){
    BroadSoft.sendRequest({
        endpoint: "/user/<user>/VoiceMessagingMessages",
        success: function(response) {
            $("#VoiceMessages").get(0).innerHTML = JSON.stringify(response);
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