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

export default class ThirdPartyVoiceMail extends CallProperties {

    constructor(props) {
        super(props);
        this.state = {
            name : "Third Party Voicemail",
            description : "Third-Party Voice Mail Support allows you to specify how to handle your voice messages. You can choose to send busy and/or unanswered calls to your voice mail, as well as the number of rings before an incoming call is considered unanswered.",
            title : "Third Party Voicemail",
            content : this.content()
        };
    this.loadAsync();
}

content = () => {
    return(
        <div>
            <div id={"ThirdPartyVoicemail"}>Loading...</div>
        </div>)
};

// Asynchronous function that updates the object.
loadAsync(){
    BroadSoft.sendRequest({
        endpoint: "/user/<user>/services/ThirdPartyVoicemailSupport",
        success: function(response) {
            $("#ThirdPartyVoicemail").get(0).innerHTML = JSON.stringify(response);
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