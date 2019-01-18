/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import AccordionWrap from "./AccordionWrap"

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";

export default class VoiceMessages extends React.Component {

    constructor(props) {
        super(props);
    this.loadAsync();
    this.state = {
        unauthorized: false
    }
}

// Asynchronous function that updates the object.
loadAsync(){
        let self = this;
    BroadSoft.sendRequest({
        endpoint: "/user/<user>/VoiceMessagingMessages",
        success: function(response) {
            $("#VoiceMessages").get(0).innerHTML = JSON.stringify(response);
        },
        error: function(response) {
            // User does not have access to the endpoint.
            self.setState({unauthorized: true});
        }
    });
}

render() {
    return(
        <AccordionWrap title={"Voice Messages"} description={"Details about all voice messages that are avaliable."} unauthorized={this.state.unauthorized}>
        <div>
            <div id={"VoiceMessages"}>Loading Directories...</div>
        </div>
        </AccordionWrap>
    )
}
}